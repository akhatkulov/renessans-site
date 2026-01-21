@echo off
chcp 65001 >nul
echo ========================================
echo    Сборка Production Docker Image
echo ========================================
echo.

:: Получить версию или использовать latest
set /p VERSION="Введите версию образа (например, 1.0.0) или нажмите Enter для 'latest': "
if "%VERSION%"=="" set VERSION=latest

set IMAGE_NAME=renessans-api
set REGISTRY_PREFIX=

echo.
echo [1/4] Очистка NuGet кэша...
cd backend
for /r %%i in (project.assets.json) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.dgspec.json) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.g.props) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.g.targets) do @if exist "%%i" del /f /q "%%i"
cd ..
echo ✅ Кэш очищен
echo.

echo [2/4] Сборка Docker образа...
echo Тег: %IMAGE_NAME%:%VERSION%
docker build -t %IMAGE_NAME%:%VERSION% -f backend/Dockerfile backend/
if errorlevel 1 (
    echo ❌ Ошибка при сборке образа
    pause
    exit /b 1
)
echo ✅ Образ собран
echo.

echo [3/4] Добавление тега 'latest'...
docker tag %IMAGE_NAME%:%VERSION% %IMAGE_NAME%:latest
echo ✅ Тег добавлен
echo.

echo [4/4] Информация об образе...
docker images | findstr %IMAGE_NAME%
echo.

echo ========================================
echo ✅ Production образ готов!
echo ========================================
echo.
echo Образ: %IMAGE_NAME%:%VERSION%
echo.
echo 📦 Следующие шаги:
echo.
echo 1. Сохранить образ в файл:
echo    docker save %IMAGE_NAME%:%VERSION% -o renessans-api-%VERSION%.tar
echo    gzip renessans-api-%VERSION%.tar
echo.
echo 2. Отправить в Docker Registry:
echo    docker tag %IMAGE_NAME%:%VERSION% your-registry.com/%IMAGE_NAME%:%VERSION%
echo    docker push your-registry.com/%IMAGE_NAME%:%VERSION%
echo.
echo 3. Тестирование локально:
echo    docker compose up -d
echo.
echo 4. Развернуть на сервере:
echo    См. файл DEPLOYMENT.md
echo.

pause
