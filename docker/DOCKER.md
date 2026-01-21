# 🐳 Docker Deployment Guide - Renessans Site

## Обзор

Docker-образ проекта включает:
- ✅ Backend API (ASP.NET Core 9.0)
- ✅ PostgreSQL 16 (база данных)
- ✅ pgAdmin (опционально, для управления БД через веб)
- ✅ Все зависимости и конфигурации
- ✅ Автоматические миграции
- ✅ Постоянное хранилище данных (volumes)

---

## 📋 Требования

### Необходимое ПО:
- **Docker Desktop** 20.10+ ([скачать](https://www.docker.com/products/docker-desktop))
  - Windows: Docker Desktop для Windows
  - macOS: Docker Desktop для Mac
  - Linux: Docker Engine + Docker Compose

### Проверка установки:
```bash
docker --version
docker compose version
```

---

## 🚀 Быстрый старт

### Вариант 1: Автоматический запуск (рекомендуется)

**Windows:**
```bash
docker-start.bat
```

**Linux/macOS:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Вариант 2: Ручной запуск

```bash
# 1. Создать .env файл из шаблона
cp env.docker.example .env

# 2. Отредактировать .env (ОБЯЗАТЕЛЬНО!)
# Измените POSTGRES_PASSWORD и JWT_SECRET_KEY

# 3. Запустить контейнеры
docker compose up -d --build
```

### После запуска:

Сервисы будут доступны по адресам:
- **API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger
- **PostgreSQL**: localhost:5432
- **pgAdmin** (опционально): http://localhost:5050

---

## 📁 Структура Docker файлов

```
renessans-site/
├── docker-compose.yml          # Конфигурация всех сервисов
├── backend/
│   ├── Dockerfile             # Образ Backend API
│   └── ...
├── .dockerignore              # Исключения для Docker
├── env.docker.example         # Шаблон переменных окружения
├── docker-start.bat/.sh       # Скрипты запуска
└── docker-stop.bat/.sh        # Скрипты остановки
```

---

## ⚙️ Конфигурация

### Создание .env файла

```bash
# Windows
copy env.docker.example .env

# Linux/macOS
cp env.docker.example .env
```

### Обязательные настройки в .env:

```bash
# PostgreSQL пароль (ИЗМЕНИТЕ!)
POSTGRES_PASSWORD=your_secure_password_here

# JWT секретный ключ (минимум 32 символа, ИЗМЕНИТЕ!)
JWT_SECRET_KEY=your-very-secure-jwt-secret-key-minimum-32-characters-long
```

### Опциональные настройки:

```bash
# Email (если нужна отправка писем)
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# pgAdmin (если будете использовать)
PGADMIN_EMAIL=admin@renessans.uz
PGADMIN_PASSWORD=admin_password
```

---

## 🎯 Основные команды

### Управление контейнерами:

```bash
# Запустить все сервисы
docker compose up -d

# Запустить с пересборкой
docker compose up -d --build

# Остановить все сервисы
docker compose down

# Остановить и удалить volumes (УДАЛИТ ВСЕ ДАННЫЕ!)
docker compose down -v

# Перезапустить сервисы
docker compose restart

# Перезапустить конкретный сервис
docker compose restart api
```

### Просмотр логов:

```bash
# Все логи
docker compose logs

# Логи конкретного сервиса
docker compose logs api
docker compose logs postgres

# Следить за логами в реальном времени
docker compose logs -f
docker compose logs -f api

# Последние 100 строк
docker compose logs --tail=100 api
```

### Проверка статуса:

```bash
# Список запущенных контейнеров
docker compose ps

# Подробная информация
docker compose ps -a

# Использование ресурсов
docker stats
```

### Управление данными:

```bash
# Список volumes
docker volume ls

# Информация о volume
docker volume inspect renessans-site_postgres_data

# Резервное копирование БД
docker compose exec postgres pg_dump -U renessans_user renessans > backup.sql

# Восстановление БД
docker compose exec -T postgres psql -U renessans_user renessans < backup.sql
```

---

## 🔧 Дополнительные возможности

### Запуск с pgAdmin

pgAdmin - веб-интерфейс для управления PostgreSQL.

```bash
# Запустить с pgAdmin
docker compose --profile with-pgadmin up -d

# Остановить только pgAdmin
docker compose stop pgadmin
```

После запуска откройте: http://localhost:5050

**Подключение к БД в pgAdmin:**
- Host: `postgres`
- Port: `5432`
- Database: `renessans`
- Username: `renessans_user`
- Password: (из .env файла)

### Подключение к БД извне

Можно подключиться к PostgreSQL с хоста или из других приложений:

```bash
# Из командной строки
psql -h localhost -p 5432 -U renessans_user -d renessans

# Connection string
host=localhost;port=5432;username=renessans_user;password=YOUR_PASSWORD;database=renessans
```

### Доступ к контейнеру

```bash
# Зайти в контейнер API
docker compose exec api bash

# Зайти в контейнер PostgreSQL
docker compose exec postgres bash

# Выполнить команду в контейнере
docker compose exec api dotnet --version
```

---

## 🗂️ Volumes (Постоянное хранилище)

Проект использует 3 volumes для сохранения данных:

1. **postgres_data** - База данных PostgreSQL
2. **api_images** - Загруженные изображения
3. **pgadmin_data** - Настройки pgAdmin (если используется)

### Управление volumes:

```bash
# Список volumes
docker volume ls | grep renessans

# Информация о volume
docker volume inspect renessans-site_postgres_data

# Резервное копирование volume
docker run --rm -v renessans-site_api_images:/data -v $(pwd):/backup alpine tar czf /backup/images-backup.tar.gz -C /data .

# Восстановление volume
docker run --rm -v renessans-site_api_images:/data -v $(pwd):/backup alpine tar xzf /backup/images-backup.tar.gz -C /data

# Удалить неиспользуемые volumes
docker volume prune
```

---

## 🔍 Troubleshooting

### Контейнеры не запускаются

```bash
# Проверьте логи
docker compose logs

# Проверьте статус
docker compose ps

# Пересоберите образы
docker compose up -d --build --force-recreate
```

### Порты заняты

Если порты 5000, 5432 или 5050 заняты, измените их в `docker-compose.yml`:

```yaml
services:
  api:
    ports:
      - "5001:80"  # Изменить на свободный порт
```

### Проблемы с подключением к БД

```bash
# Проверьте что PostgreSQL запущен
docker compose ps postgres

# Проверьте логи PostgreSQL
docker compose logs postgres

# Проверьте healthcheck
docker compose ps
```

### Очистка и перезапуск

```bash
# Полная очистка (УДАЛИТ ВСЕ ДАННЫЕ!)
docker compose down -v
docker system prune -a

# Пересоздание с нуля
docker compose up -d --build --force-recreate
```

### Проблемы с миграциями

```bash
# Проверьте логи API
docker compose logs api

# Вручную применить миграции
docker compose exec api dotnet ef database update
```

---

## 📊 Health Checks

Оба сервиса имеют health checks:

### PostgreSQL:
- Проверяет готовность базы данных
- Интервал: каждые 10 секунд

### API:
- Проверяет доступность endpoint `/api/enum/gettypes`
- Интервал: каждые 30 секунд
- Start period: 40 секунд (время на запуск)

Проверить статус:

```bash
docker compose ps
# Колонка "Status" покажет healthy/unhealthy
```

---

## 🚀 Production Deployment

### Рекомендации для production:

1. **Безопасность:**
   ```bash
   # Используйте сильные пароли
   POSTGRES_PASSWORD=$(openssl rand -base64 32)
   JWT_SECRET_KEY=$(openssl rand -base64 48)
   ```

2. **SSL/TLS:**
   - Настройте reverse proxy (Nginx/Traefik)
   - Используйте Let's Encrypt для SSL сертификатов

3. **Ресурсы:**
   ```yaml
   services:
     api:
       deploy:
         resources:
           limits:
             cpus: '2'
             memory: 2G
   ```

4. **Резервное копирование:**
   ```bash
   # Автоматическое резервное копирование БД (cron)
   0 2 * * * docker compose exec -T postgres pg_dump -U renessans_user renessans | gzip > /backups/renessans_$(date +\%Y\%m\%d).sql.gz
   ```

5. **Логирование:**
   ```yaml
   services:
     api:
       logging:
         driver: "json-file"
         options:
           max-size: "10m"
           max-file: "3"
   ```

6. **Мониторинг:**
   - Добавьте Prometheus + Grafana
   - Настройте alerts

---

## 🔄 CI/CD Integration

### GitHub Actions пример:

```yaml
name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build and test
        run: |
          docker compose build
          docker compose up -d
          docker compose exec -T api dotnet test
```

---

## 📦 Размеры образов

После оптимизации multi-stage build:

- **Backend API**: ~220 MB (ASP.NET Runtime)
- **PostgreSQL**: ~80 MB (Alpine base)
- **pgAdmin**: ~400 MB (опционально)

---

## 🎓 Полезные ссылки

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [ASP.NET Core Docker](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

---

## ✅ Чек-лист запуска

Перед запуском убедитесь:

- [ ] Docker Desktop установлен и запущен
- [ ] Файл `.env` создан из `env.docker.example`
- [ ] `POSTGRES_PASSWORD` изменён в `.env`
- [ ] `JWT_SECRET_KEY` изменён в `.env` (минимум 32 символа)
- [ ] Порты 5000 и 5432 свободны
- [ ] Достаточно места на диске (~2GB)

---

## 🆘 Получить помощь

```bash
# Диагностика
docker compose config       # Проверка конфигурации
docker compose ps          # Статус контейнеров
docker compose logs -f     # Логи в реальном времени
docker system df           # Использование диска

# Документация
docker compose --help
docker --help
```

---

**Готово!** 🎉 Теперь вы можете запустить весь проект одной командой!
