import { Router, Request, Response } from 'express';
import { DB } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

const getDb = (req: Request): DB => {
  return req.app.get('db');
};

// GET /applications - List all applications (Admin only)
router.get('/', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const applications = db.prepare('SELECT * FROM applications').all();
    res.json(applications);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /applications/:id - Get specific application (Admin only)
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /applications - Create new application (Public)
router.post('/', (req, res) => {
  try {
    const db = getDb(req);
    const { position_id, applicant_id, data } = req.body;
    if (typeof position_id !== 'number' || typeof applicant_id !== 'number' || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: position_id and applicant_id must be numbers, data must be string' });
    }
    const result = db.prepare('INSERT INTO applications (position_id, applicant_id, data) VALUES (?, ?, ?)').run(position_id, applicant_id, data);
    res.status(201).json({ id: result.lastInsertRowid, position_id, applicant_id, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /applications/:id - Update application data/status (Admin only)
router.patch('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const { data, status } = req.body;
    
    if (data !== undefined && typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: data must be a string' });
    }
    if (status !== undefined && typeof status !== 'string') {
      return res.status(400).json({ error: 'Invalid input: status must be a string' });
    }
    if (data === undefined && status === undefined) {
      return res.status(400).json({ error: 'No update fields provided' });
    }

    let query = 'UPDATE applications SET ';
    const params: any[] = [];
    if (data !== undefined) {
      query += 'data = ?, ';
      params.push(data);
    }
    if (status !== undefined) {
      query += 'status = ?, ';
      params.push(status);
    }
    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(req.params.id);

    const result = db.prepare(query).run(...params);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /applications/:id - Delete application (Admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const result = db.prepare('DELETE FROM applications WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
