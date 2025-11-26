# 📋 Release Notes - Cartas Proyectivas

## Version 1.0.0 - Release Inicial (Beta)
**Fecha**: Noviembre 26, 2025

### 🎉 Primera Versión Pública

Esta es la primera versión beta de **Cartas Proyectivas**, una aplicación de escritorio para terapia con cartas proyectivas estilo OH Cards.

---

## ✨ Características Principales

### 🎴 Sistema de Cartas
- **Dos mazos completos**:
  - Mazo de Palabras: 44 cartas
  - Mazo de Imágenes: 44 cartas
- **Selección interactiva**: Click para seleccionar con indicador visual (✓ verde)
- **Animación de volteo 3D**: Transición suave al revelar cartas
- **Mezcla automática**: Las cartas se barajan al reiniciar

### 💾 Persistencia de Datos
- ✅ **Guardado automático** entre sesiones
- ✅ Cartas personalizadas persisten
- ✅ Modificaciones se mantienen
- ✅ Sin necesidad de guardar manualmente
- **Tecnología**: localStorage de Electron

### ⚙️ Panel de Configuración
- Añadir nuevas cartas (palabras o imágenes)
- Editar cartas existentes
- Eliminar cartas
- Vista previa en tiempo real
- Interfaz intuitiva con botones claros

### 🖥️ Aplicación de Escritorio
- **Funciona offline**: No requiere conexión a internet
- **Multiplataforma**: Windows, macOS, Linux
- **Ventana responsive**: Se adapta a diferentes tamaños
- **Tamaño mínimo**: 800x600px
- **Tamaño inicial**: 1400x900px

---

## 📦 Descargas Disponibles

### Ejecutables

| Plataforma | Archivo | Tamaño | Estado |
|------------|---------|--------|--------|
| **Linux** | `Cartas-Proyectivas-1.0.0.AppImage` | ~114 MB | ✅ Disponible |
| **Windows** | `Cartas-Proyectivas-Setup-1.0.0.exe` | TBD | 🚧 Próximamente |
| **macOS** | `Cartas-Proyectivas-1.0.0.dmg` | TBD | 🚧 Próximamente |

### Checksums (SHA-256)

```
ffb3c24dff88bca5d5957f99e4cb1c2c001fb35329bec835321b41afeb4f1a8e  Cartas-Proyectivas-1.0.0.AppImage
```

---

## 🔧 Requisitos del Sistema

### Mínimos
- **SO**: Windows 10+, macOS 10.13+, Linux (64-bit)
- **RAM**: 512 MB
- **Disco**: 200 MB libres
- **Procesador**: Dual-core 1.6 GHz

### Recomendados
- **SO**: Windows 11, macOS 12+, Linux moderna
- **RAM**: 2 GB
- **Disco**: 500 MB libres
- **Procesador**: Quad-core 2.0 GHz

---

## 📥 Instalación

### Linux (AppImage)
```bash
# Descargar el archivo
# Dar permisos de ejecución
chmod +x Cartas-Proyectivas-1.0.0.AppImage

# Ejecutar
./Cartas-Proyectivas-1.0.0.AppImage
```

### Windows (Próximamente)
1. Descargar `Cartas-Proyectivas-Setup-1.0.0.exe`
2. Ejecutar el instalador
3. Seguir el asistente de instalación
4. Iniciar desde el menú de inicio o acceso directo

### macOS (Próximamente)
1. Descargar `Cartas-Proyectivas-1.0.0.dmg`
2. Abrir el archivo DMG
3. Arrastrar la aplicación a la carpeta Aplicaciones
4. Iniciar desde Launchpad

---

## 🎮 Guía Rápida de Uso

### Flujo Básico
1. **Seleccionar**: Click en las cartas deseadas
2. **Revelar**: Botón "🎴 Revelar" para voltear
3. **Reiniciar**: Botón "🔄 Reiniciar / Mezclar" para nueva sesión

### Configurar Cartas
1. Click en "⚙️" (esquina superior derecha)
2. Usar formularios para añadir/editar/eliminar
3. Los cambios se guardan automáticamente
4. Cerrar panel de configuración

### Resetear a Valores por Defecto
1. Abrir DevTools (F12 o Ctrl+Shift+I)
2. Ir a: Application → Local Storage
3. Eliminar entradas `wordCards` e `imageCards`
4. Recargar aplicación (F5)

---

## 🐛 Problemas Conocidos

### Linux
- ⚠️ Algunas distribuciones requieren `--no-sandbox` flag
- ⚠️ Puede requerir dependencias adicionales (libxtst6, libnss3)

### Windows
- 🚧 Ejecutable aún no disponible
- 🚧 Se requiere compilación desde Windows nativo

### macOS
- 🚧 Ejecutable aún no disponible
- 🚧 Se requiere compilación desde macOS nativo
- ⚠️ Puede mostrar advertencia de "desarrollador no identificado"

### General
- Las imágenes personalizadas deben ser URLs válidas o rutas locales
- No hay límite de cartas, pero más de 100 por mazo puede afectar rendimiento
- La aplicación no incluye verificación de duplicados

---

## 🔄 Actualización desde Versiones Anteriores

**N/A** - Esta es la primera versión pública.

---

## 🚀 Próximas Características (Roadmap)

### v1.1.0 (Planificado)
- [ ] Exportar sesión a PDF
- [ ] Historial de sesiones
- [ ] Búsqueda de cartas
- [ ] Soporte para imágenes locales sin URLs

### v1.2.0 (Planificado)
- [ ] Modo oscuro
- [ ] Múltiples mazos personalizados
- [ ] Importar/exportar configuración
- [ ] Sonidos de cartas

### v2.0.0 (Futuro)
- [ ] Sincronización en la nube (opcional)
- [ ] Mazos compartidos
- [ ] Estadísticas de uso
- [ ] Temas personalizables

---

## 🐛 Reportar Problemas

Si encuentras algún problema:

1. **Verificar**: Que tu sistema cumple los requisitos mínimos
2. **Consultar**: La documentación técnica en `docs/README_TECNICO.md`
3. **Revisar**: Problemas conocidos arriba
4. **Reportar**: Crear un issue en GitHub con:
   - Versión de la app
   - Sistema operativo
   - Descripción del problema
   - Pasos para reproducir
   - Capturas de pantalla (si aplica)

---

## 🙏 Agradecimientos

Gracias por probar esta primera versión beta de Cartas Proyectivas.

**Tecnologías utilizadas**:
- React 18
- Electron 39
- Vite 5
- electron-builder

---

## 📄 Licencia

Este proyecto es privado y de uso personalizado.

---

## 📞 Contacto

Para consultas o sugerencias, contactar al desarrollador.

---

**Fecha de release**: Noviembre 26, 2025
**Build**: `5699233027628ea0c088aad946add87f2f627e21`
