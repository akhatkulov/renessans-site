# ⚡ Быстрое тестирование API

## Публичные endpoints (БЕЗ токена)

Эти endpoints доступны сразу без аутентификации:

```bash
# Новости
curl http://localhost:5000/api/tiding/public

# Курсы и мероприятия
curl http://localhost:5000/api/courseevent/public

# Лагеря
curl http://localhost:5000/api/camp/public

# Возможности
curl http://localhost:5000/api/possibility/public

# Изображения
curl http://localhost:5000/api/image/public
```

---

## С параметрами

```bash
# На английском языке
curl "http://localhost:5000/api/tiding/public?lang=English&pageIndex=1&pageSize=10"

# На русском языке
curl "http://localhost:5000/api/camp/public?lang=Russian"

# На узбекском (по умолчанию)
curl "http://localhost:5000/api/courseevent/public?lang=Uzbek"
```

---

## Админ endpoints (С токеном)

### 1. Получите токен:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@renessans.uz",
    "password": "your-password"
  }'
```

### 2. Используйте токен:

```bash
# Сохраните токен
TOKEN="ваш_токен_здесь"

# Список пользователей
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:5000/api/user

# Список ролей
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:5000/api/role

# Админ новости (все языки)
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:5000/api/tiding/admin
```

---

## В Swagger UI

1. Откройте: http://localhost:5000/swagger

2. **Публичные endpoints:**
   - Работают сразу без токена
   - Секции с "public" в URL

3. **Админ endpoints:**
   - Нажмите "Authorize" вверху
   - Введите: `Bearer YOUR_TOKEN`
   - Теперь работают все защищенные endpoints

---

## Первый администратор

При первом запуске создается администратор автоматически (через seeding).

Проверьте файл `backend/RenessansAPI.Service/Seeders/DbSeeder.cs` для учетных данных по умолчанию.

Обычно:
- Email: `admin@renessans.uz` (проверьте в коде)
- Password: (указан в seeder)

---

**Полная документация:** API_AUTHENTICATION.md
