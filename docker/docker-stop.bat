@echo off
chcp 65001 >nul
echo ========================================
echo    Остановка контейнеров Renessans
echo ========================================
echo.

docker compose down

if errorlevel 1 (
    echo ❌ Ошибка при остановке контейнеров
    pause
    exit /b 1
)

echo.
echo ✅ Контейнеры успешно остановлены
echo.
echo Для полного удаления данных используйте:
echo    docker compose down -v
echo.

pause
