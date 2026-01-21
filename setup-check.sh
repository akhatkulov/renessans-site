#!/bin/bash

echo "========================================"
echo "   Renessans Site - Setup Checker"
echo "========================================"
echo ""

error_found=0

# Check .NET SDK
echo "[1/4] Checking .NET SDK..."
if ! command -v dotnet &> /dev/null; then
    echo "❌ ERROR: .NET SDK not found!"
    echo "   Please install .NET 9.0 SDK from https://dotnet.microsoft.com/download"
    error_found=1
else
    dotnet_version=$(dotnet --version)
    echo "✅ .NET SDK found: $dotnet_version"
fi
echo ""

# Check PostgreSQL
echo "[2/4] Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  WARNING: PostgreSQL CLI (psql) not found in PATH"
    echo "   Make sure PostgreSQL is installed and running"
    echo "   Download from: https://www.postgresql.org/download/"
else
    echo "✅ PostgreSQL CLI found"
fi
echo ""

# Check project structure
echo "[3/4] Checking project structure..."
if [ -f "backend/RenessansAPI/RenessansAPI.csproj" ]; then
    echo "✅ Backend project found"
else
    echo "❌ ERROR: Backend project not found!"
    error_found=1
fi

if [ -d "backend/RenessansAPI/wwwroot/images" ]; then
    echo "✅ Images directory exists"
else
    echo "⚠️  WARNING: Images directory not found"
    echo "   Creating directory..."
    mkdir -p "backend/RenessansAPI/wwwroot/images/camps"
    mkdir -p "backend/RenessansAPI/wwwroot/images/events"
    mkdir -p "backend/RenessansAPI/wwwroot/images/news"
    mkdir -p "backend/RenessansAPI/wwwroot/images/overallImages"
    mkdir -p "backend/RenessansAPI/wwwroot/images/possibility"
    echo "✅ Directories created"
fi
echo ""

# Check configuration
echo "[4/4] Checking configuration..."
if grep -q "CHANGE_THIS_PASSWORD" "backend/RenessansAPI/appsettings.json" 2>/dev/null; then
    echo "⚠️  WARNING: Default password detected in appsettings.json"
    echo "   Please update the database connection string!"
fi

if grep -q "CHANGE-THIS-TO-A-SECURE-SECRET-KEY" "backend/RenessansAPI/appsettings.json" 2>/dev/null; then
    echo "⚠️  WARNING: Default JWT key detected in appsettings.json"
    echo "   Please update the JWT secret key!"
fi
echo ""

# Summary
echo "========================================"
if [ $error_found -eq 1 ]; then
    echo "❌ Setup check FAILED"
    echo "   Please fix the errors above before running the project"
    echo "========================================"
    exit 1
else
    echo "✅ Setup check PASSED"
    echo "   You can now run the project using ./start.sh"
    echo "========================================"
fi
echo ""

echo "Next steps:"
echo "1. Update appsettings.json with your database credentials"
echo "2. Update JWT secret key in appsettings.json"
echo "3. Ensure PostgreSQL is running"
echo "4. Run ./start.sh to launch the application"
echo ""
