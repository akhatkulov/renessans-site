# Renessans API - Backend

## Архитектура проекта

Проект построен на основе Clean Architecture:

```
backend/
├── RenessansAPI/              # Презентационный слой (API)
│   ├── Controllers/           # API контроллеры
│   ├── Middlewares/           # Middleware компоненты
│   ├── Extensions/            # Extension методы
│   └── wwwroot/images/        # Статические файлы
│
├── RenessansAPI.Domain/       # Domain слой
│   ├── Entities/              # Доменные сущности
│   ├── Enums/                 # Перечисления
│   └── Common/                # Общие интерфейсы
│
├── RenessansAPI.DataAccess/   # Data Access слой
│   ├── AppDBContexts/         # DbContext
│   ├── Repository/            # Репозитории
│   └── Migrations/            # EF Migrations
│
└── RenessansAPI.Service/      # Service слой (Business Logic)
    ├── Service/               # Сервисы
    ├── IService/              # Интерфейсы сервисов
    ├── DTOs/                  # Data Transfer Objects
    ├── Helpers/               # Вспомогательные классы
    ├── Security/              # Безопасность
    └── Seeders/               # Начальные данные
```

## Быстрый старт

### 1. Установка зависимостей

```bash
cd backend
dotnet restore
```

### 2. Настройка подключения к БД

Отредактируйте `RenessansAPI/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "host=localhost; port=5432; username=YOUR_USER; password=YOUR_PASSWORD; Database=renessans;"
  }
}
```

### 3. Применение миграций

```bash
cd RenessansAPI
dotnet ef database update
```

Или миграции применятся автоматически при первом запуске.

### 4. Запуск

```bash
cd RenessansAPI
dotnet run
```

API будет доступно по адресу:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001
- Swagger: https://localhost:5001/swagger

## Основные компоненты

### Controllers (API Endpoints)

- **AuthController** - Аутентификация (login, register, refresh token)
- **UserController** - Управление пользователями
- **RoleController** - Управление ролями
- **PermissionController** - Управление разрешениями
- **CourseEventController** - Курсы и мероприятия
- **CampController** - Лагеря
- **TidingController** - Новости
- **PossibilityController** - Возможности
- **ImageController** - Загрузка изображений

### Middlewares

- **ExceptionHandlerMiddleware** - Глобальная обработка ошибок
- **TokenValidationMiddleware** - Валидация JWT токенов
- **LanguageMiddleware** - Мультиязычность

### Database

Используется PostgreSQL с Entity Framework Core:
- **AppDbContext** - Главный контекст БД
- **Миграции** - Автоматически применяются при запуске
- **Seeding** - Начальные данные создаются автоматически

### Функциональность

#### Аутентификация
- JWT токены (Access + Refresh)
- Роли и разрешения
- Middleware для валидации токенов

#### Изображения
- Загрузка и хранение в `wwwroot/images/`
- Категории: camps, events, news, overallImages, possibility
- Уникальные имена файлов (GUID)

#### SignalR
- Real-time уведомления
- Hub: `/hubs/admin`

## Разработка

### Создание новой миграции

```bash
cd backend
dotnet ef migrations add MigrationName --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Откат миграции

```bash
dotnet ef database update PreviousMigrationName --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Удаление последней миграции

```bash
dotnet ef migrations remove --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Создание контроллера

1. Создайте интерфейс в `RenessansAPI.Service/IService/`
2. Реализуйте сервис в `RenessansAPI.Service/Service/`
3. Зарегистрируйте сервис в `Extensions/ServiceExtension.cs`
4. Создайте контроллер в `RenessansAPI/Controllers/`

## Конфигурация

### appsettings.json

Основные секции:
- **ConnectionStrings** - Подключение к БД
- **JWT** - Настройки JWT токенов
- **Email** - SMTP настройки
- **Pagination** - Пагинация по умолчанию

### User Secrets (рекомендуется)

Для безопасного хранения секретов в разработке:

```bash
cd RenessansAPI
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "your-connection-string"
dotnet user-secrets set "JWT:Key" "your-secret-key"
```

## Тестирование API

### Через Swagger UI

1. Запустите проект
2. Откройте https://localhost:5001/swagger
3. Тестируйте endpoints через UI

### Через RenessansAPI.http

В проекте есть файл `RenessansAPI.http` для тестирования через VS Code REST Client или Visual Studio.

### Аутентификация в Swagger

1. Получите токен через `/api/auth/login`
2. Нажмите "Authorize" в Swagger UI
3. Введите: `Bearer YOUR_TOKEN`

## Deployment

### Build для production

```bash
cd RenessansAPI
dotnet publish -c Release -o ./publish
```

### Переменные окружения

Можно использовать вместо appsettings.json:

```bash
export ConnectionStrings__DefaultConnection="host=...;port=5432;..."
export JWT__Key="your-secret-key"
export ASPNETCORE_ENVIRONMENT="Production"
```

### Docker (TODO)

Dockerfile будет добавлен в будущем.

## Безопасность

⚠️ Перед production:

1. ✅ Смените JWT ключ на безопасный (минимум 32 символа)
2. ✅ Используйте HTTPS в production
3. ✅ Настройте CORS политику
4. ✅ Не храните секреты в git
5. ✅ Используйте User Secrets или Environment Variables
6. ✅ Обновите пароли БД

## Troubleshooting

### Ошибка подключения к БД

```
Npgsql.NpgsqlException: Connection refused
```

Проверьте:
1. PostgreSQL запущен
2. Порт правильный (5432)
3. Логин/пароль верные
4. База данных создана

### Port already in use

Измените порты в `Properties/launchSettings.json`:

```json
"applicationUrl": "https://localhost:5002;http://localhost:5003"
```

### Migration errors

Пересоздайте БД:

```bash
dotnet ef database drop --force
dotnet ef database update
```

## Полезные команды

```bash
# Проверить версию .NET
dotnet --version

# Очистить кеш
dotnet clean

# Пересобрать проект
dotnet build

# Запустить с watch (автоперезагрузка)
dotnet watch run

# Проверить установленные пакеты
dotnet list package

# Обновить пакеты
dotnet restore
```

## Структура БД

Основные таблицы:
- **Users** - Пользователи
- **Roles** - Роли
- **Permissions** - Разрешения
- **RolePermissions** - Связь ролей и разрешений
- **CourseEvents** - Курсы и мероприятия
- **Camps** - Лагеря
- **Tidings** - Новости
- **Possibilities** - Возможности

## Лицензия

[Укажите лицензию]
