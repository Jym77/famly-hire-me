import { describe, it, expect } from 'vitest';
import { filterNurseries, filterPositions, type Nursery, type Position } from '../filters.js';

describe('Filter Utilities', () => {
  const mockNurseries: Nursery[] = [
    { id: 1, data: 'Sunnyside Daycare' },
    { id: 2, data: 'Green Garden Preschool' },
    { id: 3, data: 'Empty Nursery' },
  ];

  const mockPositions: Position[] = [
    { id: 1, nursery_id: 1, data: 'Lead Educator', status: 'open' },
    { id: 2, nursery_id: 1, data: 'Assistant Teacher', status: 'open' },
    { id: 3, nursery_id: 2, data: 'Center Manager', status: 'open' },
  ];

  describe('filterNurseries', () => {
    it('should return all nurseries when search is empty and filter is "all"', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], '');
      expect(result.length).toBe(3);
    });

    it('should filter by nursery name', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], 'Sunnyside');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });

    it('should filter by position title', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], 'Manager');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);
    });

    it('should filter by "has" vacancies', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], '', 'has');
      expect(result.length).toBe(2);
      expect(result.find(n => n.id === 3)).toBeUndefined();
    });

    it('should filter by "none" vacancies', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], '', 'none');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(3);
    });

    it('should handle combined search and vacancy filters', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], 'Sunnyside', 'has');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });

    it('should return empty array when no matches', () => {
      const result = filterNurseries(mockNurseries, mockPositions, [], 'Zylophone', 'all');
      expect(result.length).toBe(0);
    });
  });

  describe('filterPositions', () => {
    it('should return all positions when search is empty', () => {
      const result = filterPositions(mockPositions, mockNurseries, '');
      expect(result.length).toBe(3);
    });

    it('should filter by position title', () => {
      const result = filterPositions(mockPositions, mockNurseries, 'Educator');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(1);
    });

    it('should filter by nursery name', () => {
      const result = filterPositions(mockPositions, mockNurseries, 'Green Garden');
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(3);
    });

    it('should return empty array when no matches', () => {
      const result = filterPositions(mockPositions, mockNurseries, 'Unknown');
      expect(result.length).toBe(0);
    });
  });
});
