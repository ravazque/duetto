# ⚡ INICIO RÁPIDO - 3 PASOS

## 1️⃣ Instalar Dependencias

```bash
npm install
```

Espera a que termine (puede tardar 1-2 minutos).

## 2️⃣ Iniciar Aplicación

```bash
npm run dev
```

Se abrirá automáticamente en tu navegador: `http://localhost:3000`

## 3️⃣ ¡A Probar!

- Haz clic en varias cartas (aparecerá ✓)
- Presiona "Voltear Seleccionadas"
- Usa "Reiniciar Todo" para empezar de nuevo

---

## 🎨 Personalizar Cartas

Edita: `src/data/cardsData.js`

```javascript
export const wordCards = [
  { id: 'w1', type: 'word', content: 'TU_PALABRA', state: 'faceDown' },
  // Agrega más...
];
```

---

## 🖼️ Usar Imágenes Reales

1. Crea carpeta: `public/images/`
2. Coloca imágenes: `carta1.jpg`, `carta2.jpg`, etc.
3. En `cardsData.js`:

```javascript
export const imageCards = [
  { id: 'i1', type: 'image', content: '/images/carta1.jpg', state: 'faceDown' },
];
```

---

## 📱 Ver en Móvil (Misma Red WiFi)

Cuando ejecutes `npm run dev`, verás algo como:

```
Network: http://192.168.1.100:3000
```

Abre esa URL en tu celular.

---

## 🛠️ Comandos Útiles

```bash
npm run dev      # Iniciar desarrollo
npm run build    # Compilar para producción
npm run preview  # Ver versión compilada
```

---

## ❓ Problemas Comunes

**Error: Cannot find module**
→ Ejecuta: `npm install`

**Puerto 3000 ocupado**
→ Cierra otras apps o edita `vite.config.js` (cambia port)

**Pantalla en blanco**
→ Abre consola (F12) y verifica errores

---

## 📞 Necesitas Más Info?

- `README.md` - Documentación completa
- `GUIA_DESARROLLO.md` - Cómo modificar código
