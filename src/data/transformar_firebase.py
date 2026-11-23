"""Prepara finished_matches.json para importarlo en Firebase Realtime Database.

Realtime Database no admite un arreglo como raíz y descarta los valores null.
Este script envuelve los registros en el nodo "partidos" y usa match_id como clave.
Uso:  python transformar_firebase.py
"""
import json

ENTRADA = "finished_matches.json"
SALIDA = "finished_matches_firebase.json"

with open(ENTRADA, encoding="utf-8") as f:
    registros = json.load(f)

ids = [r["match_id"] for r in registros]
assert len(registros) == 104, f"Se esperaban 104 registros y hay {len(registros)}"
assert len(set(ids)) == len(ids), "Hay match_id repetidos"

arbol = {"partidos": {str(r["match_id"]): r for r in registros}}

with open(SALIDA, "w", encoding="utf-8") as f:
    json.dump(arbol, f, ensure_ascii=False, indent=2)

print(f"{len(registros)} registros escritos en {SALIDA}")
