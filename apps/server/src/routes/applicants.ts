import { Router, Request, Response } from 'express';
import { DB } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

const getDb = (req: Request): DB => {
  return req.app.get('db');
};

// GET /applicants - List all applicants (Admin only)
router.get('/', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const applicants = db.prepare('SELECT * FROM applicants').all();
    res.json(applicants);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /applicants/:id - Get specific applicant (Admin only)
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const applicant = db.prepare('SELECT * FROM applicants WHERE id = ?').get(req.params.id);
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /applicants - Create new applicant (Public)
router.post('/', (req, res) => {
  try {
    const db = getDb(req);
    const { data } = req.body;
    if (typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: data must be a string' });
    }
    const result = db.prepare('INSERT INTO applicants (data) VALUES (?)').run(data);
    res.status(201).json({ id: result.lastInsertRowid, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /applicants/:id - Update applicant data (Admin only)
router.patch('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const { data } = req.body;
    if (typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: data must be a string' });
    }
    const result = db.prepare('UPDATE applicants SET data = ? WHERE id = ?').run(data, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json({ message: 'Applicant updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /applicants/:id - Delete applicant (Admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const result = db.prepare('DELETE FROM applicants WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json({ message: 'Applicant deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
