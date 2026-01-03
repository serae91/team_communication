set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Start Developer Environment..."

setup() {
  echo "Install Frontend-Dependencies..."
  ( cd "$PROJECT_ROOT/frontend" && npm install )

  echo "Build Backend (Quarkus)..."
  ( cd "$PROJECT_ROOT/backend" && ./mvnw compile )
}

start_dev() {

  cleanup() {
      echo "Stopping servers..."
      kill $PID1 $PID2 2>/dev/null || true
      wait $PID1 $PID2 2>/dev/null || true
      exit 0
  }

  trap cleanup SIGINT EXIT

  echo "Start Postgres via Docker Compose..."
  (cd "$PROJECT_ROOT/backend/setup/database" && docker-compose up -d postgres)

  echo "Wait for Postgres to be ready..."
  sleep 3

  echo "Start Quarkus Backend in Dev-Mode..."
  cd "$PROJECT_ROOT/backend"
  ./mvnw quarkus:dev &
  PID1=$!
  cd - >/dev/null

  timeout=60
  count=0
  until curl -s http://localhost:8080 > /dev/null; do
      sleep 1
      count=$((count+1))
      if [ $count -ge $timeout ]; then
          echo "Backend did not start in time!"
          cleanup
      fi
  done

  echo "Start Frontend in Dev-Mode..."
  cd "$PROJECT_ROOT/frontend"
  npm run dev &
  PID2=$!
  cd - >/dev/null

  timeout=60
  count=0
  until curl -s http://localhost:5173 > /dev/null; do
      sleep 1
      count=$((count+1))
      if [ $count -ge $timeout ]; then
          echo "Frontend did not start in time!"
          cleanup
      fi
  done

  # Open Frontend in Browser (Mac/Linux/Windows)
  if command -v xdg-open >/dev/null; then
    xdg-open http://localhost:5173
  elif command -v open >/dev/null; then
    open http://localhost:5173
  elif command -v start >/dev/null; then
    start http://localhost:5173
  fi

  echo "Development Environment is running!
  - Postgres: localhost:5430
  - Backend:  http://localhost:8080
  - Frontend: http://localhost:5173
  "

  wait $PID1 $PID2
}

if [[ "$1" == "--setup" ]]; then
  setup
fi
  start_dev