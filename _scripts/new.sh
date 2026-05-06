#!/usr/bin/env bash
# Scaffold a new prototype with a 32-char hex ID.
# Usage: ./_scripts/new.sh "Title of prototype" [template]
# Default template: blank

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 \"Title\" [template]" >&2
  exit 1
fi

TITLE="$1"
TEMPLATE="${2:-blank}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE_DIR="$ROOT/_templates/$TEMPLATE"
INDEX_FILE="$ROOT/_index/prototypes.json"

if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "Template not found: $TEMPLATE_DIR" >&2
  echo "Available templates:" >&2
  ls -1 "$ROOT/_templates" >&2
  exit 1
fi

ID=$(openssl rand -hex 16)
DEST="$ROOT/public/p/$ID"
CREATED=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cp -r "$TEMPLATE_DIR" "$DEST"

export INDEX_FILE ID TITLE TEMPLATE CREATED
python3 - <<'PY'
import json, os
path = os.environ['INDEX_FILE']
with open(path) as f:
    data = json.load(f)
data.append({
    'id': os.environ['ID'],
    'title': os.environ['TITLE'],
    'template': os.environ['TEMPLATE'],
    'created': os.environ['CREATED'],
    'tags': [],
    'notes': ''
})
with open(path, 'w') as f:
    json.dump(data, f, indent=2)
    f.write('\n')
PY

echo "Created prototype:"
echo "  ID:    $ID"
echo "  Path:  public/p/$ID/"
echo "  URL:   /p/$ID/"
