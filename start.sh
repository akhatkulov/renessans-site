#!/bin/bash

echo "========================================"
echo "   Renessans Site - Launcher"
echo "========================================"
echo ""

cd backend/RenessansAPI

echo "[1/3] Checking .NET SDK..."
if ! command -v dotnet &> /dev/null; then
    echo "ERROR: .NET SDK not found!"
    echo "Please install .NET 9.0 SDK from https://dotnet.microsoft.com/download"
    exit 1
fi
echo ".NET SDK found!"
echo ""

echo "[2/3] Restoring dependencies..."
dotnet restore
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to restore dependencies!"
    exit 1
fi
echo ""

echo "[3/3] Starting the application..."
echo ""
echo "API will be available at:"
echo "- http://localhost:5000"
echo "- https://localhost:5001"
echo "- Swagger UI: https://localhost:5001/swagger"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

dotnet run
