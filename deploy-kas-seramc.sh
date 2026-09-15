#!/bin/bash
echo "=== Memulai Deployment kas-seramc ==="

# Masuk ke folder proyek
cd ~/kas-seramc || exit

# Tarik update terbaru dari GitHub
git fetch origin main
git reset --hard origin/main
git pull origin main

# Matikan dan build ulang Docker container
docker compose down
docker compose up -d --build

echo "=== Deployment Selesai ==="
