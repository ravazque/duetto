# Script PowerShell para subir el ejecutable de Duetto Windows al release de GitHub
# Uso: .\subir-windows-release.ps1

Write-Host "🚀 Subiendo Duetto para Windows a GitHub Release v1.0.0..." -ForegroundColor Green
Write-Host ""

# Verificar si gh CLI está instalado
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "❌ GitHub CLI (gh) no está instalado" -ForegroundColor Red
    Write-Host "📦 Instalándolo con winget..." -ForegroundColor Yellow

    try {
        winget install --id GitHub.cli --silent
        Write-Host "✅ GitHub CLI instalado correctamente" -ForegroundColor Green
        Write-Host "⚠️  Reinicia PowerShell y ejecuta este script de nuevo" -ForegroundColor Yellow
        exit 0
    } catch {
        Write-Host "❌ Error instalando GitHub CLI" -ForegroundColor Red
        Write-Host "Por favor instálalo manualmente desde: https://cli.github.com/" -ForegroundColor Yellow
        exit 1
    }
}

# Verificar autenticación
Write-Host "🔐 Verificando autenticación en GitHub..." -ForegroundColor Cyan
gh auth status 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "🔐 Necesitas autenticarte en GitHub" -ForegroundColor Yellow
    gh auth login

    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error en la autenticación" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Autenticado correctamente" -ForegroundColor Green
Write-Host ""

# Verificar que existe el ejecutable
$exePath = "release\Duetto Setup 1.0.0.exe"

if (-not (Test-Path $exePath)) {
    Write-Host "❌ No se encuentra el ejecutable en: $exePath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor:" -ForegroundColor Yellow
    Write-Host "1. Asegúrate de estar en la carpeta del proyecto" -ForegroundColor Yellow
    Write-Host "2. Ejecuta: npm run electron:build:win" -ForegroundColor Yellow
    Write-Host "3. Espera a que se genere el ejecutable" -ForegroundColor Yellow
    Write-Host "4. Ejecuta este script de nuevo" -ForegroundColor Yellow
    exit 1
}

# Mostrar información del archivo
$fileSize = (Get-Item $exePath).Length / 1MB
Write-Host "📦 Ejecutable encontrado:" -ForegroundColor Cyan
Write-Host "   Ruta: $exePath" -ForegroundColor White
Write-Host "   Tamaño: $([math]::Round($fileSize, 2)) MB" -ForegroundColor White
Write-Host ""

# Confirmar subida
$confirmation = Read-Host "¿Deseas subir este ejecutable al release v1.0.0? (S/N)"

if ($confirmation -ne 'S' -and $confirmation -ne 's') {
    Write-Host "❌ Operación cancelada" -ForegroundColor Yellow
    exit 0
}

# Subir el ejecutable
Write-Host ""
Write-Host "📤 Subiendo ejecutable a GitHub Release..." -ForegroundColor Cyan
Write-Host "   (Esto puede tardar varios minutos dependiendo de tu conexión)" -ForegroundColor Yellow
Write-Host ""

gh release upload v1.0.0 $exePath --clobber

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Ejecutable subido exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Disponible en:" -ForegroundColor Cyan
    Write-Host "   https://github.com/ravazque/projection-charts/releases/tag/v1.0.0" -ForegroundColor White
    Write-Host ""
    Write-Host "📥 Los usuarios de Windows podrán descargarlo directamente desde el release" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Error al subir el ejecutable" -ForegroundColor Red
    Write-Host "   Verifica tu conexión a internet y vuelve a intentarlo" -ForegroundColor Yellow
    exit 1
}
