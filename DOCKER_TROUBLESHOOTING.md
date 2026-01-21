# 🐛 Docker - Решение проблем

## Проблема с NuGet fallback folder

### Симптомы:
```
error MSB4018: Unable to find fallback package folder 'C:\Program Files (x86)\Microsoft Visual Studio\Shared\NuGetPackages'
```

### Причина:
Проект был создан в Windows с Visual Studio, и в кэше NuGet сохранились Windows-специфичные пути. При сборке в Docker (Linux контейнере) эти пути недоступны.

### Решение:

#### Вариант 1: Автоматическая пересборка (рекомендуется)

```bash
# Windows
docker-rebuild.bat

# Linux/macOS
chmod +x docker-rebuild.sh
./docker-rebuild.sh
```

Этот скрипт:
1. Остановит контейнеры
2. Очистит NuGet кэш
3. Пересоберёт образы с нуля
4. Запустит контейнеры

#### Вариант 2: Ручная очистка

```bash
# 1. Остановить контейнеры
docker compose down

# 2. Очистить NuGet кэш в проекте
cd backend
# Windows PowerShell
Get-ChildItem -Recurse -Filter "project.assets.json" | Remove-Item -Force
Get-ChildItem -Recurse -Filter "*.nuget.dgspec.json" | Remove-Item -Force
Get-ChildItem -Recurse -Filter "*.nuget.g.props" | Remove-Item -Force
Get-ChildItem -Recurse -Filter "*.nuget.g.targets" | Remove-Item -Force

# Linux/macOS
find . -name "project.assets.json" -delete
find . -name "*.nuget.dgspec.json" -delete
find . -name "*.nuget.g.props" -delete
find . -name "*.nuget.g.targets" -delete

cd ..

# 3. Пересобрать образы
docker compose build --no-cache

# 4. Запустить
docker compose up -d
```

---

## Другие частые проблемы

### 1. Порт уже занят

**Ошибка:**
```
Error starting userland proxy: listen tcp4 0.0.0.0:5000: bind: address already in use
```

**Решение:**
Измените порт в `docker-compose.yml`:
```yaml
api:
  ports:
    - "5001:80"  # Изменить первое число
```

### 2. Недостаточно места на диске

**Ошибка:**
```
no space left on device
```

**Решение:**
```bash
# Очистка неиспользуемых образов и контейнеров
docker system prune -a

# Проверка использования диска
docker system df
```

### 3. Контейнер постоянно перезапускается

**Проверка:**
```bash
# Статус контейнеров
docker compose ps

# Логи с ошибками
docker compose logs api
```

**Частые причины:**
- Ошибка подключения к БД (проверьте логи PostgreSQL)
- Ошибка в миграциях (проверьте логи API)
- Неверные переменные окружения в .env

### 4. PostgreSQL не готов

**Ошибка в логах API:**
```
Npgsql.NpgsqlException: Connection refused
```

**Решение:**
```bash
# Проверить статус PostgreSQL
docker compose ps postgres

# Перезапустить PostgreSQL
docker compose restart postgres

# Проверить логи PostgreSQL
docker compose logs postgres
```

### 5. Миграции не применяются

**Решение:**
```bash
# Зайти в контейнер API
docker compose exec api bash

# Вручную применить миграции
dotnet ef database update

# Выйти
exit

# Или пересоздать контейнеры
docker compose down -v
docker compose up -d
```

---

## Команды диагностики

```bash
# Статус всех контейнеров
docker compose ps

# Логи в реальном времени
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f api
docker compose logs -f postgres

# Проверка сети
docker compose exec api ping postgres

# Проверка подключения к БД
docker compose exec api dotnet ef database list

# Зайти в контейнер
docker compose exec api bash
docker compose exec postgres bash

# Проверка переменных окружения
docker compose exec api env | grep ConnectionStrings

# Использование ресурсов
docker stats

# Проверка volumes
docker volume ls
docker volume inspect renessans-site_postgres_data
```

---

## Полная переустановка

Если ничего не помогает:

```bash
# 1. Остановить и удалить всё (УДАЛИТ ВСЕ ДАННЫЕ!)
docker compose down -v

# 2. Очистить Docker
docker system prune -a --volumes

# 3. Очистить NuGet кэш в проекте
cd backend
# Windows
Get-ChildItem -Recurse obj,bin | Remove-Item -Recurse -Force
# Linux/macOS
find . -type d -name "obj" -o -name "bin" | xargs rm -rf
cd ..

# 4. Пересобрать и запустить
docker compose up -d --build
```

---

## Проверка успешного запуска

```bash
# 1. Все контейнеры должны быть "Up" и "healthy"
docker compose ps

# 2. API должно отвечать
curl http://localhost:5000/api/enum/gettypes

# 3. Swagger должен открываться
# Откройте в браузере: http://localhost:5000/swagger

# 4. БД доступна
docker compose exec postgres psql -U renessans_user -d renessans -c "\dt"
```

---

## Полезные ссылки

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Troubleshooting](https://docs.docker.com/compose/troubleshooting/)
- [ASP.NET Core Docker](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/)

---

**Если проблема не решена**, создайте issue с:
1. Полными логами: `docker compose logs > logs.txt`
2. Статусом контейнеров: `docker compose ps`
3. Версией Docker: `docker --version`
4. Операционной системой
