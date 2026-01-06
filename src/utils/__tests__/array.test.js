import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fisherYatesShuffle, shuffleCards } from '../array';

describe('array utilities', () => {
  describe('fisherYatesShuffle', () => {
    it('debe retornar un array con la misma longitud', () => {
      const input = [1, 2, 3, 4, 5];
      const result = fisherYatesShuffle(input);

      expect(result).toHaveLength(input.length);
    });

    it('debe contener los mismos elementos', () => {
      const input = [1, 2, 3, 4, 5];
      const result = fisherYatesShuffle(input);

      expect(result.sort()).toEqual(input.sort());
    });

    it('no debe modificar el array original (inmutabilidad)', () => {
      const input = [1, 2, 3, 4, 5];
      const inputCopy = [...input];

      fisherYatesShuffle(input);

      expect(input).toEqual(inputCopy);
    });

    it('debe manejar arrays vacíos', () => {
      const result = fisherYatesShuffle([]);

      expect(result).toEqual([]);
    });

    it('debe manejar arrays de un elemento', () => {
      const input = [1];
      const result = fisherYatesShuffle(input);

      expect(result).toEqual([1]);
    });

    it('debe producir resultados diferentes en múltiples ejecuciones', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set();

      // Ejecutar múltiples veces y verificar que obtengamos diferentes resultados
      for (let i = 0; i < 10; i++) {
        results.add(JSON.stringify(fisherYatesShuffle(input)));
      }

      // Con 10 elementos, es muy improbable obtener el mismo orden 10 veces
      expect(results.size).toBeGreaterThan(1);
    });

    it('debe usar Math.random correctamente', () => {
      const randomSpy = vi.spyOn(Math, 'random');
      const input = [1, 2, 3, 4, 5];

      fisherYatesShuffle(input);

      expect(randomSpy).toHaveBeenCalled();

      randomSpy.mockRestore();
    });
  });

  describe('shuffleCards', () => {
    it('debe ser un alias de fisherYatesShuffle', () => {
      const input = [
        { id: '1', content: 'A' },
        { id: '2', content: 'B' },
        { id: '3', content: 'C' }
      ];

      const result = shuffleCards(input);

      expect(result).toHaveLength(input.length);
      expect(result.sort((a, b) => a.id.localeCompare(b.id)))
        .toEqual(input.sort((a, b) => a.id.localeCompare(b.id)));
    });

    it('no debe modificar los objetos de carta', () => {
      const input = [
        { id: '1', content: 'A', state: 'faceDown' },
        { id: '2', content: 'B', state: 'selected' }
      ];

      const result = shuffleCards(input);

      result.forEach(card => {
        const original = input.find(c => c.id === card.id);
        expect(card).toEqual(original);
      });
    });
  });
});
