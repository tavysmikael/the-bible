#!/bin/bash
set -e

COMMIT="7d4a474bb9a95ff4eb4cd343ab0745337382d4de"
BASE_URL="https://raw.githubusercontent.com/damarals/biblias/$COMMIT/data/canonical/BLIVRE"
DEST="prisma/seed-data/BLIVRE"

mkdir -p "$DEST"

BOOKS="GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SNG ISA JER LAM EZK DAN HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL MAT MRK LUK JHN ACT ROM 1CO 2CO GAL EPH PHP COL 1TH 2TH 1TI 2TI TIT PHM HEB JAS 1PE 2PE 1JN 2JN 3JN JUD REV"

for CODE in $BOOKS; do
  curl -s "$BASE_URL/$CODE.json" -o "$DEST/$CODE.json"
  echo "Baixado: $CODE"
done

echo "Concluído: 66 livros baixados."