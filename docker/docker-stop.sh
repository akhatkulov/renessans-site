#!/bin/bash

echo "========================================"
echo "   Остановка контейнеров Renessans"
echo "========================================"
echo ""

docker compose down

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при остановке контейнеров"
    exit 1
fi

echo ""
echo "✅ Контейнеры успешно остановлены"
echo ""
echo "Для полного удаления данных используйте:"
echo "   docker compose down -v"
echo ""
