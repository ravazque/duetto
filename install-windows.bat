@echo off
REM ========================================
REM  Duetto - Script de Instalacion para Windows
REM  Este script instala automaticamente todas las dependencias
REM ========================================

echo.
echo ========================================
echo    Duetto - Instalador para Windows
echo ========================================
echo.

REM Verificar si Node.js esta instalado
echo [1/4] Verificando instalacion de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js no esta instalado!
    echo.
    echo Por favor, instala Node.js antes de continuar:
    echo 1. Ve a https://nodejs.org/
    echo 2. Descarga la version LTS
    echo 3. Ejecuta el instalador
    echo 4. Reinicia tu computadora
    echo 5. Vuelve a ejecutar este script
    echo.
    pause
    exit /b 1
)

REM Mostrar version de Node.js
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% instalado
echo.

REM Verificar si npm esta instalado
echo [2/4] Verificando instalacion de npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no esta instalado!
    echo npm deberia venir con Node.js. Reinstala Node.js.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% instalado
echo.

REM Limpiar instalaciones previas si existen
if exist node_modules (
    echo [AVISO] Se encontro una carpeta node_modules existente
    set /p CLEAN="Deseas limpiar e instalar desde cero? (S/N): "
    if /i "%CLEAN%"=="S" (
        echo Limpiando instalacion previa...
        rmdir /s /q node_modules 2>nul
        del package-lock.json 2>nul
        echo [OK] Limpieza completada
        echo.
    )
)

REM Instalar dependencias
echo [3/4] Instalando dependencias del proyecto...
echo Esto puede tardar varios minutos...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] La instalacion de dependencias fallo!
    echo.
    echo Intenta lo siguiente:
    echo 1. npm cache clean --force
    echo 2. Ejecuta este script nuevamente
    echo 3. Verifica tu conexion a internet
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Dependencias instaladas correctamente!
echo.

REM Verificacion final
echo [4/4] Verificando instalacion...
npm list --depth=0 >nul 2>&1

if %errorlevel% neq 0 (
    echo [AVISO] Algunas dependencias pueden tener advertencias
    echo La aplicacion deberia funcionar de todas formas
) else (
    echo [OK] Todas las dependencias verificadas
)

echo.
echo ========================================
echo   Instalacion completada exitosamente!
echo ========================================
echo.
echo Ahora puedes ejecutar Duetto con:
echo   npm run electron
echo.
echo O construir un ejecutable con:
echo   npm run electron:build:win
echo.
echo Para mas informacion, consulta INSTALL_WINDOWS.md
echo.

REM Preguntar si desea ejecutar la aplicacion
set /p RUN="Deseas ejecutar Duetto ahora? (S/N): "
if /i "%RUN%"=="S" (
    echo.
    echo Iniciando Duetto en modo desarrollo...
    echo.
    npm run electron
)

echo.
echo Gracias por usar Duetto!
pause
