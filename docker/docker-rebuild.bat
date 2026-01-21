@echo off
chcp 65001 >nul
echo ========================================
echo    Пересборка Docker образов
echo ========================================
echo.

echo [1/4] Остановка контейнеров...
docker compose down
echo.

echo [2/4] Очистка NuGet кэша в проекте...
cd backend
for /r %%i in (project.assets.json) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.dgspec.json) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.g.props) do @if exist "%%i" del /f /q "%%i"
for /r %%i in (*.nuget.g.targets) do @if exist "%%i" del /f /q "%%i"
cd ..
echo ✅ Кэш очищен
echo.

echo [3/4] Удаление старых образов...
docker compose build --no-cache
echo.

echo [4/4] Запуск контейнеров...
docker compose up -d
echo.

echo ========================================
echo ✅ Пересборка завершена!
echo ========================================
echo.
echo Проверьте: http://localhost:5000/swagger
echo.

pause
