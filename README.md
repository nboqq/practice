# Flower Shop - Backend & Frontend Setup Guide

## 🚀 Быстрый старт

### Prerequisites
- Node.js (v14+)
- npm или yarn
- MongoDB (локально или MongoDB Atlas)

## Backend Setup

### 1. Переход в папку backend
```bash
cd backend
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Настройка MongoDB
**Вариант A: MongoDB локально**
- Убедитесь, что MongoDB запущен на `localhost:27017`

**Вариант B: MongoDB Atlas (облако)**
- Перейдите на https://www.mongodb.com/cloud/atlas
- Создайте аккаунт и кластер
- Получите connection string
- Обновите `.env` файл:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flower-shop
JWT_SECRET=your_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### 4. Запуск backend сервера
```bash
npm run dev
```

Сервер запустится на `http://localhost:5000`

## Frontend Setup

### 1. Переход в папку frontend
```bash
cd front
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск dev сервера
```bash
npm run dev
```

Frontend будет доступен на `http://localhost:5173`

## ✅ API Endpoints

### Authentication
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Получить информацию о текущем пользователе

### Cart
- `POST /api/cart/add` - Добавить товар в корзину
- `GET /api/cart` - Получить корзину
- `POST /api/cart/remove` - Удалить товар из корзины
- `POST /api/cart/update-qty` - Обновить количество товара
- `POST /api/cart/clear` - Очистить корзину

### Balance
- `GET /api/balance` - Получить баланс пользователя
- `POST /api/balance/topup` - Пополнить баланс

## 📝 Основной функционал

### ✨ Реализовано:

1. **Регистрация и вход**
   - Кнопка "Регистрация" в хедере
   - Форма регистрации/входа с валидацией
   - JWT токены для аутентификации
   - Сохранение данных в localStorage

2. **Корзина товаров**
   - Добавление товаров при наводке на них
   - Просмотр корзины
   - Изменение количества товаров
   - Удаление товаров
   - Отображение итоговой суммы
   - Синхронизация с backend'ом

3. **Баланс пользователя**
   - Отображение текущего баланса в хедере
   - Кнопка "Пополнить баланс" в корзине
   - Выбор предустановленных сумм (500, 1000, 2000, 5000, 10000 ₽)
   - Ввод кастомной суммы
   - Мгновенное пополнение баланса

4. **Аутентификация**
   - Кнопка выхода из аккаунта
   - Отображение имени пользователя в хедере
   - Требование авторизации для доступа к корзине
   - Автоматическое восстановление сессии при перезагрузке

## 🔐 Security Notes

⚠️ Для production использования:
1. Измените `JWT_SECRET` на сложный ключ
2. Используйте HTTPS
3. Добавьте rate limiting
4. Используйте environment variables из `.env.local`
5. Валидируйте и санитизуйте все входные данные

## 📊 Database Schema

### User Model
```
{
  name: String,
  email: String (unique),
  password: String (hashed),
  balance: Number,
  cart: [{
    productId: Number,
    name: String,
    description: String,
    price: String,
    priceNum: Number,
    image: String,
    qty: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Тестирование

1. **Откройте приложение** в браузере: `http://localhost:5173`
2. **Нажмите на кнопку "Регистрация"** в хедере
3. **Заполните форму** (имя, email, пароль)
4. **Зарегистрируйтесь** - вы будете автоматически залогинены
5. **Добавьте товары в корзину** - наведитесь на товар и нажмите кнопку
6. **Откройте корзину** через иконку в хедере
7. **Пополните баланс** нажав кнопку "Пополнить баланс"
8. **Нажмите кнопку выхода** для логаута

## 🐛 Troubleshooting

**Ошибка: Cannot connect to MongoDB**
- Убедитесь, что MongoDB запущен
- Проверьте MONGODB_URI в `.env`

**Ошибка: CORS error**
- Backend должен быть запущен на `http://localhost:5000`
- Frontend на `http://localhost:5173`

**Ошибка: 401 Unauthorized**
- Убедитесь, что вы залогинены
- Проверьте, что токен сохранён в localStorage
- Перезагрузите страницу

**Ошибка при добавлении в корзину**
- Сначала зарегистрируйтесь и войдите
- Убедитесь, что backend запущен

## 📚 Дополнительно

- Backend использует Express.js
- Frontend использует React + Vite + TypeScript
- Для базы данных используется MongoDB с Mongoose ODM
- Для аутентификации используется JWT
- Пароли хешируются с bcryptjs

Enjoy! 🌸
