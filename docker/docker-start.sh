#!/bin/bash

echo "========================================"
echo "   Renessans Site - Docker Launcher"
echo "========================================"
echo ""

# Проверка наличия Docker
echo "[1/4] Проверка Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ ERROR: Docker не установлен!"
    echo "   Установите Docker: https://docs.docker.com/get-docker/"
    exit 1
fi
echo "✅ Docker найден"
echo ""

# Проверка наличия Docker Compose
echo "[2/4] Проверка Docker Compose..."
if ! docker compose version &> /dev/null; then
    echo "❌ ERROR: Docker Compose не найден!"
    echo "   Обновите Docker до последней версии"
    exit 1
fi
echo "✅ Docker Compose найден"
echo ""

# Проверка .env файла
echo "[3/4] Проверка конфигурации..."
if [ ! -f ".env" ]; then
    echo "⚠️  WARNING: Файл .env не найден"
    echo "   Создаём .env из шаблона..."
    if [ -f "env.docker.example" ]; then
        cp env.docker.example .env
        echo "✅ Файл .env создан"
        echo ""
        echo "⚠️  ВАЖНО: Отредактируйте файл .env и измените:"
        echo "   - POSTGRES_PASSWORD"
        echo "   - JWT_SECRET_KEY"
        echo ""
        read -p "Нажмите Enter для продолжения..."
    else
        echo "❌ ERROR: Файл env.docker.example не найден"
        exit 1
    fi
fi
echo "✅ Конфигурация готова"
echo ""

# Запуск Docker Compose
echo "[4/4] Запуск контейнеров..."
echo ""
echo "Это может занять несколько минут при первом запуске..."
echo ""

docker compose up -d --build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Не удалось запустить контейнеры"
    echo "   Проверьте логи: docker compose logs"
    exit 1
fi

echo ""
echo "========================================"
echo "✅ Контейнеры успешно запущены!"
echo "========================================"
echo ""
echo "🌐 Сервисы доступны по адресам:"
echo "   API:        http://localhost:5000"
echo "   Swagger:    http://localhost:5000/swagger"
echo "   PostgreSQL: localhost:5432"
echo ""
echo "📊 Полезные команды:"
echo "   Просмотр логов:      docker compose logs -f"
echo "   Остановить:          docker compose down"
echo "   Перезапустить:       docker compose restart"
echo "   Статус контейнеров:  docker compose ps"
echo ""
echo "💡 Для запуска pgAdmin (веб-интерфейс БД):"
echo "   docker compose --profile with-pgadmin up -d"
echo "   Затем откройте: http://localhost:5050"
echo ""
