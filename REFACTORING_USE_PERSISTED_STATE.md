# Refactorización: Hook Genérico usePersistedState

**Fecha:** 2026-01-06
**Duración:** ~30 minutos
**Estado:** ✅ COMPLETADO

---

## 📊 Resumen

Se ha creado un hook genérico `usePersistedState` para eliminar la duplicación de lógica de persistencia en localStorage entre `ThemeContext` y `useZoom`. Esta refactorización reduce deuda técnica y mejora la mantenibilidad del código.

---

## 🎯 Problema Identificado

### Código Duplicado

**Patrón repetido en ThemeContext.jsx:**
```javascript
const [darkMode, setDarkMode] = useState(() => {
  return storage.get(STORAGE_KEYS.DARK_MODE, false);
});

useEffect(() => {
  storage.set(STORAGE_KEYS.DARK_MODE, darkMode);
  // ... efectos secundarios específicos
}, [darkMode]);
```

**Patrón repetido en useZoom.js:**
```javascript
const [zoomLevel, setZoomLevel] = useState(() => {
  return storage.get(STORAGE_KEYS_ZOOM.ZOOM_LEVEL, ZOOM_CONFIG.DEFAULT);
});

useEffect(() => {
  storage.set(STORAGE_KEYS_ZOOM.ZOOM_LEVEL, zoomLevel);
  // ... efectos secundarios específicos
}, [zoomLevel]);
```

### Violación DRY (Don't Repeat Yourself)
Ambos hooks implementan el mismo patrón de:
1. Inicializar estado desde localStorage
2. Persistir estado en localStorage cuando cambia
3. Ejecutar efectos secundarios opcionales

---

## ✅ Solución Implementada

### 1. Hook Genérico `usePersistedState`

**Ubicación:** `src/hooks/usePersistedState.js` (31 líneas)

**Interfaz:**
```javascript
const [state, setState] = usePersistedState(key, defaultValue, onUpdate);
```

**Parámetros:**
- `key` (string): Clave de localStorage
- `defaultValue` (any): Valor por defecto si no existe en localStorage
- `onUpdate` (function, opcional): Callback que se ejecuta cuando el estado cambia

**Características:**
- ✅ Inicialización lazy desde localStorage
- ✅ Persistencia automática en cada cambio
- ✅ Soporte para callback de efectos secundarios
- ✅ Tipo-agnóstico (funciona con cualquier tipo serializable)
- ✅ Totalmente testeado (11 tests)

---

### 2. Refactorización de ThemeContext.jsx

**Antes (50 líneas):**
```javascript
import { createContext, useState, useEffect } from 'react';
import storage from '../services/storage';

const [darkMode, setDarkMode] = useState(() => {
  return storage.get(STORAGE_KEYS.DARK_MODE, false);
});

useEffect(() => {
  storage.set(STORAGE_KEYS.DARK_MODE, darkMode);
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [darkMode]);
```

**Después (47 líneas, -6%):**
```javascript
import { createContext } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';

const [darkMode, setDarkMode] = usePersistedState(
  STORAGE_KEYS.DARK_MODE,
  false,
  (value) => {
    if (value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
);
```

**Beneficios:**
- ✅ Eliminado import de `useState` y `useEffect`
- ✅ Eliminado import de `storage`
- ✅ Código más declarativo y conciso
- ✅ Lógica de persistencia abstraída

---

### 3. Refactorización de useZoom.js

**Antes (57 líneas):**
```javascript
import { useState, useEffect, useCallback } from 'react';
import storage from '../services/storage';

const [zoomLevel, setZoomLevel] = useState(() => {
  return storage.get(STORAGE_KEYS_ZOOM.ZOOM_LEVEL, ZOOM_CONFIG.DEFAULT);
});

useEffect(() => {
  storage.set(STORAGE_KEYS_ZOOM.ZOOM_LEVEL, zoomLevel);
  document.documentElement.style.setProperty('--app-zoom', zoomLevel);
}, [zoomLevel]);
```

**Después (55 líneas, -4%):**
```javascript
import { useCallback } from 'react';
import { usePersistedState } from './usePersistedState';

const [zoomLevel, setZoomLevel] = usePersistedState(
  STORAGE_KEYS_ZOOM.ZOOM_LEVEL,
  ZOOM_CONFIG.DEFAULT,
  (value) => {
    document.documentElement.style.setProperty('--app-zoom', value);
  }
);
```

**Beneficios:**
- ✅ Eliminado import de `useState` y `useEffect`
- ✅ Eliminado import de `storage`
- ✅ Código más declarativo
- ✅ Lógica de persistencia abstraída

---

### 4. Restauración de App.jsx

Se recreó `src/App.jsx` (129 líneas) utilizando todos los custom hooks:
- ✅ `useTheme` - Gestión de tema
- ✅ `useZoom` - Gestión de zoom
- ✅ `useElectronAPI` - Abstracción de Electron
- ✅ `useGameState` - Estado del juego
- ✅ `useCardAnimation` - Animaciones de revelación
- ✅ `useCardReset` - Reseteo y mezclado

**Arquitectura limpia:** Componente App solo compone hooks y componentes visuales, sin lógica de negocio.

---

## 🧪 Testing

### Tests Creados

**Archivo:** `src/hooks/__tests__/usePersistedState.test.js`
**Total:** 11 tests

**Cobertura:**
1. ✅ Inicialización con valor por defecto (1 test)
2. ✅ Inicialización desde localStorage (1 test)
3. ✅ Soporte múltiples tipos de datos (1 test)
4. ✅ Actualización de estado (1 test)
5. ✅ Persistencia en localStorage (1 test)
6. ✅ Función updater (1 test)
7. ✅ Callback onUpdate llamado correctamente (1 test)
8. ✅ Funcionamiento sin onUpdate (1 test)
9. ✅ Efectos secundarios en onUpdate (1 test)
10. ✅ Estados separados para diferentes keys (1 test)
11. ✅ Persistencia tras remount (1 test)

### Resultados

```bash
✓ 7 archivos de tests
✓ 86 tests pasando (100%)
✓ 0 tests fallando
```

**Tests anteriores:** 75
**Tests nuevos:** 11
**Total:** 86 tests (+15%)

---

## 📦 Build

```bash
✓ Build exitoso
✓ Sin errores
✓ Bundle: 155.84 KB (50.52 KB gzip)
```

---

## 📊 Métricas

### Código

| Métrica | Antes | Después | Cambio |
|---------|-------|---------|--------|
| ThemeContext.jsx | 50 líneas | 47 líneas | -6% |
| useZoom.js | 57 líneas | 55 líneas | -4% |
| usePersistedState.js | N/A | 31 líneas | +31 |
| Tests | 75 | 86 | +11 |
| **Total neto** | **107 líneas** | **133 líneas** | **+24% (con tests)** |

### Deuda Técnica Resuelta

| Issue | Estado | Tiempo |
|-------|--------|--------|
| 🟡 Duplicación localStorage | ✅ RESUELTO | 30 min |

---

## 🎓 Principios Aplicados

### 1. DRY (Don't Repeat Yourself)
- Patrón de persistencia extraído a hook reutilizable
- Eliminada duplicación entre ThemeContext y useZoom

### 2. Single Responsibility Principle (SOLID)
- `usePersistedState` tiene una única responsabilidad: gestionar estado persistido
- Hooks de dominio (`useTheme`, `useZoom`) se enfocan en lógica específica

### 3. Open/Closed Principle (SOLID)
- `usePersistedState` es extensible mediante el callback `onUpdate`
- No requiere modificación para nuevos casos de uso

### 4. Composición sobre Herencia
- Hooks pequeños y composables
- Cada hook hace una cosa bien

---

## 🔄 Patrón de Uso

### Caso de Uso 1: Estado Simple Persistido
```javascript
const [value, setValue] = usePersistedState('my-key', 'default');
```

### Caso de Uso 2: Estado con Efecto Secundario
```javascript
const [theme, setTheme] = usePersistedState('theme', 'light', (value) => {
  document.body.className = value;
});
```

### Caso de Uso 3: Estado con Validación
```javascript
const [count, setCount] = usePersistedState('count', 0, (value) => {
  if (value < 0) console.warn('Count negativo');
});
```

---

## 📂 Archivos Afectados

### Creados
- ✅ `src/hooks/usePersistedState.js` (31 líneas)
- ✅ `src/hooks/__tests__/usePersistedState.test.js` (11 tests)
- ✅ `src/App.jsx` (129 líneas, recreado)

### Modificados
- ✅ `src/contexts/ThemeContext.jsx` (refactorizado)
- ✅ `src/hooks/useZoom.js` (refactorizado)

---

## ✅ Checklist de Verificación

- ✅ Hook genérico creado
- ✅ Tests completos (11 tests)
- ✅ ThemeContext refactorizado
- ✅ useZoom refactorizado
- ✅ App.jsx recreado
- ✅ Todos los tests pasando (86/86)
- ✅ Build exitoso
- ✅ Documentación actualizada

---

## 🚀 Próximos Pasos (Sprint 3)

### Inmediato
- ✅ **usePersistedState genérico creado** (COMPLETADO)
- [ ] Evaluar otros casos de uso para usePersistedState

### Semana 1: División de useGameState (4h)
- [ ] Crear `useCardsState` (gestión de mazos)
- [ ] Crear `useRevealState` (cartas reveladas)
- [ ] Crear `useDeckRefs` (referencias DOM)
- [ ] Crear `useCardSelection` (selección de cartas)

### Semana 2: Testing Componentes (6h)
- [ ] Tests para Card.jsx
- [ ] Tests para Deck.jsx
- [ ] Tests para ControlPanel.jsx
- [ ] Tests para RevealArea.jsx

---

## 🎉 Conclusión

La refactorización se completó exitosamente en ~30 minutos. Se ha:

1. ✅ **Eliminado duplicación** mediante abstracción genérica
2. ✅ **Mejorado mantenibilidad** con código más declarativo
3. ✅ **Aumentado cobertura** con 11 nuevos tests (86 total)
4. ✅ **Aplicado principios SOLID** (DRY, SRP, OCP)
5. ✅ **Mantenido funcionalidad** 100% (86/86 tests pasando)

**Deuda técnica resuelta:** 1 issue medio (30 min)
**Deuda técnica restante:** Ver `ANALISIS_DEUDA_TECNICA_FINAL.md`

---

**Estado:** ✅ **COMPLETADO Y VERIFICADO**
**Fecha:** 2026-01-06
**Tiempo:** 30 minutos
**ROI:** Alto - Código más limpio, menos duplicación, mejor extensibilidad

---

_Ejecutado por: Claude Sonnet 4.5_
