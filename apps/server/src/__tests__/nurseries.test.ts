import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../index.js';
import { createDatabase } from '../db.js';

describe('Nurseries API', () => {
  let app: any;
  let db: any;

  beforeEach(() => {
    db = createDatabase();
    app = createApp(db);
  });

  describe('GET /nurseries', () => {
    it('should return all nurseries', async () => {
      const res = await request(app).get('/nurseries');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(5);
    });

    it('should return a specific nursery by id', async () => {
      const res = await request(app).get('/nurseries/1');
      expect(res.status).toBe(200);
      expect(res.body.data).toBe('Sunnyside Daycare');
    });

    it('should return 404 for non-existent nursery', async () => {
      const res = await request(app).get('/nurseries/999');
      expect(res.status).toBe(404);
    });
  });
});
