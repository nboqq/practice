#!/bin/bash
# Quick setup script for Flower Shop

echo "🌸 Flower Shop - Setup Script"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста установите Node.js."
    exit 1
fi

echo "✅ Node.js установлен: $(node -v)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен."
    exit 1
fi

echo "✅ npm установлен: $(npm -v)"
echo ""

# Setup backend
echo "📦 Настройка Backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "  📥 Установка зависимостей..."
    npm install
else
    echo "  ✅ Зависимости уже установлены"
fi

echo ""
echo "=============================="
echo "✅ Setup завершен!"
echo ""
echo "📝 Дальше нужно:"
echo "1. Убедитесь, что MongoDB запущен:"
echo "   - Локально: mongod"
echo "   - Или используйте MongoDB Atlas"
echo ""
echo "2. Запустите backend (в одном терминале):"
echo "   cd backend && npm run dev"
echo ""
echo "3. Запустите frontend (в другом терминале):"
echo "   cd front && npm run dev"
echo ""
echo "4. Откройте браузер: http://localhost:5173"
echo ""
echo "🎉 Все готово!"
