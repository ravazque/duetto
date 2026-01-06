import { describe, it, expect } from 'vitest';
import {
  findCardByState,
  getSelectedCard,
  countCardsByState,
  getSelectedCount,
  filterCardsByState,
  partitionByState,
  hasSelectedCard,
  canSelectCard
} from '../cardSelectors';
import { CARD_STATES } from '../../constants/gameConfig';

describe('cardSelectors', () => {
  const mockCards = [
    { id: '1', state: CARD_STATES.FACE_DOWN, content: 'A' },
    { id: '2', state: CARD_STATES.SELECTED, content: 'B' },
    { id: '3', state: CARD_STATES.FLIPPED, content: 'C' },
    { id: '4', state: CARD_STATES.FACE_DOWN, content: 'D' }
  ];

  describe('findCardByState', () => {
    it('debe encontrar la primera carta con el estado especificado', () => {
      const result = findCardByState(mockCards, CARD_STATES.SELECTED);

      expect(result).toEqual({ id: '2', state: CARD_STATES.SELECTED, content: 'B' });
    });

    it('debe retornar undefined si no encuentra cartas con ese estado', () => {
      const result = findCardByState(mockCards, CARD_STATES.MOVING_TO_END);

      expect(result).toBeUndefined();
    });

    it('debe retornar la primera carta si hay múltiples con el mismo estado', () => {
      const result = findCardByState(mockCards, CARD_STATES.FACE_DOWN);

      expect(result.id).toBe('1');
    });
  });

  describe('getSelectedCard', () => {
    it('debe encontrar la carta seleccionada', () => {
      const result = getSelectedCard(mockCards);

      expect(result).toEqual({ id: '2', state: CARD_STATES.SELECTED, content: 'B' });
    });

    it('debe retornar undefined si no hay carta seleccionada', () => {
      const cardsWithoutSelection = mockCards.filter(c => c.state !== CARD_STATES.SELECTED);
      const result = getSelectedCard(cardsWithoutSelection);

      expect(result).toBeUndefined();
    });
  });

  describe('countCardsByState', () => {
    it('debe contar correctamente las cartas por estado', () => {
      expect(countCardsByState(mockCards, CARD_STATES.FACE_DOWN)).toBe(2);
      expect(countCardsByState(mockCards, CARD_STATES.SELECTED)).toBe(1);
      expect(countCardsByState(mockCards, CARD_STATES.FLIPPED)).toBe(1);
    });

    it('debe retornar 0 si no hay cartas con ese estado', () => {
      expect(countCardsByState(mockCards, CARD_STATES.MOVING_TO_END)).toBe(0);
    });

    it('debe manejar array vacío', () => {
      expect(countCardsByState([], CARD_STATES.SELECTED)).toBe(0);
    });
  });

  describe('getSelectedCount', () => {
    it('debe contar las cartas seleccionadas', () => {
      expect(getSelectedCount(mockCards)).toBe(1);
    });

    it('debe retornar 0 si no hay seleccionadas', () => {
      const noSelection = mockCards.map(c => ({ ...c, state: CARD_STATES.FACE_DOWN }));
      expect(getSelectedCount(noSelection)).toBe(0);
    });
  });

  describe('filterCardsByState', () => {
    it('debe filtrar cartas por estado', () => {
      const faceDownCards = filterCardsByState(mockCards, CARD_STATES.FACE_DOWN);

      expect(faceDownCards).toHaveLength(2);
      expect(faceDownCards.every(c => c.state === CARD_STATES.FACE_DOWN)).toBe(true);
    });

    it('debe retornar array vacío si no hay coincidencias', () => {
      const result = filterCardsByState(mockCards, CARD_STATES.MOVING_TO_END);

      expect(result).toEqual([]);
    });
  });

  describe('partitionByState', () => {
    it('debe particionar correctamente el array', () => {
      const { matching, others } = partitionByState(mockCards, CARD_STATES.SELECTED);

      expect(matching).toHaveLength(1);
      expect(matching[0].state).toBe(CARD_STATES.SELECTED);
      expect(others).toHaveLength(3);
      expect(others.every(c => c.state !== CARD_STATES.SELECTED)).toBe(true);
    });

    it('debe poner todas en others si no hay coincidencias', () => {
      const { matching, others } = partitionByState(mockCards, CARD_STATES.MOVING_TO_END);

      expect(matching).toHaveLength(0);
      expect(others).toHaveLength(mockCards.length);
    });
  });

  describe('hasSelectedCard', () => {
    it('debe retornar true si hay carta seleccionada', () => {
      expect(hasSelectedCard(mockCards)).toBe(true);
    });

    it('debe retornar false si no hay carta seleccionada', () => {
      const noSelection = mockCards.filter(c => c.state !== CARD_STATES.SELECTED);
      expect(hasSelectedCard(noSelection)).toBe(false);
    });
  });

  describe('canSelectCard', () => {
    it('debe retornar true para cartas no volteadas', () => {
      expect(canSelectCard({ state: CARD_STATES.FACE_DOWN })).toBe(true);
      expect(canSelectCard({ state: CARD_STATES.SELECTED })).toBe(true);
      expect(canSelectCard({ state: CARD_STATES.MOVING_TO_END })).toBe(true);
    });

    it('debe retornar false para cartas volteadas', () => {
      expect(canSelectCard({ state: CARD_STATES.FLIPPED })).toBe(false);
    });
  });
});
