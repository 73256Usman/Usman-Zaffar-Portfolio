#!/usr/bin/env bash
# Run this before every push. It changes the version tag on the site's files so that
# browsers always fetch the newest scripts and styles instead of an old cached copy.
set -euo pipefail
cd "$(dirname "$0")"
NEW="$(date +%Y%m%d%H%M)"
OLD="$(grep -o 'main.js?v=[0-9a-z]*' index.html | head -1 | cut -d= -f2)"
sed -i.bak "s/?v=${OLD}/?v=${NEW}/g" index.html assets/js/main.js assets/js/extras.js
rm -f index.html.bak assets/js/main.js.bak assets/js/extras.js.bak
echo "Version updated: ${OLD} -> ${NEW}"
