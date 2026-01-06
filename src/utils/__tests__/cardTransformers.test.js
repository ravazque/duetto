import { describe, it, expect } from 'vitest';
import {
  updateCardById,
  updateCardsByPredicate,
  initializeCards,
  flipAllToFaceDown,
  moveCardsToEnd,
  toggleCardSelection
} from '../cardTransformers';
import { CARD_STATES } from '../../constants/gameConfig';

describe('cardTransformers', () => {
  describe('updateCardById', () => {
    it('debe actualizar el estado de la carta especificada', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = updateCardById(cards, '1', CARD_STATES.SELECTED);

      expect(result[0].state).toBe(CARD_STATES.SELECTED);
      expect(result[1].state).toBe(CARD_STATES.FACE_DOWN);
    });

    it('no debe modificar el array original (inmutabilidad)', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];
      const originalCards = JSON.parse(JSON.stringify(cards));

      updateCardById(cards, '1', CARD_STATES.SELECTED);

      expect(cards).toEqual(originalCards);
    });

    it('no debe modificar cartas que no coincidan con el ID', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.SELECTED }
      ];

      const result = updateCardById(cards, '3', CARD_STATES.FLIPPED);

      expect(result).toEqual(cards);
    });
  });

  describe('updateCardsByPredicate', () => {
    it('debe actualizar todas las cartas que cumplan el predicado', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED },
        { id: '2', state: CARD_STATES.FACE_DOWN },
        { id: '3', state: CARD_STATES.SELECTED }
      ];

      const result = updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.SELECTED,
        CARD_STATES.FLIPPED
      );

      expect(result[0].state).toBe(CARD_STATES.FLIPPED);
      expect(result[1].state).toBe(CARD_STATES.FACE_DOWN);
      expect(result[2].state).toBe(CARD_STATES.FLIPPED);
    });

    it('no debe modificar el array original', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];
      const originalCards = JSON.parse(JSON.stringify(cards));

      updateCardsByPredicate(
        cards,
        card => card.state === CARD_STATES.SELECTED,
        CARD_STATES.FLIPPED
      );

      expect(cards).toEqual(originalCards);
    });
  });

  describe('initializeCards', () => {
    it('debe inicializar cartas con estado por defecto (faceDown)', () => {
      const rawCards = [
        { id: '1', content: 'A' },
        { id: '2', content: 'B' }
      ];

      const result = initializeCards(rawCards);

      expect(result[0].state).toBe(CARD_STATES.FACE_DOWN);
      expect(result[1].state).toBe(CARD_STATES.FACE_DOWN);
      expect(result[0].content).toBe('A');
      expect(result[1].content).toBe('B');
    });

    it('debe permitir especificar estado inicial personalizado', () => {
      const rawCards = [{ id: '1', content: 'A' }];

      const result = initializeCards(rawCards, CARD_STATES.FLIPPED);

      expect(result[0].state).toBe(CARD_STATES.FLIPPED);
    });

    it('no debe modificar el array original', () => {
      const rawCards = [{ id: '1', content: 'A' }];
      const originalRawCards = JSON.parse(JSON.stringify(rawCards));

      initializeCards(rawCards);

      expect(rawCards).toEqual(originalRawCards);
    });
  });

  describe('flipAllToFaceDown', () => {
    it('debe voltear todas las cartas a faceDown', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED },
        { id: '2', state: CARD_STATES.FLIPPED },
        { id: '3', state: CARD_STATES.MOVING_TO_END }
      ];

      const result = flipAllToFaceDown(cards);

      expect(result.every(c => c.state === CARD_STATES.FACE_DOWN)).toBe(true);
    });

    it('debe preservar otras propiedades de las cartas', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED, content: 'A', type: 'word' }
      ];

      const result = flipAllToFaceDown(cards);

      expect(result[0].content).toBe('A');
      expect(result[0].type).toBe('word');
    });

    it('no debe modificar el array original', () => {
      const cards = [{ id: '1', state: CARD_STATES.SELECTED }];
      const originalCards = JSON.parse(JSON.stringify(cards));

      flipAllToFaceDown(cards);

      expect(cards).toEqual(originalCards);
    });
  });

  describe('moveCardsToEnd', () => {
    it('debe mover cartas con el estado especificado al final', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.MOVING_TO_END },
        { id: '3', state: CARD_STATES.FACE_DOWN },
        { id: '4', state: CARD_STATES.MOVING_TO_END }
      ];

      const result = moveCardsToEnd(cards, CARD_STATES.MOVING_TO_END);

      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('3');
      expect(result[2].id).toBe('2');
      expect(result[3].id).toBe('4');
    });

    it('debe preservar el orden relativo de las cartas', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN },
        { id: '3', state: CARD_STATES.SELECTED },
        { id: '4', state: CARD_STATES.SELECTED }
      ];

      const result = moveCardsToEnd(cards, CARD_STATES.SELECTED);

      // El orden de faceDown se mantiene (1, 2)
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
      // El orden de selected se mantiene (3, 4)
      expect(result[2].id).toBe('3');
      expect(result[3].id).toBe('4');
    });

    it('no debe modificar el array si no hay cartas con ese estado', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = moveCardsToEnd(cards, CARD_STATES.SELECTED);

      expect(result).toEqual(cards);
    });
  });

  describe('toggleCardSelection', () => {
    it('debe seleccionar una carta faceDown', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = toggleCardSelection(cards, '1');

      expect(result[0].state).toBe(CARD_STATES.SELECTED);
      expect(result[1].state).toBe(CARD_STATES.FACE_DOWN);
    });

    it('debe deseleccionar una carta seleccionada', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = toggleCardSelection(cards, '1');

      expect(result[0].state).toBe(CARD_STATES.FACE_DOWN);
    });

    it('debe deseleccionar otras cartas cuando se selecciona una nueva (máximo 1 selección)', () => {
      const cards = [
        { id: '1', state: CARD_STATES.SELECTED },
        { id: '2', state: CARD_STATES.FACE_DOWN },
        { id: '3', state: CARD_STATES.FACE_DOWN }
      ];

      const result = toggleCardSelection(cards, '2');

      expect(result[0].state).toBe(CARD_STATES.FACE_DOWN); // Deseleccionada
      expect(result[1].state).toBe(CARD_STATES.SELECTED); // Nueva selección
      expect(result[2].state).toBe(CARD_STATES.FACE_DOWN);
    });

    it('no debe permitir seleccionar cartas volteadas', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FLIPPED },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = toggleCardSelection(cards, '1');

      expect(result[0].state).toBe(CARD_STATES.FLIPPED); // Sin cambios
    });

    it('debe retornar null si la carta no pertenece a este mazo', () => {
      const cards = [
        { id: '1', state: CARD_STATES.FACE_DOWN },
        { id: '2', state: CARD_STATES.FACE_DOWN }
      ];

      const result = toggleCardSelection(cards, '999');

      expect(result).toBeNull();
    });

    it('no debe modificar el array original', () => {
      const cards = [{ id: '1', state: CARD_STATES.FACE_DOWN }];
      const originalCards = JSON.parse(JSON.stringify(cards));

      toggleCardSelection(cards, '1');

      expect(cards).toEqual(originalCards);
    });
  });
});
