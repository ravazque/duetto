# Manual de Instalación - Duetto para Windows

Este manual proporciona instrucciones detalladas para instalar y ejecutar Duetto en sistemas Windows.

## Tabla de Contenidos

1. [Opción 1: Instalación Rápida con Script Automatizado](#opción-1-instalación-rápida-con-script-automatizado)
2. [Opción 2: Instalación Manual Paso a Paso](#opción-2-instalación-manual-paso-a-paso)
3. [Opción 3: Usar Ejecutable Pre-compilado](#opción-3-usar-ejecutable-pre-compilado)
4. [Ejecutar la Aplicación](#ejecutar-la-aplicación)
5. [Solución de Problemas](#solución-de-problemas)

---

## Opción 1: Instalación Rápida con Script Automatizado

Esta es la forma más rápida de instalar Duetto en Windows.

### Pasos:

1. **Descargar o clonar el repositorio**
   - Si tienes Git instalado:
     ```powershell
     git clone <url-del-repositorio>
     cd duetto
     ```
   - Si no tienes Git, descarga el ZIP del repositorio y descomprímelo

2. **Ejecutar el script de instalación**
   - Haz doble clic en el archivo `install-windows.bat`
   - O desde PowerShell/CMD:
     ```powershell
     .\install-windows.bat
     ```

3. El script automáticamente:
   - Verificará si Node.js está instalado
   - Instalará todas las dependencias necesarias
   - Te preguntará si quieres ejecutar la aplicación

---

## Opción 2: Instalación Manual Paso a Paso

Si prefieres instalar manualmente o el script automatizado no funciona.

### Paso 1: Instalar Node.js y npm

1. **Descargar Node.js**
   - Ve a [https://nodejs.org/](https://nodejs.org/)
   - Descarga la versión LTS (Long Term Support) recomendada
   - La versión debe ser 18.x o superior

2. **Instalar Node.js**
   - Ejecuta el instalador descargado (archivo .msi)
   - Durante la instalación:
     - ✅ Acepta los términos de licencia
     - ✅ Mantén la ruta de instalación por defecto
     - ✅ **IMPORTANTE**: Asegúrate de marcar la opción "Add to PATH"
     - ✅ Acepta instalar las herramientas necesarias (chocolatey, etc.)
   - Haz clic en "Install" y espera a que termine
   - Reinicia tu computadora (importante para que los cambios en PATH tengan efecto)

3. **Verificar la instalación**
   - Abre una nueva ventana de PowerShell o Command Prompt (CMD)
   - Ejecuta los siguientes comandos:
     ```powershell
     node --version
     ```
     Debería mostrar algo como `v18.17.0` o superior

     ```powershell
     npm --version
     ```
     Debería mostrar algo como `9.6.7` o superior

   - Si ves los números de versión, ¡la instalación fue exitosa! ✅
   - Si aparece un error como "no se reconoce como comando", reinicia tu computadora y vuelve a intentar

### Paso 2: Obtener el Código de Duetto

**Opción A: Con Git (recomendado)**
```powershell
git clone <url-del-repositorio>
cd duetto
```

**Opción B: Sin Git**
1. Descarga el código como ZIP desde el repositorio
2. Descomprime el archivo ZIP en una ubicación de tu elección
3. Abre PowerShell o CMD
4. Navega a la carpeta descomprimida:
   ```powershell
   cd ruta\a\duetto
   ```

### Paso 3: Instalar Dependencias del Proyecto

1. Asegúrate de estar en la carpeta del proyecto (duetto)
2. Ejecuta el siguiente comando:
   ```powershell
   npm install
   ```

3. Este proceso puede tardar varios minutos
4. Verás una barra de progreso mientras se descargan e instalan las dependencias
5. Si todo va bien, deberías ver un mensaje indicando el número de paquetes instalados

**Posibles mensajes de advertencia:**
- Es normal ver algunos mensajes "WARN" en amarillo
- Puedes ignorar advertencias sobre versiones o dependencias opcionales
- Solo preocúpate si ves errores en rojo

### Paso 4: Verificar la Instalación

Para verificar que todo está correctamente instalado:

```powershell
npm list --depth=0
```

Deberías ver una lista de las dependencias instaladas sin errores críticos.

---

## Opción 3: Usar Ejecutable Pre-compilado

Si existe un ejecutable pre-compilado disponible (archivo .exe), es la forma más simple:

1. **Descargar el instalador**
   - Busca en la carpeta `release/` del repositorio
   - O descarga desde la sección de "Releases" en GitHub
   - Busca un archivo llamado `Duetto Setup X.X.X.exe`

2. **Instalar**
   - Haz doble clic en el instalador
   - Sigue las instrucciones en pantalla
   - El instalador creará un acceso directo en el escritorio y el menú inicio

3. **Ejecutar**
   - Usa el acceso directo creado en el escritorio
   - O búscalo en el menú inicio

**Nota:** Si no hay ejecutable pre-compilado disponible, usa la Opción 1 o 2.

---

## Ejecutar la Aplicación

Una vez instalado, puedes ejecutar Duetto de las siguientes formas:

### Modo Desarrollo (recomendado para pruebas)

Este modo permite ver cambios en tiempo real y es útil para desarrollo:

```powershell
npm run electron
```

Esto:
1. Iniciará el servidor de desarrollo de Vite
2. Abrirá automáticamente la aplicación Electron
3. Permitirá recargar cambios en caliente

**Primera ejecución:**
- La primera vez puede tardar un poco más
- Se abrirá una ventana de la aplicación Duetto
- Verás la interfaz de las cartas proyectivas

### Solo Frontend (navegador web)

Si solo quieres probar la interfaz en el navegador:

```powershell
npm run dev
```

Luego abre tu navegador en: `http://localhost:3000`

### Construir Ejecutable

Para crear un instalador ejecutable de Windows:

```powershell
npm run electron:build:win
```

El instalador se generará en la carpeta `release/` y se llamará algo como:
- `Duetto Setup 1.3.1.exe`

---

## Solución de Problemas

### Error: "node no se reconoce como un comando interno o externo"

**Causa:** Node.js no está en el PATH del sistema o no se ha reiniciado la terminal.

**Soluciones:**
1. Cierra todas las ventanas de PowerShell/CMD
2. Abre una nueva ventana de PowerShell/CMD
3. Si persiste, reinicia tu computadora
4. Verifica la instalación de Node.js en "Panel de Control > Programas"
5. Si aún no funciona, reinstala Node.js asegurándote de marcar "Add to PATH"

### Error: "npm install" falla o se queda atascado

**Soluciones:**

1. **Limpiar caché de npm:**
   ```powershell
   npm cache clean --force
   ```

2. **Eliminar instalaciones anteriores:**
   ```powershell
   # Eliminar node_modules y package-lock.json
   rmdir /s /q node_modules
   del package-lock.json
   npm install
   ```

3. **Verificar conexión a internet:**
   - Asegúrate de estar conectado a internet
   - Si estás detrás de un proxy corporativo, puede que necesites configurarlo

4. **Usar otro registro de npm (si estás en China u otro país con restricciones):**
   ```powershell
   npm config set registry https://registry.npmjs.org/
   ```

### Error: "Cannot find module" al ejecutar la aplicación

**Soluciones:**

1. Asegúrate de haber ejecutado `npm install` primero
2. Verifica que estás en la carpeta correcta del proyecto
3. Elimina `node_modules` y reinstala:
   ```powershell
   rmdir /s /q node_modules
   npm install
   ```

### Error: "Puerto 3000 ya está en uso"

**Causa:** Otra aplicación está usando el puerto 3000.

**Soluciones:**

1. **Cerrar la aplicación que usa el puerto:**
   - Busca y cierra otras instancias de Duetto
   - Cierra otros servidores de desarrollo

2. **Matar el proceso manualmente:**
   ```powershell
   netstat -ano | findstr :3000
   taskkill /PID <número-de-pid> /F
   ```

3. **Cambiar el puerto en vite.config.js** (avanzado)

### La aplicación Electron no se abre o se cierra inmediatamente

**Soluciones:**

1. Verifica los logs en la consola para ver el error específico
2. Asegúrate de que todas las dependencias están instaladas:
   ```powershell
   npm install
   ```
3. Prueba ejecutar solo el frontend primero:
   ```powershell
   npm run dev
   ```
4. Si el frontend funciona pero Electron no, reinstala electron:
   ```powershell
   npm uninstall electron
   npm install electron --save-dev
   ```

### Error de permisos al instalar

**Causa:** Windows puede bloquear la instalación de paquetes npm por permisos.

**Soluciones:**

1. **Ejecutar PowerShell como Administrador:**
   - Haz clic derecho en PowerShell
   - Selecciona "Ejecutar como administrador"
   - Vuelve a ejecutar `npm install`

2. **Desactivar temporalmente el antivirus/firewall:**
   - Algunos antivirus bloquean npm
   - Desactiva temporalmente y vuelve a intentar
   - No olvides reactivarlo después

### Error al construir el ejecutable Windows

**Soluciones:**

1. Asegúrate de haber construido el proyecto primero:
   ```powershell
   npm run build
   ```

2. Verifica que exista la carpeta `build/` con el ícono
3. Si falla electron-builder, reinstálalo:
   ```powershell
   npm install electron-builder --save-dev
   ```

### La aplicación se ve mal o con estilos rotos

**Causa:** El build no se generó correctamente.

**Soluciones:**

1. Elimina la carpeta `dist` y reconstruye:
   ```powershell
   rmdir /s /q dist
   npm run build
   npm run electron
   ```

2. Limpia el caché del navegador si estás usando el modo web

---

## Requisitos del Sistema

**Mínimos:**
- Windows 10 o superior
- 4 GB de RAM
- 500 MB de espacio libre en disco
- Node.js 18.x o superior

**Recomendados:**
- Windows 10/11 (64-bit)
- 8 GB de RAM
- 1 GB de espacio libre en disco
- Conexión a internet (para la instalación inicial)

---

## Comandos Útiles de Referencia Rápida

```powershell
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run electron

# Ejecutar solo frontend en navegador
npm run dev

# Construir proyecto
npm run build

# Crear ejecutable para Windows
npm run electron:build:win

# Ver versión de Node.js
node --version

# Ver versión de npm
npm --version

# Limpiar caché de npm
npm cache clean --force

# Ver ayuda de npm
npm help
```

---

## Soporte Adicional

Si sigues teniendo problemas después de probar estas soluciones:

1. Verifica que cumples con los requisitos del sistema
2. Revisa la consola para mensajes de error específicos
3. Busca el error específico en Google o Stack Overflow
4. Consulta la documentación oficial de:
   - [Node.js](https://nodejs.org/docs/)
   - [Electron](https://www.electronjs.org/docs)
   - [Vite](https://vitejs.dev/)

---

## Notas de Seguridad

- Descarga Node.js solo desde el sitio oficial: https://nodejs.org/
- Verifica que el instalador esté firmado digitalmente
- No ejecutes scripts de fuentes desconocidas
- Mantén Node.js y npm actualizados para seguridad

---

**¿Listo para comenzar?** Elige una de las tres opciones de instalación arriba y sigue los pasos. ¡La Opción 1 con el script automatizado es la más rápida! 🚀
