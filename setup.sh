#!/bin/bash

# Fukuoka 2025 Website Setup Script
# This script helps you set up and deploy the website

echo "🌸 福岡之旅 2025 - Website Setup 🌸"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the website directory"
    echo "   cd website && ./setup.sh"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed"
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Ask if user wants to start dev server
echo "🚀 Would you like to start the development server? (y/n)"
read -r response

if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
    echo ""
    echo "Starting development server..."
    echo "Open http://localhost:3000 in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm run dev' to start development server"
    echo "2. Run 'npm run build' to create production build"
    echo "3. Check README.md for deployment instructions"
    echo ""
    echo "📖 See DEPLOY.md for Vercel deployment guide"
    echo ""
    echo "🎉 Enjoy planning your Fukuoka trip!"
fi

