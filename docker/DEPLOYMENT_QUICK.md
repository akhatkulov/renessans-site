# 🚀 Быстрое развертывание на сервере

## Шаг 1: Соберите образ локально

```bash
# Windows
docker-build-production.bat

# Linux/macOS
chmod +x docker-build-production.sh
./docker-build-production.sh
```

Введите версию (например, `1.0.0`) или нажмите Enter для `latest`.

---

## Шаг 2: Сохраните образ в файл

```bash
docker save renessans-api:latest -o renessans-api.tar
gzip renessans-api.tar
```

Теперь у вас есть файл `renessans-api.tar.gz` (~220MB)

---

## Шаг 3: Скопируйте на сервер

```bash
# Скопируйте образ
scp renessans-api.tar.gz user@your-server.com:/tmp/

# Скопируйте docker-compose для production
scp deployment/docker-compose.production.yml user@your-server.com:/tmp/
```

---

## Шаг 4: На сервере - подготовка

```bash
# Подключитесь к серверу
ssh user@your-server.com

# Создайте директорию
sudo mkdir -p /opt/renessans
sudo chown $USER:$USER /opt/renessans
cd /opt/renessans

# Установите Docker (если еще нет)
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
```

---

## Шаг 5: Загрузите образ

```bash
cd /opt/renessans

# Переместите и загрузите образ
mv /tmp/renessans-api.tar.gz .
gunzip renessans-api.tar.gz
docker load -i renessans-api.tar
rm renessans-api.tar
```

---

## Шаг 6: Создайте конфигурацию

```bash
# Создайте docker-compose.yml (МИНИМАЛЬНАЯ версия)
cat > docker-compose.yml << 'EOF'
services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: renessans
      POSTGRES_USER: renessans_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - renessans-network

  api:
    image: renessans-api:latest
    restart: always
    depends_on:
      - postgres
    environment:
      ConnectionStrings__DefaultConnection: "host=postgres;port=5432;username=renessans_user;password=${POSTGRES_PASSWORD};database=renessans;"
      JWT__Key: ${JWT_SECRET_KEY}
      JWT__ValidIssuer: "RenessansAPI"
      JWT__Audience: "Renessans.uz"
      ASPNETCORE_ENVIRONMENT: Production
      ASPNETCORE_URLS: "http://+:80"
    ports:
      - "80:80"
    volumes:
      - api_images:/app/wwwroot/images
    networks:
      - renessans-network

volumes:
  postgres_data:
  api_images:

networks:
  renessans-network:
EOF

# Создайте .env
cat > .env << 'EOF'
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD
JWT_SECRET_KEY=CHANGE_THIS_TO_SECURE_KEY_MINIMUM_32_CHARACTERS
EOF

# ВАЖНО: Измените пароли!
nano .env
chmod 600 .env
```

---

## Шаг 7: Запустите

```bash
docker compose up -d
```

---

## Шаг 8: Проверьте

```bash
# Статус
docker compose ps

# Логи
docker compose logs -f

# Тест API (публичный endpoint)
curl http://localhost/api/tiding/public
```

---

## Готово! 🎉

Ваш API работает на `http://your-server-ip/swagger`

---

## Для HTTPS (рекомендуется)

См. полную инструкцию в **DEPLOYMENT.md** раздел "SSL сертификат"

Или быстро:

```bash
# Установите Certbot
sudo apt install certbot nginx

# Получите сертификат
sudo certbot --nginx -d your-domain.com
```

---

## Управление

```bash
# Остановить
docker compose down

# Перезапустить
docker compose restart

# Логи
docker compose logs -f api

# Бэкап БД
docker compose exec postgres pg_dump -U renessans_user renessans > backup.sql
```

---

**Полная документация**: DEPLOYMENT.md
