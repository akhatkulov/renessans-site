@echo off
chcp 65001 >nul
echo ========================================
echo    Renessans Site - Docker Launcher
echo ========================================
echo.

:: Проверка наличия Docker
echo [1/4] Проверка Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Docker не установлен!
    echo    Установите Docker Desktop: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo ✅ Docker найден
echo.

:: Проверка наличия Docker Compose
echo [2/4] Проверка Docker Compose...
docker compose version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Docker Compose не найден!
    echo    Обновите Docker Desktop до последней версии
    pause
    exit /b 1
)
echo ✅ Docker Compose найден
echo.

:: Проверка .env файла
echo [3/4] Проверка конфигурации...
if not exist ".env" (
    echo ⚠️  WARNING: Файл .env не найден
    echo    Создаём .env из шаблона...
    copy env.docker.example .env >nul 2>&1
    if errorlevel 1 (
        echo ❌ ERROR: Не удалось создать .env файл
        pause
        exit /b 1
    )
    echo ✅ Файл .env создан
    echo.
    echo ⚠️  ВАЖНО: Отредактируйте файл .env и измените:
    echo    - POSTGRES_PASSWORD
    echo    - JWT_SECRET_KEY
    echo.
    pause
)
echo ✅ Конфигурация готова
echo.

:: Запуск Docker Compose
echo [4/4] Запуск контейнеров...
echo.
echo Это может занять несколько минут при первом запуске...
echo.

docker compose up -d --build

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Не удалось запустить контейнеры
    echo    Проверьте логи: docker compose logs
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ Контейнеры успешно запущены!
echo ========================================
echo.
echo 🌐 Сервисы доступны по адресам:
echo    API:        http://localhost:5000
echo    Swagger:    http://localhost:5000/swagger
echo    PostgreSQL: localhost:5432
echo.
echo 📊 Полезные команды:
echo    Просмотр логов:      docker compose logs -f
echo    Остановить:          docker compose down
echo    Перезапустить:       docker compose restart
echo    Статус контейнеров:  docker compose ps
echo.
echo 💡 Для запуска pgAdmin (веб-интерфейс БД):
echo    docker compose --profile with-pgadmin up -d
echo    Затем откройте: http://localhost:5050
echo.

pause
