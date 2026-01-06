# Duetto - Aplicación de Cartas Proyectivas

**Versión:** 1.4.0  
**Estado:** ✅ Production Ready  
**Última actualización:** 2026-01-06

---

## 📋 Descripción

Duetto es una aplicación de cartas proyectivas para terapia y autoconocimiento, inspirada en las OH Cards. Combina palabras e imágenes para facilitar procesos terapéuticos y exploración emocional.

---

## ✨ Características

- 🎴 **88 cartas de palabras** con conceptos cuidadosamente seleccionados
- 🖼️ **88 cartas de imágenes** con símbolos visuales proyectivos
- 🎨 **Modo oscuro/claro** con persistencia
- 🔍 **Sistema de zoom** (6 niveles: 0.6x - 1.8x)
- 🖱️ **Scroll horizontal con rueda** del ratón
- 🪟 **Controles de ventana** (Electron)
- ✨ **Animaciones fluidas** con timing configurables
- 🧪 **127 tests unitarios** con ~95% de cobertura

---

## 🚀 Instalación y Uso

Ver **INSTALL_WINDOWS.md** para instalación detallada en Windows.

### Comandos Rápidos
\`\`\`bash
npm install          # Instalar dependencias
npm run dev          # Desarrollo web
npm run electron     # Ejecutar Electron
npm test             # Ejecutar tests
npm run build        # Build producción
\`\`\`

---

## 📚 Documentación

- **README.md** - Este archivo
- **INSTALL_WINDOWS.md** - Instalación en Windows
- **SPRINT2_REFACTORIZACIÓN.md** - Arquitectura y refactorización
- **SPRINT3_COMPLETADO.md** - Sprint 3: División de hooks y eliminación de deuda técnica
- **ANALISIS_DEUDA_TECNICA_FINAL.md** - Análisis técnico detallado
- **REFACTORING_USE_PERSISTED_STATE.md** - Hook genérico de persistencia
- **CHANGELOG_MEJORAS.md** - Historial de cambios

---

## 🏗️ Arquitectura

### Tecnologías
- React 18 + Vite
- Electron 39
- Vitest + React Testing Library
- Context API + Custom Hooks

### Estructura
\`\`\`
src/
├── App.jsx              # Componente principal (129 líneas)
├── hooks/               # 11 custom hooks (arquitectura modular SOLID)
│   ├── useCardsState, useRevealState, useDeckRefs, useCardSelection
│   ├── useCardAnimation, useCardReset
│   ├── useTheme, useZoom, usePersistedState
│   └── useElectronAPI
├── components/          # 5 componentes visuales
├── contexts/            # ThemeContext
├── utils/               # Utilidades puras (100% testeadas)
└── constants/           # Configuración centralizada
\`\`\`

Ver **SPRINT2_REFACTORIZACIÓN.md** para detalles completos.

---

## 🧪 Testing

- **127 tests** pasando (100%)
- **~95% cobertura** en utilidades y hooks
- Framework: Vitest + React Testing Library
- **0 deuda técnica crítica**

\`\`\`bash
npm test              # Ejecutar tests
npm run test:coverage # Reporte de cobertura
\`\`\`

---

## 📊 Métricas

| Métrica | Valor |
|---------|-------|
| Tests unitarios | 127 |
| Cobertura | ~95% |
| Líneas App.jsx | 129 (-48% vs original) |
| Custom hooks | 11 |
| Deuda técnica crítica | 0 |
| Bundle size (gzip) | 50.49 KB |

---

## 🔧 Configuración

La aplicación persiste automáticamente:
- Modo oscuro/claro
- Nivel de zoom

---

## 📝 Licencia

[Especificar licencia]

---

_Última actualización: 2026-01-06_
