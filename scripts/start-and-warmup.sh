#!/bin/sh
# Start dev server in background and wait for it to compile the homepage

# Start dev server in background
npm run dev &
SERVER_PID=$!

# Wait for server to be ready and compile homepage
node scripts/warmup-server.js
WARMUP_EXIT=$?

# If warmup failed, kill the server and exit
if [ $WARMUP_EXIT -ne 0 ]; then
  kill $SERVER_PID 2>/dev/null
  exit $WARMUP_EXIT
fi

# Keep server running (Playwright will kill it when done)
wait $SERVER_PID
