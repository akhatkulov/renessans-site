#!/bin/bash

echo "========================================"
echo "   Пересборка Docker образов"
echo "========================================"
echo ""

echo "[1/4] Остановка контейнеров..."
docker compose down
echo ""

echo "[2/4] Очистка NuGet кэша в проекте..."
cd backend
find . -name "project.assets.json" -type f -delete
find . -name "*.nuget.dgspec.json" -type f -delete
find . -name "*.nuget.g.props" -type f -delete
find . -name "*.nuget.g.targets" -type f -delete
cd ..
echo "✅ Кэш очищен"
echo ""

echo "[3/4] Удаление старых образов..."
docker compose build --no-cache
echo ""

echo "[4/4] Запуск контейнеров..."
docker compose up -d
echo ""

echo "========================================"
echo "✅ Пересборка завершена!"
echo "========================================"
echo ""
echo "Проверьте: http://localhost:5000/swagger"
echo ""
