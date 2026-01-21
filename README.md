# Renessans Site - Проект на ASP.NET Core 9.0

## 📋 Описание проекта

Full-stack веб-приложение для Renessans с:
- **Backend**: ASP.NET Core 9.0 Web API
- **База данных**: PostgreSQL
- **Архитектура**: Clean Architecture (Domain, DataAccess, Service, API слои)
- **Аутентификация**: JWT
- **Real-time**: SignalR
- **ORM**: Entity Framework Core

## 🔧 Требования

- .NET 9.0 SDK ([скачать](https://dotnet.microsoft.com/download/dotnet/9.0))
- PostgreSQL 12+ ([скачать](https://www.postgresql.org/download/))
- Visual Studio 2022 / Rider / VS Code (опционально)

## 🚀 Быстрый старт

### Вариант A: Docker (рекомендуется для быстрого запуска)

```bash
# 1. Установите Docker Desktop
# 2. Создайте .env файл и настройте пароли
cp env.docker.example .env

# 3. Запустите
docker-start.bat          # Windows
./docker-start.sh         # Linux/macOS

# Готово! Откройте: http://localhost:5000/swagger
```

📖 Подробнее: [DOCKER_QUICKSTART.md](DOCKER_QUICKSTART.md) или [DOCKER.md](DOCKER.md)

### Вариант B: Локальная установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd renessans-site
```

### 2. Настройка базы данных PostgreSQL

#### Создание базы данных:

```sql
CREATE DATABASE renessans;
```

#### Создание пользователя (если нужно):

```sql
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE renessans TO your_username;
```

### 3. Настройка конфигурации

Отредактируйте файл `backend/RenessansAPI/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "host=localhost; port=5432; username=ВАШ_ПОЛЬЗОВАТЕЛЬ; password=ВАШ_ПАРОЛЬ; Database=renessans;"
  },
  "JWT": {
    "Key": "измените-этот-ключ-на-свой-секретный-ключ-минимум-32-символа",
    "ValidIssuer": "RenessansAPI",
    "Expire": "2",
    "ResExpire": "30",
    "Audience": "Renessans.uz"
  }
}
```

### 4. Установка зависимостей

```bash
cd backend
dotnet restore
```

### 5. Применение миграций

Миграции применяются автоматически при запуске приложения. Если хотите применить вручную:

```bash
cd backend/RenessansAPI
dotnet ef database update
```

### 6. Запуск проекта

#### Вариант А: Через командную строку

```bash
cd backend/RenessansAPI
dotnet run
```

#### Вариант Б: Через Visual Studio

1. Откройте `backend/Renessans.sln`
2. Установите `RenessansAPI` как startup project
3. Нажмите F5 или кнопку "Start"

#### Вариант В: Используя скрипт (Windows)

```bash
.\start.bat
```

### 7. Проверка работы

После запуска:
- API: `https://localhost:5001` или `http://localhost:5000`
- Swagger UI: `https://localhost:5001/swagger`
- SignalR Hub: `https://localhost:5001/hubs/admin`

## 📁 Структура проекта

```
renessans-site/
├── backend/
│   ├── RenessansAPI/              # API слой (Controllers, Middlewares)
│   │   ├── Controllers/           # REST API контроллеры
│   │   ├── Middlewares/          # Middleware компоненты
│   │   ├── wwwroot/images/       # Статические изображения
│   │   └── appsettings.json      # Конфигурация
│   ├── RenessansAPI.Domain/       # Domain слой (Entities, Enums)
│   ├── RenessansAPI.DataAccess/   # Data Access слой (DbContext, Repos)
│   └── RenessansAPI.Service/      # Service слой (Business Logic)
├── frontend/                      # Frontend (TODO)
└── README.md                      # Этот файл
```

## 🔑 Основные функции

- **Аутентификация и авторизация** (JWT)
- **Управление пользователями** с ролями и разрешениями
- **Управление курсами и мероприятиями**
- **Управление лагерями**
- **Новости и объявления**
- **Управление изображениями**
- **Real-time уведомления** (SignalR)

## 📚 API Endpoints

После запуска проекта доступна документация Swagger:
`https://localhost:5001/swagger`

Основные эндпоинты:
- `/api/auth` - Аутентификация
- `/api/user` - Пользователи
- `/api/role` - Роли
- `/api/permission` - Разрешения
- `/api/courseevent` - События курсов
- `/api/camp` - Лагеря
- `/api/tiding` - Новости
- `/api/possibility` - Возможности
- `/api/image` - Изображения

## 🔐 Первоначальные данные (Seeding)

При первом запуске автоматически создаются:
- Роли по умолчанию
- Разрешения
- Администратор (проверьте `RenessansAPI.Service/Seeders/DbSeeder.cs`)

## 🐛 Решение проблем

### Ошибка подключения к базе данных

```
Npgsql.NpgsqlException: Connection refused
```

**Решение**:
1. Убедитесь, что PostgreSQL запущен
2. Проверьте настройки подключения в `appsettings.json`
3. Проверьте права доступа пользователя БД

### Ошибка миграций

```
Unable to create migration
```

**Решение**:
```bash
cd backend
dotnet ef migrations add InitialCreate --project RenessansAPI.DataAccess --startup-project RenessansAPI
dotnet ef database update --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Порт уже занят

```
Failed to bind to address https://127.0.0.1:5001
```

**Решение**: Измените порт в `backend/RenessansAPI/Properties/launchSettings.json`

## 🛠️ Разработка

### Добавление новой миграции

```bash
cd backend
dotnet ef migrations add <MigrationName> --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Откат миграции

```bash
dotnet ef database update <PreviousMigrationName> --project RenessansAPI.DataAccess --startup-project RenessansAPI
```

### Создание production build

```bash
cd backend/RenessansAPI
dotnet publish -c Release -o ./publish
```

## 📝 Переменные окружения

Можно использовать переменные окружения вместо appsettings.json:

```bash
set ConnectionStrings__DefaultConnection=host=localhost;port=5432;...
set JWT__Key=your-secret-key
```

## 🔒 Безопасность

⚠️ **ВАЖНО**: Перед деплоем на production:

1. Измените JWT ключ на безопасный (минимум 32 символа)
2. Используйте HTTPS
3. Настройте CORS политику
4. Используйте безопасные пароли для БД
5. Не храните секреты в git (используйте user secrets или env variables)

### Использование User Secrets (рекомендуется для разработки)

```bash
cd backend/RenessansAPI
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "host=localhost;..."
dotnet user-secrets set "JWT:Key" "your-secret-key"
```

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в консоли
2. Проверьте Swagger UI для тестирования API
3. Убедитесь, что все зависимости установлены
4. Проверьте версию .NET SDK: `dotnet --version`

## 📄 Лицензия

[Укажите лицензию проекта]

## 👥 Авторы

[Укажите авторов проекта]
