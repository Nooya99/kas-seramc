#!/bin/bash
echo "=== Memulai Deployment kas-seramc ==="

# Masuk ke folder proyek
cd ~/kas-seramc || exit

# Buang perubahan lokal yang mungkin menyangkut
git reset --hard origin/main

# Tarik update terbaru dari GitHub
git pull origin main

# Matikan dan build ulang Docker container
docker compose down
docker compose up -d --build

echo "=== Deployment Selesai ==="
