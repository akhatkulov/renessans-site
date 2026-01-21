# 🔐 API Аутентификация и Endpoints

## Типы Endpoints

API имеет два типа endpoints:

### 1. 🌍 Публичные (Public) - Без аутентификации
Доступны без токена, используются клиентской частью сайта.

### 2. 🔒 Защищенные (Admin) - Требуют JWT токен
Доступны только с Bearer токеном, используются админ-панелью.

---

## 🌍 Публичные Endpoints (без токена)

### Новости (Tidings)
```bash
GET /api/tiding/public              # Список новостей
GET /api/tiding/public/{id}         # Одна новость
```

### Курсы и мероприятия (Course Events)
```bash
GET /api/courseevent/public         # Список курсов
GET /api/courseevent/public/{id}    # Один курс
```

### Лагеря (Camps)
```bash
GET /api/camp/public                # Список лагерей
GET /api/camp/public/{id}           # Один лагерь
```

### Возможности (Possibilities)
```bash
GET /api/possibility/public         # Список возможностей
GET /api/possibility/public/{id}    # Одна возможность
```

### Изображения (Images)
```bash
GET /api/image/public               # Список изображений
GET /api/image/public/{id}          # Одно изображение
```

### Примеры запросов:

```bash
# Получить новости на английском
curl http://localhost:5000/api/tiding/public?lang=English&pageIndex=1&pageSize=10

# Получить лагеря на узбекском
curl http://localhost:5000/api/camp/public?lang=Uzbek

# Получить курсы на русском
curl http://localhost:5000/api/courseevent/public?lang=Russian
```

### Поддерживаемые языки:
- `Uzbek` (по умолчанию)
- `English`
- `Russian`

---

## 🔒 Защищенные Endpoints (с токеном)

Требуют JWT Bearer токен в заголовке:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Аутентификация

#### 1. Регистрация (если разрешена)
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### 2. Вход (Login)
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@renessans.uz",
  "password": "your-password"
}
```

**Ответ:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "expiresIn": 7200
}
```

#### 3. Обновление токена
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your_refresh_token"
}
```

---

## 🔑 Использование токена

### В curl:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:5000/api/user
```

### В Swagger UI:

1. Получите токен через `/api/auth/login`
2. Нажмите кнопку **"Authorize"** вверху страницы
3. Введите: `Bearer YOUR_TOKEN`
4. Нажмите **"Authorize"**
5. Теперь можно тестировать защищенные endpoints

### В JavaScript/TypeScript:
```javascript
const token = localStorage.getItem('accessToken');

fetch('http://localhost:5000/api/user', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### В Postman:
1. Auth Type → Bearer Token
2. Вставьте токен в поле Token

---

## 🔒 Admin Endpoints

### Пользователи (Users)
```bash
GET    /api/user                # Список пользователей
GET    /api/user/{id}           # Один пользователь
POST   /api/user                # Создать пользователя
PUT    /api/user/{id}           # Обновить пользователя
DELETE /api/user/{id}           # Удалить пользователя
```

### Роли (Roles)
```bash
GET    /api/role                # Список ролей
GET    /api/role/{id}           # Одна роль
POST   /api/role                # Создать роль
PUT    /api/role/{id}           # Обновить роль
DELETE /api/role/{id}           # Удалить роль
```

### Разрешения (Permissions)
```bash
GET    /api/permission          # Список разрешений
POST   /api/permission          # Создать разрешение
DELETE /api/permission/{id}     # Удалить разрешение
```

### Новости (Admin)
```bash
GET    /api/tiding/admin        # Список новостей (все языки)
GET    /api/tiding/admin/{id}   # Одна новость (все языки)
POST   /api/tiding              # Создать новость
PUT    /api/tiding/{id}         # Обновить новость
DELETE /api/tiding/{id}         # Удалить новость
```

### Курсы (Admin)
```bash
GET    /api/courseevent/admin   # Список курсов
POST   /api/courseevent          # Создать курс
PUT    /api/courseevent/{id}     # Обновить курс
DELETE /api/courseevent/{id}     # Удалить курс
```

### Лагеря (Admin)
```bash
GET    /api/camp/admin           # Список лагерей
POST   /api/camp                 # Создать лагерь
PUT    /api/camp/{id}            # Обновить лагерь
DELETE /api/camp/{id}            # Удалить лагерь
```

### Изображения (Admin)
```bash
GET    /api/image/admin          # Список изображений
POST   /api/image                # Загрузить изображение
DELETE /api/image/{id}           # Удалить изображение
```

---

## 🔐 Роли и разрешения

### Встроенные роли:
- **SuperAdmin** - Полный доступ ко всему
- **Admin** - Администратор
- **User** - Обычный пользователь

### Проверка ролей:
```csharp
[Authorize(Roles = "Admin,SuperAdmin")]
```

---

## 🛡️ Безопасность

### JWT Настройки (appsettings.json):
```json
{
  "JWT": {
    "Key": "your-secret-key-minimum-32-characters",
    "ValidIssuer": "RenessansAPI",
    "Expire": "2",        // Access token - 2 часа
    "ResExpire": "30",    // Refresh token - 30 дней
    "Audience": "Renessans.uz"
  }
}
```

### Рекомендации:
1. ✅ Храните токены в localStorage или sessionStorage
2. ✅ Обновляйте токены через refresh endpoint
3. ✅ Удаляйте токены при logout
4. ✅ Используйте HTTPS в production
5. ❌ Не храните токены в cookie без secure флага
6. ❌ Не отправляйте токены в URL параметрах

---

## 📝 Примеры использования

### Пример 1: Получение публичных новостей (без токена)

```bash
curl http://localhost:5000/api/tiding/public?pageIndex=1&pageSize=10&lang=English
```

### Пример 2: Вход и получение токена

```bash
# Вход
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@renessans.uz",
    "password": "your-password"
  }'

# Ответ:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "refresh...",
  "expiresIn": 7200
}
```

### Пример 3: Использование токена для admin endpoints

```bash
# Сохраните токен
TOKEN="eyJhbGc..."

# Получить список пользователей
curl -H "Authorization: Bearer $TOKEN" \
     http://localhost:5000/api/user

# Создать новость
curl -X POST http://localhost:5000/api/tiding \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titleUz": "Yangilik",
    "titleEn": "News",
    "titleRu": "Новость",
    "descriptionUz": "Matn...",
    "descriptionEn": "Text...",
    "descriptionRu": "Текст..."
  }'
```

### Пример 4: Обновление токена

```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token"
  }'
```

---

## 🧪 Тестирование в Swagger

1. Откройте: `http://localhost:5000/swagger`

2. **Для публичных endpoints:**
   - Просто нажмите "Try it out"
   - Выполните запрос

3. **Для защищенных endpoints:**
   - Выполните login через `/api/auth/login`
   - Скопируйте accessToken из ответа
   - Нажмите кнопку **"Authorize"** вверху
   - Введите: `Bearer YOUR_TOKEN`
   - Нажмите "Authorize"
   - Теперь можно тестировать admin endpoints

---

## ❌ Частые ошибки

### 401 Unauthorized: Bearer token required
**Причина:** Endpoint требует токен, но он не передан.

**Решение:**
- Получите токен через `/api/auth/login`
- Добавьте заголовок: `Authorization: Bearer YOUR_TOKEN`

### 403 Forbidden
**Причина:** Токен валидный, но у пользователя нет прав.

**Решение:**
- Проверьте роль пользователя
- Endpoint доступен только для Admin/SuperAdmin

### 401 Token expired
**Причина:** Токен истек (через 2 часа).

**Решение:**
- Обновите токен через `/api/auth/refresh`
- Или выполните повторный login

---

## 🔍 Health Check Endpoints

Для проверки работы API без аутентификации:

```bash
# Health check (публичный)
curl http://localhost:5000/api/tiding/public

# Должен вернуть список новостей (пустой или с данными)
```

Используется в Docker health checks.

---

## 📚 Дополнительная информация

- **Swagger UI**: `/swagger` - Интерактивная документация
- **Health Check**: `/api/tiding/public` - Проверка работы без токена
- **SignalR Hub**: `/hubs/admin` - Real-time уведомления (требует токен)

---

**Документация готова!** Используйте публичные endpoints для проверки работы и админ endpoints для управления контентом.
