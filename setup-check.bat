@echo off
chcp 65001 >nul
echo ========================================
echo    Renessans Site - Setup Checker
echo ========================================
echo.

set "error_found=0"

:: Check .NET SDK
echo [1/4] Checking .NET SDK...
dotnet --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: .NET SDK not found!
    echo    Please install .NET 9.0 SDK from https://dotnet.microsoft.com/download
    set "error_found=1"
) else (
    for /f "tokens=*" %%i in ('dotnet --version') do set dotnet_version=%%i
    echo ✅ .NET SDK found: %dotnet_version%
)
echo.

:: Check PostgreSQL
echo [2/4] Checking PostgreSQL...
where psql >nul 2>&1
if errorlevel 1 (
    echo ⚠️  WARNING: PostgreSQL CLI (psql) not found in PATH
    echo    Make sure PostgreSQL is installed and running
    echo    Download from: https://www.postgresql.org/download/
) else (
    echo ✅ PostgreSQL CLI found
)
echo.

:: Check if database exists (optional - requires psql)
echo [3/4] Checking project structure...
if exist "backend\RenessansAPI\RenessansAPI.csproj" (
    echo ✅ Backend project found
) else (
    echo ❌ ERROR: Backend project not found!
    set "error_found=1"
)

if exist "backend\RenessansAPI\wwwroot\images" (
    echo ✅ Images directory exists
) else (
    echo ⚠️  WARNING: Images directory not found
    echo    Creating directory...
    mkdir "backend\RenessansAPI\wwwroot\images\camps" 2>nul
    mkdir "backend\RenessansAPI\wwwroot\images\events" 2>nul
    mkdir "backend\RenessansAPI\wwwroot\images\news" 2>nul
    mkdir "backend\RenessansAPI\wwwroot\images\overallImages" 2>nul
    mkdir "backend\RenessansAPI\wwwroot\images\possibility" 2>nul
    echo ✅ Directories created
)
echo.

:: Check configuration
echo [4/4] Checking configuration...
findstr /C:"CHANGE_THIS_PASSWORD" "backend\RenessansAPI\appsettings.json" >nul 2>&1
if not errorlevel 1 (
    echo ⚠️  WARNING: Default password detected in appsettings.json
    echo    Please update the database connection string!
)

findstr /C:"CHANGE-THIS-TO-A-SECURE-SECRET-KEY" "backend\RenessansAPI\appsettings.json" >nul 2>&1
if not errorlevel 1 (
    echo ⚠️  WARNING: Default JWT key detected in appsettings.json
    echo    Please update the JWT secret key!
)
echo.

:: Summary
echo ========================================
if "%error_found%"=="1" (
    echo ❌ Setup check FAILED
    echo    Please fix the errors above before running the project
    echo ========================================
    pause
    exit /b 1
) else (
    echo ✅ Setup check PASSED
    echo    You can now run the project using start.bat
    echo ========================================
)
echo.

echo Next steps:
echo 1. Update appsettings.json with your database credentials
echo 2. Update JWT secret key in appsettings.json
echo 3. Ensure PostgreSQL is running
echo 4. Run start.bat to launch the application
echo.

pause
