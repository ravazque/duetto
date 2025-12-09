# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Duetto is a desktop application for projective card therapy and self-exploration, inspired by OH Cards. Built with React + Electron, it provides two complementary decks (44 word cards + 44 image cards) that users combine for therapeutic reflection.

**Key Characteristics:**
- 100% offline, privacy-focused (no tracking, no network calls)
- Auto-save to localStorage (no explicit save buttons)
- Bilingual Spanish UI
- Cross-platform desktop (Windows/Linux, macOS planned)

## Development Commands

### Running the app
```bash
# Development mode (hot reload)
npm run electron

# Web-only development (no Electron)
npm run dev
```

### Building
```bash
# Build for all platforms
npm run electron:build

# Platform-specific builds
npm run electron:build:win    # Windows
npm run electron:build:linux  # Linux AppImage
npm run electron:build:mac    # macOS (not yet tested)
```

Build output goes to `release/` directory.

## Architecture

### Core State Management (App.jsx)

The entire application state lives in `App.jsx` with no external state management library. This is intentional for simplicity.

**Card State Flow:**
```
faceDown → selected → ready-to-flip → flipped → resetting → faceDown
```

1. `faceDown`: Initial state, card face down
2. `selected`: User clicked, shows ✓ indicator (max 1 per deck)
3. `ready-to-flip`: Intermediate state during reveal sequence
4. `flipped`: Card showing content
5. `resetting`: Animation state when resetting deck

**Critical State Rules:**
- Only 1 card can be `selected` per deck at a time
- When selecting a card, all other cards in that deck auto-deselect
- Cards maintain a `previouslyFlipped` flag to track multi-reveal sessions
- Shuffle uses Fisher-Yates algorithm for true randomness

### Reveal Sequence (handleFlipSelected)

The reveal process is a carefully orchestrated 3-step sequence:

1. **Scroll Reset**: Both deck sliders scroll to position 0
2. **Reorder Cards**: Selected cards move to front of array, maintaining `ready-to-flip` state
3. **Flip Animation**: After scroll completes (~350ms), cards transition to `flipped` state

This timing is critical - breaking it causes visual glitches. The `canFlipCards` flag ensures cards don't animate until scroll is complete.

### Data Persistence

**localStorage Schema:**
```javascript
// Saved on every deck modification
wordCards: [{ id, type, content }]
imageCards: [{ id, type, content, imageData }]
darkMode: boolean
```

**Important:** States (`faceDown`, `selected`, etc.) are never saved to localStorage. Only card content persists. This ensures every session starts fresh.

### Component Structure

- **App.jsx**: Main state container, orchestrates all interactions
- **Deck.jsx**: Renders horizontal scrolling card list, manages scroll reset
- **Card.jsx**: Individual card with flip animations, handles click events
- **ControlPanel.jsx**: Reveal/Reset buttons, selection counters, dark mode toggle
- **DeckConfig.jsx**: Modal for editing/adding/removing cards

### Image Handling

Cards support both emoji and custom images:
- **Emoji**: Direct string content (default)
- **Custom Images**: Base64 data URLs in `card.imageData` property

When users upload images via DeckConfig, files are converted to base64 and stored in localStorage.

### Electron Integration

**electron.js** is minimal:
- Creates 1400x900 window (min 800x600)
- Loads from `http://localhost:3000` in dev, `dist/index.html` in prod
- Security: `nodeIntegration: false`, `contextIsolation: true`
- Opens DevTools automatically in development

**Vite Config Notes:**
- `base: './'` is essential for Electron file:// protocol
- Server runs on port 3000
- Build output: `dist/`

## Common Gotchas

1. **Don't modify state timing**: The 350ms delays in `handleFlipSelected` and 600ms in `handleReset` are precisely tuned to CSS animations. Changing them breaks visual flow.

2. **Card ID format matters**: Word cards use `w1, w2, ...`, image cards use `i1, i2, ...`. These IDs are stable across saves.

3. **localStorage limits**: Base64 images in `imageData` can hit browser storage limits (~5-10MB). The app doesn't currently handle this edge case.

4. **No TypeScript**: The codebase is pure JavaScript/JSX. Type safety is handled through JSDoc comments.

5. **Dark mode**: Applied via body class (`dark-mode`), not React context. Check `App.css` for theme variables.

## File Locations

- Card data defaults: `src/data/cardsData.js`
- Main styles: `src/App.css`, `src/index.css`
- Component styles: `src/components/*.css` (co-located with components)
- Electron entry: `electron.js` (root level)
- Build resources: `build/icon.png`

## Testing Notes

There are currently no automated tests. Manual testing checklist:
- Select cards from both decks, verify only 1 per deck can be selected
- Reveal cards, verify they scroll to start and flip smoothly
- Reset deck, verify cards flip back and shuffle
- Open config, add/edit/delete cards, verify changes persist
- Close and reopen app, verify configuration persists
- Toggle dark mode, verify it persists
- Upload custom image, verify it displays and persists

## Version History Context

- v1.1.0: Added custom image upload support (`imageData` property)
- v1.2.0: UX improvements and animations
- v1.3.0+: Current - enhanced animations and dark mode refinements
