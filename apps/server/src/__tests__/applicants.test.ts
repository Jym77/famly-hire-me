import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../index.js';
import { createDatabase } from '../db.js';

describe('Applicants API', () => {
  let app: any;
  let db: any;

  beforeEach(() => {
    db = createDatabase();
    app = createApp(db);
  });

  describe('GET /applicants', () => {
    it('should block access without token', async () => {
      const res = await request(app).get('/applicants');
      expect(res.status).toBe(401);
    });

    it('should allow access with admin token', async () => {
      const res = await request(app).get('/applicants').query({ token: 'admin' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST /applicants', () => {
    it('should allow public creation', async () => {
      const res = await request(app).post('/applicants').send({ data: 'New Applicant' });
      expect(res.status).toBe(201);
      expect(res.body.data).toBe('New Applicant');
    });

    it('should return 400 for invalid input', async () => {
      const res = await request(app).post('/applicants').send({ data: 123 });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /applicants/:id', () => {
    it('should block update without token', async () => {
      const res = await request(app).patch('/applicants/1').send({ data: 'Updated' });
      expect(res.status).toBe(401);
    });

    it('should allow update with admin token', async () => {
      const res = await request(app).patch('/applicants/1').query({ token: 'admin' }).send({ data: 'Updated' });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /applicants/:id', () => {
    it('should block delete without token', async () => {
      const res = await request(app).delete('/applicants/1');
      expect(res.status).toBe(401);
    });

    it('should allow delete with admin token', async () => {
      const res = await request(app).delete('/applicants/1').query({ token: 'admin' });
      expect(res.status).toBe(200);
    });
  });
});
