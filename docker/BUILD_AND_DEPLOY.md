# 🏗️ Сборка и развертывание Docker образа

## Краткая инструкция

### ✅ Что вам нужно сделать:

1. **Соберите Docker образ**
2. **Сохраните его в файл или загрузите в registry**
3. **Разверните на сервере**

---

## 🔨 Шаг 1: Сборка образа

### На вашей локальной машине:

```bash
# Windows
docker-build-production.bat

# Linux/macOS
chmod +x docker-build-production.sh
./docker-build-production.sh
```

Скрипт:
- Очистит NuGet кэш
- Соберёт Docker образ
- Добавит тег `latest`
- Покажет информацию об образе

**Размер образа**: ~220MB (оптимизированный)

---

## 📦 Шаг 2: Экспорт образа

### Вариант A: Сохранение в файл (для переноса на сервер)

```bash
# Сохраните образ
docker save renessans-api:latest -o renessans-api.tar

# Сжмите (опционально, уменьшит размер в ~2 раза)
gzip renessans-api.tar

# Теперь у вас есть файл renessans-api.tar.gz
# Скопируйте его на сервер через SCP, FTP или USB
```

### Вариант B: Загрузка в Docker Registry (рекомендуется для CI/CD)

```bash
# Docker Hub
docker tag renessans-api:latest YOUR_USERNAME/renessans-api:latest
docker push YOUR_USERNAME/renessans-api:latest

# Приватный registry
docker tag renessans-api:latest registry.your-company.com/renessans-api:latest
docker push registry.your-company.com/renessans-api:latest

# GitHub Container Registry
docker tag renessans-api:latest ghcr.io/YOUR_USERNAME/renessans-api:latest
docker push ghcr.io/YOUR_USERNAME/renessans-api:latest
```

---

## 🚀 Шаг 3: Развертывание на сервере

### Краткая версия (DEPLOYMENT_QUICK.md):

```bash
# 1. Скопируйте файл на сервер
scp renessans-api.tar.gz user@your-server.com:/tmp/

# 2. На сервере: загрузите образ
ssh user@your-server.com
cd /opt/renessans
docker load -i /tmp/renessans-api.tar.gz

# 3. Создайте docker-compose.yml и .env
# (см. deployment/docker-compose.production.yml)

# 4. Запустите
docker compose up -d
```

### Полная версия (DEPLOYMENT.md):
- Настройка сервера
- SSL сертификат (HTTPS)
- Nginx reverse proxy
- Резервное копирование
- Мониторинг
- Безопасность

---

## 📂 Файлы для развертывания

### Минимальный набор:

1. **renessans-api.tar.gz** - Docker образ (~220MB сжатый)
2. **deployment/docker-compose.production.yml** - Конфигурация Docker Compose
3. **deployment/env.production.example** - Шаблон переменных окружения

### Скопируйте на сервер:

```bash
scp renessans-api.tar.gz user@server:/opt/renessans/
scp deployment/docker-compose.production.yml user@server:/opt/renessans/docker-compose.yml
scp deployment/env.production.example user@server:/opt/renessans/.env
```

На сервере отредактируйте `.env` и измените пароли!

---

## 🎯 Быстрый старт на сервере

```bash
# 1. Подготовка
sudo mkdir -p /opt/renessans
cd /opt/renessans

# 2. Загрузка образа
docker load -i renessans-api.tar.gz

# 3. Создание .env (ИЗМЕНИТЕ ПАРОЛИ!)
cat > .env << 'EOF'
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET_KEY=your_secure_jwt_key_32_chars_minimum
EOF

# 4. Запуск
docker compose up -d

# 5. Проверка
docker compose ps
docker compose logs -f
```

Готово! API доступно на `http://your-server-ip/swagger`

---

## 🔄 Обновление образа на сервере

```bash
# 1. Скопируйте новый образ
scp renessans-api-v2.tar.gz user@server:/opt/renessans/

# 2. На сервере
cd /opt/renessans
docker compose down
docker load -i renessans-api-v2.tar.gz
docker compose up -d

# 3. Проверка
docker compose logs -f api
```

---

## 📊 Проверка работы

```bash
# Статус контейнеров
docker compose ps

# Должно быть:
# renessans-postgres  running (healthy)
# renessans-api       running (healthy)

# Логи
docker compose logs -f

# Тест API (публичный endpoint, не требует токена)
curl http://localhost/api/tiding/public

# Swagger UI
# Откройте в браузере: http://your-server-ip/swagger
```

---

## 🔐 Важно для production!

### Перед запуском на production:

1. ✅ Измените `POSTGRES_PASSWORD` в `.env`
2. ✅ Измените `JWT_SECRET_KEY` в `.env` (минимум 32 символа)
3. ✅ Настройте HTTPS (SSL сертификат)
4. ✅ Настройте firewall
5. ✅ Настройте резервное копирование
6. ✅ Настройте мониторинг

### Генерация безопасных паролей:

```bash
# Linux/macOS/Git Bash
openssl rand -base64 32

# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

---

## 📚 Документация

| Файл | Описание |
|------|----------|
| **DEPLOYMENT_QUICK.md** | Быстрое развертывание (5 минут) |
| **DEPLOYMENT.md** | Полное руководство (production-ready) |
| **DOCKER.md** | Docker команды и настройки |
| **DOCKER_TROUBLESHOOTING.md** | Решение проблем |

---

## 🆘 Помощь

### Если что-то не работает:

```bash
# Проверьте логи
docker compose logs -f api
docker compose logs -f postgres

# Проверьте статус
docker compose ps

# Перезапустите
docker compose restart

# Полная переустановка
docker compose down -v
docker compose up -d
```

См. **DOCKER_TROUBLESHOOTING.md** для подробного troubleshooting.

---

**Успешной сборки и развертывания!** 🚀
