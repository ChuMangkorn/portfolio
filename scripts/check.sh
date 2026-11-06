#!/usr/bin/env bash
# Full verification: source checks, build, render gates on a snapshot, and the receipts the stop hook reads.
# It rebuilds .next, so stop any other `next start` on this folder first. It serves on :3101.
set -euo pipefail
cd "$(dirname "$0")/.."

KIT=$(ls -d "$HOME"/.claude/plugins/cache/*/ux-ui-agent-skills/*/scripts | tail -1)
PORT=3101

npm run -s check:fast
python3 "$KIT/lint_hardcodes.py" app components lib
python3 "$KIT/check_no_emoji.py" app components lib

npm run -s build >/dev/null
npx next start -p "$PORT" >/tmp/portfolio-check.log 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 1 30); do curl -sf "localhost:$PORT" >/dev/null && break; sleep 1; done

curl -s "localhost:$PORT" | node scripts/check-meta.mjs "http://localhost:$PORT"
node scripts/check-run-length.mjs "http://localhost:$PORT" "$(dirname "$KIT")"
curl -s "localhost:$PORT" | node scripts/check-jp-font.mjs
node scripts/check-display-font.mjs "http://localhost:$PORT" "$(dirname "$KIT")"
node scripts/check-label-in-name.mjs "http://localhost:$PORT" "$(dirname "$KIT")"
node scripts/check-text-size.mjs "http://localhost:$PORT" "$(dirname "$KIT")"

# The gates open the snapshot as a file, so its stylesheets must be inlined or the page renders unstyled.
mkdir -p .gates
PORT=$PORT python3 - <<'PY'
import os, re, urllib.request
base = "http://localhost:" + os.environ["PORT"]
html = urllib.request.urlopen(base + "/").read().decode()
def inline(m):
    css = urllib.request.urlopen(base + m.group(1)).read().decode()
    css = re.sub(r"url\((/_next[^)]+)\)", lambda u: "url(" + base + u.group(1) + ")", css)
    return "<style>" + css + "</style>"
open(".gates/preview.html", "w").write(re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*/>', inline, html))
PY

# Receipts go to the plugin data dir, keyed by file hash, which is where the stop hook looks.
export CLAUDE_PLUGIN_DATA="$HOME/.claude/plugins/data/ux-ui-agent-skills-ux-ui-agent-skills"
unset CLAUDE_SESSION_ID
for gate in verify_states verify_target_size verify_responsive verify_overflow verify_reduced_motion axe_audit slop_tells taste_audit; do
  echo "== $gate"
  node "$KIT/gate.mjs" "$gate.mjs" .gates/preview.html | tail -2
done
for f in $(git ls-files --cached --others --exclude-standard -- 'app/*' 'components/*' 'lib/*' | grep -E '\.(tsx|ts|css)$'); do
  [ -f "$f" ] || continue # deleted in the working tree but not yet committed
  node "$KIT/gate.mjs" lint_hardcodes.py "$f" >/dev/null
done
echo '{"session_id":"x","cwd":"'"$PWD"'","stop_hook_active":false}' | node "$(dirname "$KIT")/hooks/stop-require-measurement.mjs"
echo "check: all gates passed and receipts are live"
