# Duetto v1.2.0 - Mejoras de Interfaz y UX

## Novedades en esta versión

### Mejoras Visuales

#### Modo Claro Mejorado
- El botón de cambio de tema ahora tiene un borde negro visible en modo claro
- Mejor contraste y visibilidad del botón de modo oscuro/claro
- Fondo degradado actualizado para el botón en modo claro

### Mejoras de Experiencia de Usuario

#### Animaciones Sincronizadas
- La animación de revelar cartas ahora se sincroniza perfectamente con el scroll
- Las cartas solo se voltean después de que:
  - Ambos sliders estén en la posición inicial
  - La vista esté centrada entre los mazos
- Animación más suave y predecible al revelar cartas

#### Animación de Elevación Refinada
- Reducción del movimiento vertical en la animación de revelar
- Transición más sutil y profesional (de -15px a -5px en el pico)
- Mejor feedback visual sin ser intrusivo

#### Reinicio Mejorado
- Las cartas seleccionadas ahora se deseleccionan automáticamente al pulsar "Reiniciar/Mezclar"
- Comportamiento más intuitivo y predecible
- Limpieza completa del estado de las cartas al reiniciar

### Mejoras Técnicas

#### Sistema de Sincronización
- Implementado sistema de verificación que asegura que los sliders estén al inicio antes de voltear
- Mejor coordinación entre múltiples animaciones simultáneas
- Sistema de flags para controlar el momento exacto del volteo

#### Flujo de Animación Optimizado
Secuencia mejorada:
1. Usuario presiona "Revelar"
2. Sliders van al inicio (scroll suave)
3. Vista se centra entre mazos
4. Las cartas se reordenan
5. Verificación: ¿sliders al inicio? ✓
6. Se inicia la animación completa de elevación + volteo

## Cambios Técnicos

### Componentes Modificados
- `App.jsx`: Lógica de sincronización de animaciones
- `App.css`: Estilos del botón de tema
- `Card.jsx`: Sistema de control de volteo
- `Card.css`: Animaciones refinadas
- `Deck.jsx`: Soporte para refs externas

### Nuevos Estados
- `ready-to-flip`: Estado intermedio antes del volteo
- `canFlipCards`: Flag global para sincronizar volteos

## Notas de Actualización

- Esta versión mantiene compatibilidad completa con configuraciones de v1.1.0
- No se requiere migración de datos
- Todas las cartas personalizadas se mantienen intactas

## Archivos Modificados
- src/App.jsx
- src/App.css
- src/components/Card.jsx
- src/components/Card.css
- src/components/Deck.jsx
- package.json
- README.md

## Para Desarrolladores

Si estás trabajando con el código:
- La lógica de sincronización usa `useRef` para acceder a los sliders
- El sistema verifica cada 50ms si los sliders están al inicio (scrollLeft < 5px)
- Las animaciones CSS están coordinadas con el estado de React

---

**Duetto v1.2.0** | Mejoras de UX y Animaciones | 2025
