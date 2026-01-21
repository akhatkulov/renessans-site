# 🚀 Production Deployment Guide

## Развертывание Renessans Site на сервере

Это руководство описывает развертывание проекта на production сервере.

---

## 📋 Требования к серверу

### Минимальные требования:
- **OS**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / любой Linux с Docker
- **CPU**: 2 cores
- **RAM**: 4 GB (рекомендуется 8 GB)
- **Disk**: 20 GB свободного места
- **Docker**: 20.10+
- **Docker Compose**: 2.0+

### Открытые порты:
- `80` - HTTP
- `443` - HTTPS
- `5432` - PostgreSQL (только для внутренней сети, не публично!)

---

## 🎯 Способы развертывания

### Способ 1: Docker Compose (рекомендуется для простых случаев)

### Способ 2: Docker Swarm (для кластера)

### Способ 3: Kubernetes (для больших проектов)

---

## 📦 Способ 1: Docker Compose Deployment

### Шаг 1: Подготовка сервера

```bash
# Подключитесь к серверу
ssh user@your-server.com

# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Docker и Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавьте пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker

# Проверьте установку
docker --version
docker compose version
```

### Шаг 2: Создайте директорию для проекта

```bash
# Создайте директорию
sudo mkdir -p /opt/renessans
sudo chown $USER:$USER /opt/renessans
cd /opt/renessans
```

### Шаг 3A: Загрузка образа из файла (если нет Registry)

```bash
# На локальной машине: сохраните образ
docker save renessans-api:latest -o renessans-api.tar
gzip renessans-api.tar

# Скопируйте на сервер
scp renessans-api.tar.gz user@your-server.com:/opt/renessans/

# На сервере: загрузите образ
cd /opt/renessans
gunzip renessans-api.tar.gz
docker load -i renessans-api.tar
rm renessans-api.tar
```

### Шаг 3B: Загрузка из Docker Registry (если используете)

```bash
# На сервере
docker pull your-registry.com/renessans-api:latest
```

### Шаг 4: Создайте конфигурационные файлы

```bash
cd /opt/renessans

# Создайте docker-compose.yml
cat > docker-compose.yml << 'EOF'
services:
  postgres:
    image: postgres:16-alpine
    container_name: renessans-postgres
    restart: always
    environment:
      POSTGRES_DB: renessans
      POSTGRES_USER: renessans_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - renessans-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U renessans_user -d renessans"]
      interval: 10s
      timeout: 5s
      retries: 5

  api:
    image: renessans-api:latest
    container_name: renessans-api
    restart: always
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      ConnectionStrings__DefaultConnection: "host=postgres;port=5432;username=renessans_user;password=${POSTGRES_PASSWORD};database=renessans;"
      JWT__Key: ${JWT_SECRET_KEY}
      JWT__ValidIssuer: "RenessansAPI"
      JWT__Expire: "2"
      JWT__ResExpire: "30"
      JWT__Audience: "Renessans.uz"
      Email__SmtpHost: ${EMAIL_SMTP_HOST}
      Email__SmtpPort: ${EMAIL_SMTP_PORT}
      Email__UserName: ${EMAIL_USERNAME}
      Email__Password: ${EMAIL_PASSWORD}
      Email__UseSsl: ${EMAIL_USE_SSL}
      Email__From: ${EMAIL_FROM}
      Email__DisplayName: "Renessans"
      Pagination__DefaultPageSize: 10
      Pagination__MaxPageSize: 50
      ASPNETCORE_ENVIRONMENT: Production
      ASPNETCORE_URLS: "http://+:80"
    volumes:
      - api_images:/app/wwwroot/images
    networks:
      - renessans-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/api/enum/gettypes"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    container_name: renessans-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - nginx_cache:/var/cache/nginx
    depends_on:
      - api
    networks:
      - renessans-network

volumes:
  postgres_data:
    driver: local
  api_images:
    driver: local
  nginx_cache:
    driver: local

networks:
  renessans-network:
    driver: bridge
EOF
```

### Шаг 5: Создайте .env файл

```bash
cat > .env << 'EOF'
# PostgreSQL
POSTGRES_PASSWORD=YOUR_SUPER_SECURE_PASSWORD_HERE

# JWT (минимум 32 символа)
JWT_SECRET_KEY=YOUR_SUPER_SECURE_JWT_KEY_MINIMUM_32_CHARACTERS_LONG

# Email (опционально)
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_USE_SSL=true
EMAIL_FROM=your-email@gmail.com
EOF

# ВАЖНО: Измените пароли!
nano .env

# Ограничьте доступ к .env
chmod 600 .env
```

### Шаг 6: Создайте конфигурацию Nginx

```bash
mkdir -p ssl

cat > nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    upstream api {
        server api:80;
    }

    # HTTP -> HTTPS redirect
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # HTTPS
    server {
        listen 443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;

        # SSL настройки
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Proxy to API
        location / {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection keep-alive;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Real-IP $remote_addr;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # SignalR WebSocket
        location /hubs/ {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static files caching
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            proxy_pass http://api;
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF

# Измените your-domain.com на ваш домен
nano nginx.conf
```

### Шаг 7: Получите SSL сертификат (Let's Encrypt)

```bash
# Установите Certbot
sudo apt install certbot

# Получите сертификат
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Скопируйте сертификаты
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/
sudo chown $USER:$USER ./ssl/*.pem

# Настройте автообновление
sudo crontab -e
# Добавьте строку:
0 0 1 * * certbot renew --quiet && cp /etc/letsencrypt/live/your-domain.com/*.pem /opt/renessans/ssl/ && docker compose -f /opt/renessans/docker-compose.yml restart nginx
```

### Шаг 8: Запустите приложение

```bash
cd /opt/renessans

# Запустите контейнеры
docker compose up -d

# Проверьте статус
docker compose ps

# Проверьте логи
docker compose logs -f
```

### Шаг 9: Проверьте работу

```bash
# Проверьте API
curl http://localhost/api/enum/gettypes

# Или откройте в браузере
https://your-domain.com/swagger
```

---

## 🔧 Управление на сервере

### Просмотр логов:
```bash
# Все логи
docker compose logs -f

# Только API
docker compose logs -f api

# Только PostgreSQL
docker compose logs -f postgres

# Последние 100 строк
docker compose logs --tail=100 api
```

### Перезапуск:
```bash
# Перезапустить все
docker compose restart

# Перезапустить API
docker compose restart api

# Остановить все
docker compose down

# Запустить снова
docker compose up -d
```

### Обновление образа:
```bash
cd /opt/renessans

# Остановить контейнеры
docker compose down

# Загрузить новый образ (из файла или registry)
docker load -i renessans-api-new.tar
# или
docker pull your-registry.com/renessans-api:latest

# Запустить с новым образом
docker compose up -d

# Проверить
docker compose ps
docker compose logs -f api
```

### Резервное копирование:

```bash
# Создать директорию для бэкапов
mkdir -p /opt/renessans/backups

# Бэкап базы данных
docker compose exec postgres pg_dump -U renessans_user renessans | gzip > /opt/renessans/backups/backup-$(date +%Y%m%d-%H%M%S).sql.gz

# Бэкап изображений
docker run --rm -v renessans_api_images:/data -v /opt/renessans/backups:/backup alpine tar czf /backup/images-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .

# Автоматический бэкап (cron)
crontab -e
# Добавьте:
0 2 * * * docker compose -f /opt/renessans/docker-compose.yml exec -T postgres pg_dump -U renessans_user renessans | gzip > /opt/renessans/backups/backup-$(date +\%Y\%m\%d).sql.gz
```

### Восстановление из бэкапа:

```bash
# Восстановить БД
gunzip < /opt/renessans/backups/backup-20260121.sql.gz | docker compose exec -T postgres psql -U renessans_user renessans

# Восстановить изображения
docker run --rm -v renessans_api_images:/data -v /opt/renessans/backups:/backup alpine tar xzf /backup/images-20260121.tar.gz -C /data
```

---

## 🔐 Безопасность Production

### 1. Firewall (UFW):
```bash
# Установить UFW
sudo apt install ufw

# Разрешить SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443

# НЕ открывайте порт 5432 публично!

# Включить firewall
sudo ufw enable

# Проверить статус
sudo ufw status
```

### 2. Fail2Ban (защита от брутфорса):
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Регулярные обновления:
```bash
# Автоматические обновления безопасности
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 4. Мониторинг:
```bash
# Установить мониторинг (опционально)
# Prometheus + Grafana или другие инструменты
```

---

## 📊 Мониторинг и метрики

### Проверка здоровья:
```bash
# Health check API (публичный endpoint, не требует токена)
curl http://localhost/api/tiding/public

# Статус контейнеров
docker compose ps

# Использование ресурсов
docker stats

# Логи ошибок
docker compose logs --tail=100 api | grep -i error
```

### Системные метрики:
```bash
# Использование диска
df -h

# Использование памяти
free -h

# Загрузка CPU
top

# Docker использование диска
docker system df
```

---

## 🔄 CI/CD Pipeline (опционально)

### GitHub Actions пример:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t renessans-api:${{ github.ref_name }} -f backend/Dockerfile backend/
      
      - name: Save image
        run: |
          docker save renessans-api:${{ github.ref_name }} | gzip > renessans-api.tar.gz
      
      - name: Deploy to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "renessans-api.tar.gz,docker-compose.yml"
          target: "/opt/renessans"
      
      - name: Restart containers
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/renessans
            docker load -i renessans-api.tar.gz
            docker compose down
            docker compose up -d
```

---

## ✅ Чек-лист Production Deployment

Перед запуском на production:

- [ ] Docker и Docker Compose установлены
- [ ] Сервер обновлен
- [ ] Firewall настроен
- [ ] SSL сертификат получен и установлен
- [ ] .env файл создан и заполнен
- [ ] Пароли изменены на безопасные
- [ ] Nginx сконфигурирован
- [ ] Домен указывает на сервер
- [ ] Резервное копирование настроено
- [ ] Мониторинг настроен
- [ ] Тестирование пройдено

---

## 🆘 Troubleshooting Production

См. **DOCKER_TROUBLESHOOTING.md** для решения проблем.

Дополнительно для production:
- Проверьте логи Nginx: `docker compose logs nginx`
- Проверьте сертификаты: `openssl s_client -connect your-domain.com:443`
- Проверьте DNS: `dig your-domain.com`
- Проверьте порты: `sudo netstat -tulpn | grep LISTEN`

---

**Успешного развертывания!** 🚀
