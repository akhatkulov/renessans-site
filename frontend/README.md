# Renessans Site - Frontend

## Статус проекта

🚧 **В разработке**

Frontend часть проекта находится в стадии разработки.

## Планируемый стек технологий

- **Framework**: React / Next.js / Vue.js (TBD)
- **State Management**: Redux / Zustand / Pinia
- **Styling**: Tailwind CSS / Material-UI
- **HTTP Client**: Axios
- **Real-time**: SignalR Client

## Требования

- Node.js 18+ (LTS)
- npm или yarn или pnpm

## Интеграция с Backend API

Backend API доступно по адресу:
- Development: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

### Основные endpoints

```
POST   /api/auth/login              # Вход
POST   /api/auth/register           # Регистрация
POST   /api/auth/refresh            # Обновление токена
GET    /api/user                    # Список пользователей
GET    /api/courseevent             # Курсы и мероприятия
GET    /api/camp                    # Лагеря
GET    /api/tiding                  # Новости
GET    /api/possibility             # Возможности
```

### Аутентификация

API использует JWT токены:

```javascript
// Пример запроса с токеном
const response = await fetch('https://localhost:5001/api/user', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
```

### SignalR Hub

Real-time соединение доступно по адресу:
```
https://localhost:5001/hubs/admin
```

## Структура проекта (планируется)

```
frontend/
├── src/
│   ├── components/       # Переиспользуемые компоненты
│   ├── pages/           # Страницы
│   ├── services/        # API сервисы
│   ├── stores/          # State management
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Утилиты
│   └── types/           # TypeScript types
├── public/              # Статические файлы
└── package.json
```

## Следующие шаги

1. Выбор фреймворка
2. Настройка проекта
3. Разработка компонентов
4. Интеграция с Backend API
5. Аутентификация и роутинг
6. UI/UX дизайн

## Временное решение

Для тестирования API используйте:
- Swagger UI: https://localhost:5001/swagger
- Postman
- REST Client (VS Code)

## Контакты

[Добавьте контакты для связи по поводу Frontend разработки]
