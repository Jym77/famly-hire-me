import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../index.js';
import { createDatabase } from '../db.js';

describe('Applications API', () => {
  let app: any;
  let db: any;

  beforeEach(() => {
    db = createDatabase();
    app = createApp(db);
  });

  describe('GET /applications', () => {
    it('should block access without token', async () => {
      const res = await request(app).get('/applications');
      expect(res.status).toBe(401);
    });

    it('should allow access with admin token', async () => {
      const res = await request(app).get('/applications').query({ token: 'admin' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(3);
    });
  });

  describe('POST /applications', () => {
    it('should allow public creation', async () => {
      const res = await request(app).post('/applications').send({ 
        position_id: 1, 
        applicant_id: 1, 
        data: 'New App' 
      });
      expect(res.status).toBe(201);
      expect(res.body.position_id).toBe(1);
    });

    it('should return 400 for invalid input', async () => {
      const res = await request(app).post('/applications').send({ 
        position_id: 'one', 
        applicant_id: 1, 
        data: 'New App' 
      });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /applications/:id', () => {
    it('should block update without token', async () => {
      const res = await request(app).patch('/applications/1').send({ status: 'reviewed' });
      expect(res.status).toBe(401);
    });

    it('should allow update with admin token', async () => {
      const res = await request(app).patch('/applications/1').query({ token: 'admin' }).send({ status: 'reviewed' });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /applications/:id', () => {
    it('should block delete without token', async () => {
      const res = await request(app).delete('/applications/1');
      expect(res.status).toBe(401);
    });

    it('should allow delete with admin token', async () => {
      const res = await request(app).delete('/applications/1').query({ token: 'admin' });
      expect(res.status).toBe(200);
    });
  });
});
