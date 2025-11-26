# 📦 Instalar Node.js en Windows

Node.js no está instalado en tu PC. Necesitas instalarlo antes de poder compilar el ejecutable.

## 🚀 Opción 1: Instalación Rápida con winget (Windows 10/11)

Abre **PowerShell como Administrador** y ejecuta:

```powershell
winget install OpenJS.NodeJS.LTS
```

Después de la instalación:
1. **Cierra PowerShell completamente**
2. Abre una **nueva PowerShell** (normal, no como administrador)
3. Verifica la instalación:
```powershell
node --version
npm --version
```

Deberías ver algo como:
```
v20.x.x
10.x.x
```

## 🌐 Opción 2: Instalación Manual (Recomendada si winget falla)

### Paso 1: Descargar Node.js

1. Ve a: https://nodejs.org/
2. Descarga la versión **LTS (Long Term Support)** - botón verde grande
3. El archivo se llamará algo como: `node-v20.x.x-x64.msi`

### Paso 2: Instalar Node.js

1. Ejecuta el archivo `.msi` que descargaste
2. Click en **Next** en todas las pantallas
3. **Acepta** la licencia
4. **Mantén** todas las opciones por defecto
5. **IMPORTANTE**: Asegúrate de que la opción **"Add to PATH"** esté marcada ✅
6. Click en **Install**
7. Espera a que termine (1-2 minutos)
8. Click en **Finish**

### Paso 3: Verificar la Instalación

1. **Cierra PowerShell completamente si la tenías abierta**
2. Abre una **nueva PowerShell** (normal)
3. Ejecuta:

```powershell
node --version
npm --version
```

Si ves las versiones (ej: `v20.x.x` y `10.x.x`), **¡está instalado correctamente!** ✅

## ❌ Si sigue sin funcionar

Si después de instalar y cerrar/abrir PowerShell sigues viendo el error "npm no reconocible":

### Verificar PATH manualmente

```powershell
$env:PATH -split ';' | Select-String nodejs
```

Si no aparece nada:

1. Abre **Panel de Control** → **Sistema** → **Configuración avanzada del sistema**
2. Click en **Variables de entorno**
3. En **Variables del sistema**, busca `Path`
4. Click en **Editar**
5. Click en **Nuevo** y añade: `C:\Program Files\nodejs\`
6. Click en **Aceptar** en todas las ventanas
7. **Cierra y abre PowerShell de nuevo**

## ✅ Siguiente Paso

Una vez que Node.js esté instalado y `npm --version` funcione, continúa con:

```powershell
# Clonar el repositorio (si no lo has hecho)
cd C:\Users\TuUsuario\Desktop
git clone https://github.com/ravazque/projection-charts.git
cd projection-charts

# Instalar dependencias
npm install

# Compilar ejecutable
npm run electron:build:win
```

## 🆘 Necesitas Ayuda

Si tienes problemas, avísame y te ayudo paso a paso.
