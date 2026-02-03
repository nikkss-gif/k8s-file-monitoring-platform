#!/bin/sh

apk add --no-cache inotify-tools curl

WATCH_DIR="/watch"
API_URL="http://ingest-api.monitoring.svc.cluster.local:3000/event"
API_KEY="agent-key"

echo "Starting file monitoring on $WATCH_DIR"

inotifywait -m "$WATCH_DIR" -e create,modify,delete --format '%e %f' |
while read EVENT FILE; do
  echo "Detected $EVENT on $FILE"

  curl -s -X POST "$API_URL" \
    -H "X-API-KEY: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"file\":\"$FILE\",\"action\":\"$EVENT\"}"
done
