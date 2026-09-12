import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../index.js';
import { createDatabase } from '../db.js';

describe('Positions API', () => {
  let app: any;
  let db: any;

  beforeEach(() => {
    // Create a fresh DB and App instance for every single test
    db = createDatabase();
    app = createApp(db);
  });

  describe('GET /positions', () => {
    it('should return all positions', async () => {
      const res = await request(app).get('/positions');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(7);
    });

    it('should return a specific position by id', async () => {
      const res = await request(app).get('/positions/1');
      expect(res.status).toBe(200);
      expect(res.body.data).toBe('Lead Educator');
    });

    it('should return 404 for non-existent position', async () => {
      const res = await request(app).get('/positions/999');
      expect(res.status).toBe(404);
    });
  });

  describe('Auth & Access Control', () => {
    it('should block POST without token', async () => {
      const res = await request(app).post('/positions').send({ nursery_id: 1, data: 'New' });
      expect(res.status).toBe(401);
    });

    it('should block POST with invalid token', async () => {
      const res = await request(app).post('/positions').query({ token: 'wrong' }).send({ nursery_id: 1, data: 'New' });
      expect(res.status).toBe(401);
    });

    it('should allow POST with admin token', async () => {
      const res = await request(app).post('/positions').query({ token: 'admin' }).send({ nursery_id: 1, data: 'New' });
      expect(res.status).toBe(201);
    });
  });

  describe('Input Sanitation & Validation', () => {
    it('should return 400 for invalid input types on POST', async () => {
      const res = await request(app)
        .post('/positions')
        .query({ token: 'admin' })
        .send({ nursery_id: 'not-a-number', data: 123 });
      expect(res.status).toBe(400);
    });

    it('should return 400 for invalid status type on PATCH', async () => {
      const res = await request(app)
        .patch('/positions/1')
        .query({ token: 'admin' })
        .send({ status: 123 });
      expect(res.status).toBe(400);
    });
  });

  describe('CRUD Operations', () => {
    it('should create a new position', async () => {
      const res = await request(app)
        .post('/positions')
        .query({ token: 'admin' })
        .send({ nursery_id: 1, data: 'New Position' });
      expect(res.status).toBe(201);
      expect(res.body.data).toBe('New Position');
    });

    it('should update position status', async () => {
      const res = await request(app)
        .patch('/positions/1')
        .query({ token: 'admin' })
        .send({ status: 'closed' });
      expect(res.status).toBe(200);
      
      const check = await request(app).get('/positions/1');
      expect(check.body.status).toBe('closed');
    });

    it('should delete a position', async () => {
      const res = await request(app)
        .delete('/positions/1')
        .query({ token: 'admin' });
      expect(res.status).toBe(200);
      
      const check = await request(app).get('/positions/1');
      expect(check.status).toBe(404);
    });
  });
});
