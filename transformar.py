# transformar.py  ->  python transformar.py
import csv, json

ENTRADA = "finished_matches.csv"
SALIDA = "finished_matches.json"

CAMPOS = [
    "match_id", "matchday", "league_name", "group_name",
    "kickoff_date", "kickoff_time",
    "home_team_name", "away_team_name",
    "home_score", "away_score", "result", "winner_team_name",
    "total_goals", "goal_difference", "home_points", "away_points",
    "stadium_name", "match_attendance",
]
ENTEROS = ["match_id", "matchday", "home_score", "away_score",
           "total_goals", "goal_difference", "home_points", "away_points",
           "match_attendance"]
RESULTADO = {"HOME_WIN": "Local", "AWAY_WIN": "Visitante", "DRAW": "Empate"}


def limpiar(texto):
    # quita espacios y el punto combinante de "Türki̇ye"
    return texto.strip().replace("i\u0307", "i")


registros = []
with open(ENTRADA, encoding="utf-8-sig", newline="") as f:
    for fila in csv.DictReader(f):
        r = {}
        for campo in CAMPOS:
            valor = limpiar(fila[campo])
            if campo in ENTEROS:
                valor = int(valor) if valor != "" else None
            r[campo] = valor
        r["result"] = RESULTADO[fila["result"].strip()]
        if r["winner_team_name"] == "Draw":
            r["winner_team_name"] = "Empate"
        registros.append(r)

# validaciones
assert len(registros) == 104, f"Se esperaban 104 registros y hay {len(registros)}"
assert len({r["match_id"] for r in registros}) == 104, "match_id duplicados"
sin_asistencia = sum(r["match_attendance"] is None for r in registros)
print(f"Registros: {len(registros)} | sin asistencia: {sin_asistencia}")

with open(SALIDA, "w", encoding="utf-8") as f:
    json.dump(registros, f, ensure_ascii=False, indent=2)