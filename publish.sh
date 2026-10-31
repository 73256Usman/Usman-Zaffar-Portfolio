#!/usr/bin/env bash
# One command to publish your changes:   bash publish.sh "what you changed"
set -euo pipefail
cd "$(dirname "$0")"
MSG="${1:-Update portfolio}"

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to publish. You have not changed any files."
  exit 0
fi

bash bump-version.sh
git add -A
git commit -m "$MSG"
git push origin "$(git branch --show-current)"
echo ""
echo "Published. The live site updates in about a minute."
echo "Open it in a private window to skip any old cached copy."
