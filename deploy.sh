#!/bin/bash

# Konfigurasi dasar
SERVER_USER="joko"
SERVER_IP="172.16.17.200"
ARCHIVE_NAME="build-fe.tar.gz"
TEMP_DIR="/home/joko/temp_deploy"
SERVER_DIR="/home/joko/apps/kinigo/fe/"
PORT="5003"
PM2_NAME="kinigo-fe"

echo "Deploying to production..."
echo "Server directory: $SERVER_DIR"
echo "Port: $PORT"
echo "PM2 process name: $PM2_NAME"

# Pastikan skrip berhenti jika terjadi error
set -e

echo "[1/6] Menghapus husky dari package.json jika ada..."
jq 'del(.husky, .scripts.prepare)' package.json > temp.json && mv temp.json package.json

echo "[2/6] Membuat build Next.js di lokal..."
pnpm build

echo "[3/6] Mengarsipkan hasil build..."
tar -czf $ARCHIVE_NAME package.json pnpm-lock.yaml .next public

echo "[4/6] Mengirim build ke server..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $TEMP_DIR"
scp $ARCHIVE_NAME $SERVER_USER@$SERVER_IP:$TEMP_DIR/

echo "[5/6] Menyebarkan build di server..."
ssh $SERVER_USER@$SERVER_IP /bin/bash << 'ENDSSH'
  set -e

  # Load NVM dengan benar
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

  SERVER_DIR="/home/joko/apps/kinigo/fe/"
  PORT="5003"
  PM2_NAME="kinigo-fe"
  TEMP_DIR="/home/joko/temp_deploy"
  ARCHIVE_NAME="build-fe.tar.gz"

  echo "Menggunakan Node.js versi default..."
  nvm use default

  echo "Ekstrak dan deploy build..."
  rm -rf "$SERVER_DIR"
  mkdir -p "$SERVER_DIR"
  tar -xzf "$TEMP_DIR/$ARCHIVE_NAME" -C "$SERVER_DIR"
  rm "$TEMP_DIR/$ARCHIVE_NAME"  # Hapus archive setelah ekstrak

  echo "Membersihkan husky dan cache di server..."
  cd "$SERVER_DIR"
  rm -rf node_modules pnpm-lock.yaml
  pnpm store prune

  echo "Instalasi dependensi..."
  pnpm install --production

  echo "Menjalankan Next.js dengan PM2..."
  pm2 delete "$PM2_NAME" || true
  pm2 start "pnpm start --port $PORT" --name "$PM2_NAME"
ENDSSH

echo "[6/6] Deploy selesai!"