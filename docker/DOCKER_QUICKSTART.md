# 🐳 Docker - Быстрый старт (2 минуты)

## Что вы получите

✅ Backend API (ASP.NET Core 9.0)  
✅ PostgreSQL база данных  
✅ Автоматические миграции  
✅ Все настроено и готово к работе  

---

## Запуск за 3 шага

### 1️⃣ Установите Docker Desktop

**Windows/macOS**: https://www.docker.com/products/docker-desktop  
**Linux**: https://docs.docker.com/engine/install/

Проверьте: `docker --version`

### 2️⃣ Настройте пароли

```bash
# Создайте .env файл
copy env.docker.example .env          # Windows
cp env.docker.example .env            # Linux/macOS

# Отредактируйте .env и измените:
# - POSTGRES_PASSWORD
# - JWT_SECRET_KEY (минимум 32 символа)
```

### 3️⃣ Запустите

**Windows:**
```bash
docker-start.bat
```

**Linux/macOS:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

**Или вручную:**
```bash
docker compose up -d --build
```

---

## Готово! 🎉

Откройте в браузере:
- **Swagger API**: http://localhost:5000/swagger
- **API**: http://localhost:5000

---

## Полезные команды

```bash
# Просмотр логов
docker compose logs -f

# Остановить
docker compose down

# Перезапустить
docker compose restart

# Статус
docker compose ps
```

---

## Что внутри?

- **Backend API** на порту 5000
- **PostgreSQL** на порту 5432
- **Volumes** для сохранения данных
- **Автоматические миграции** при запуске
- **Health checks** для проверки работоспособности

---

## Опционально: pgAdmin

Веб-интерфейс для управления БД:

```bash
docker compose --profile with-pgadmin up -d
```

Откройте: http://localhost:5050

---

## Проблемы?

См. полную документацию: **DOCKER.md**

```bash
# Пересобрать всё заново
docker compose down -v
docker compose up -d --build
```

---

**Это всё!** Проект запущен и работает в Docker 🚀
