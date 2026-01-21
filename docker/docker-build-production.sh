#!/bin/bash

echo "========================================"
echo "   Сборка Production Docker Image"
echo "========================================"
echo ""

# Получить версию или использовать latest
read -p "Введите версию образа (например, 1.0.0) или нажмите Enter для 'latest': " VERSION
VERSION=${VERSION:-latest}

IMAGE_NAME="renessans-api"
REGISTRY_PREFIX=""

echo ""
echo "[1/4] Очистка NuGet кэша..."
cd backend
find . -name "project.assets.json" -type f -delete
find . -name "*.nuget.dgspec.json" -type f -delete
find . -name "*.nuget.g.props" -type f -delete
find . -name "*.nuget.g.targets" -type f -delete
cd ..
echo "✅ Кэш очищен"
echo ""

echo "[2/4] Сборка Docker образа..."
echo "Тег: $IMAGE_NAME:$VERSION"
docker build -t $IMAGE_NAME:$VERSION -f backend/Dockerfile backend/
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке образа"
    exit 1
fi
echo "✅ Образ собран"
echo ""

echo "[3/4] Добавление тега 'latest'..."
docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest
echo "✅ Тег добавлен"
echo ""

echo "[4/4] Информация об образе..."
docker images | grep $IMAGE_NAME
echo ""

echo "========================================"
echo "✅ Production образ готов!"
echo "========================================"
echo ""
echo "Образ: $IMAGE_NAME:$VERSION"
echo ""
echo "📦 Следующие шаги:"
echo ""
echo "1. Сохранить образ в файл:"
echo "   docker save $IMAGE_NAME:$VERSION -o renessans-api-$VERSION.tar"
echo "   gzip renessans-api-$VERSION.tar"
echo ""
echo "2. Отправить в Docker Registry:"
echo "   docker tag $IMAGE_NAME:$VERSION your-registry.com/$IMAGE_NAME:$VERSION"
echo "   docker push your-registry.com/$IMAGE_NAME:$VERSION"
echo ""
echo "3. Тестирование локально:"
echo "   docker compose up -d"
echo ""
echo "4. Развернуть на сервере:"
echo "   См. файл DEPLOYMENT.md"
echo ""
