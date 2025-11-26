# 📤 Guía para Publicar en GitHub - Cartas Proyectivas

Esta guía explica cómo subir el proyecto a GitHub y crear un release con los ejecutables.

## 🚀 Paso 1: Subir el Código a GitHub

### Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Configura tu repositorio:
   - **Nombre**: `cartas-proyectivas` (o el nombre que prefieras)
   - **Descripción**: `Aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards`
   - **Visibilidad**: Pública o Privada (según tu preferencia)
   - **NO** marques "Add a README file" (ya tenemos uno)
   - **NO** marques "Add .gitignore" (ya tenemos uno)
3. Click en "Create repository"

### Conectar Repositorio Local con GitHub

```bash
# Ir al directorio del proyecto
cd /home/ravazque/Desktop/ariarcos

# Agregar el remote de GitHub (reemplaza <tu-usuario>)
git remote add origin https://github.com/<tu-usuario>/cartas-proyectivas.git

# Verificar que se agregó correctamente
git remote -v

# Subir todos los commits
git push -u origin main
```

Si usas SSH en lugar de HTTPS:
```bash
git remote add origin git@github.com:<tu-usuario>/cartas-proyectivas.git
git push -u origin main
```

## 🏷️ Paso 2: Crear Tag de Versión

Los tags de Git marcan versiones específicas del código:

```bash
# Crear tag anotado para la versión 1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 - Primera versión pública (Beta)

Características:
- Dos mazos de cartas (Palabras e Imágenes)
- Persistencia automática de datos
- Panel de configuración completo
- Ejecutable para Linux disponible

Ver RELEASE_NOTES.md para detalles completos."

# Ver el tag creado
git show v1.0.0

# Subir el tag a GitHub
git push origin v1.0.0
```

## 📦 Paso 3: Crear GitHub Release

### Opción A: Interfaz Web de GitHub (Recomendado)

1. **Ir a tu repositorio en GitHub**
   ```
   https://github.com/<tu-usuario>/cartas-proyectivas
   ```

2. **Navegar a Releases**
   - Click en "Releases" (en la barra lateral derecha)
   - O ir directamente a: `https://github.com/<tu-usuario>/cartas-proyectivas/releases`

3. **Crear Nuevo Release**
   - Click en "Create a new release"

4. **Configurar Release**
   - **Tag version**: Seleccionar `v1.0.0` (el tag que creaste)
   - **Release title**: `v1.0.0 - Primera Versión Pública (Beta)`
   - **Description**: Copiar y pegar el contenido de `RELEASE_NOTES.md`

5. **Subir Ejecutable**
   - Scroll hasta "Attach binaries"
   - Click en "Attach files by dropping them here or selecting them"
   - Seleccionar: `release/Cartas Proyectivas-1.0.0.AppImage` (114 MB)
   - **Importante**: GitHub Releases permite archivos hasta 2 GB

6. **Opciones Adicionales**
   - ✅ Marcar "Set as a pre-release" (si es beta)
   - ⬜ NO marcar "Set as the latest release" (aún) hasta probar

7. **Publicar**
   - Click en "Publish release"

### Opción B: GitHub CLI (Línea de Comandos)

Si tienes `gh` instalado:

```bash
# Instalar GitHub CLI (si no lo tienes)
# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Autenticarse
gh auth login

# Crear release y subir ejecutable
gh release create v1.0.0 \
  "release/Cartas Proyectivas-1.0.0.AppImage" \
  --title "v1.0.0 - Primera Versión Pública (Beta)" \
  --notes-file RELEASE_NOTES.md \
  --prerelease

# Verificar que se creó correctamente
gh release view v1.0.0
```

## ✅ Paso 4: Verificar el Release

1. **Ir a la página de Releases**
   ```
   https://github.com/<tu-usuario>/cartas-proyectivas/releases
   ```

2. **Verificar que se muestra**:
   - ✅ Tag `v1.0.0`
   - ✅ Título del release
   - ✅ Descripción completa (del RELEASE_NOTES.md)
   - ✅ Ejecutable adjunto: `Cartas Proyectivas-1.0.0.AppImage`
   - ✅ Etiqueta "Pre-release" (si es beta)

3. **Probar descarga**:
   - Click en el ejecutable para descargarlo
   - Verificar que descarga correctamente
   - Verificar checksum:
     ```bash
     sha256sum "Cartas Proyectivas-1.0.0.AppImage"
     # Debe coincidir con: ffb3c24dff88bca5d5957f99e4cb1c2c001fb35329bec835321b41afeb4f1a8e
     ```

## 📝 Paso 5: Actualizar README con Enlaces

Una vez publicado, actualizar el README con el enlace directo:

```bash
# Editar README.md
# Reemplazar la sección de descargas con:
```

```markdown
## 📥 Descarga Rápida

**¿Solo quieres usar la aplicación?** Descarga el ejecutable para tu sistema operativo:

- **Windows**: `Cartas-Proyectivas-Setup-1.0.0.exe` *(Próximamente)*
- **macOS**: `Cartas-Proyectivas-1.0.0.dmg` *(Próximamente)*
- **Linux**: [Cartas-Proyectivas-1.0.0.AppImage](https://github.com/<tu-usuario>/cartas-proyectivas/releases/download/v1.0.0/Cartas%20Proyectivas-1.0.0.AppImage) ✅ **Disponible**
```

Luego commitear y subir:

```bash
git add README.md
git commit -m "docs: Actualizar README con enlace de descarga de GitHub Release"
git push origin main
```

## 🔄 Futuras Actualizaciones

### Para Nuevas Versiones

1. **Actualizar versión en `package.json`**:
   ```json
   {
     "version": "1.1.0"
   }
   ```

2. **Compilar nuevos ejecutables**:
   ```bash
   npm run electron:build:linux
   npm run electron:build:win  # Desde Windows
   npm run electron:build:mac  # Desde macOS
   ```

3. **Actualizar `RELEASE_NOTES.md`** con los cambios

4. **Crear nuevo commit**:
   ```bash
   git add .
   git commit -m "chore: Release v1.1.0"
   git push origin main
   ```

5. **Crear nuevo tag**:
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0 - Descripción"
   git push origin v1.1.0
   ```

6. **Crear nuevo release en GitHub** (siguiendo Paso 3)

## 📊 Paso 6: Configurar GitHub Pages (Opcional)

Si quieres alojar la documentación en GitHub Pages:

1. **Ir a Settings del repositorio**
   ```
   https://github.com/<tu-usuario>/cartas-proyectivas/settings
   ```

2. **Navegar a Pages**
   - En la barra lateral: "Pages"

3. **Configurar Source**
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: /docs
   - Click en "Save"

4. **Crear `docs/index.html`** (opcional):
   Copiar el `README.md` como landing page o crear uno personalizado

5. **Acceder**:
   ```
   https://<tu-usuario>.github.io/cartas-proyectivas/
   ```

## 🔐 Paso 7: Configurar Topics y About (Opcional)

Para mejorar la visibilidad del proyecto:

1. **Ir a la página principal del repositorio**

2. **Click en ⚙️ (Settings) al lado de About**

3. **Configurar**:
   - **Description**: `Aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards`
   - **Website**: URL de GitHub Pages (si configuraste)
   - **Topics**: Agregar tags relevantes:
     - `electron`
     - `react`
     - `psychology`
     - `projective-cards`
     - `oh-cards`
     - `therapy`
     - `desktop-app`
     - `vite`

4. **Save changes**

## 📢 Paso 8: Promoción (Opcional)

Si quieres dar a conocer tu proyecto:

1. **Social Media**: Compartir en Twitter, LinkedIn, etc.
2. **Reddit**: Publicar en r/electronjs, r/reactjs, r/opensource
3. **Dev.to**: Escribir artículo sobre el desarrollo
4. **Product Hunt**: Lanzar como producto

## 🐛 Troubleshooting

### Error: "remote origin already exists"
```bash
# Eliminar remote existente
git remote remove origin

# Agregar nuevamente
git remote add origin https://github.com/<tu-usuario>/cartas-proyectivas.git
```

### Error: "failed to push some refs"
```bash
# Si el repositorio en GitHub tiene commits que no tienes localmente
git pull origin main --rebase
git push origin main
```

### Error: "Support for password authentication was removed"
**Solución**: Usar Personal Access Token en lugar de contraseña:

1. Ir a https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Scopes: `repo`, `workflow`
4. Copiar el token
5. Usar el token como contraseña al hacer push

O mejor aún, configurar SSH:
```bash
# Generar clave SSH
ssh-keygen -t ed25519 -C "tu-email@example.com"

# Agregar a GitHub
# Copiar contenido de ~/.ssh/id_ed25519.pub
cat ~/.ssh/id_ed25519.pub

# Ir a https://github.com/settings/keys
# "New SSH key" y pegar el contenido
```

### Ejecutable muy grande para upload web
Si el navegador falla al subir el ejecutable (114 MB):
- Usar GitHub CLI: `gh release create ...`
- O usar Git LFS (Large File Storage)

## 📋 Checklist Final

Antes de publicar, verifica:

- [ ] Código está en GitHub
- [ ] Tag `v1.0.0` creado y subido
- [ ] Release creado en GitHub
- [ ] Ejecutable de Linux subido correctamente
- [ ] README actualizado con enlaces de descarga
- [ ] RELEASE_NOTES.md incluido
- [ ] Checksums verificados
- [ ] Ejecutable probado (descarga y ejecución)
- [ ] Topics y About configurados
- [ ] Licencia agregada (si aplica)

## 🎉 ¡Listo!

Tu proyecto está ahora disponible públicamente en GitHub con su primer release.

Los usuarios pueden:
1. Clonar el repositorio para desarrollar
2. Descargar el ejecutable directamente desde Releases
3. Ver la documentación completa
4. Reportar issues
5. Contribuir con pull requests

---

**Última actualización**: Noviembre 26, 2025
