import { Router, Request, Response } from 'express';
import { DB } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = Router();

const getDb = (req: Request): DB => {
  return req.app.get('db');
};

// GET /positions - List all positions
router.get('/', (req, res) => {
  try {
    const db = getDb(req);
    const positions = db.prepare('SELECT * FROM positions').all();
    res.json(positions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /positions/:id - Get specific position
router.get('/:id', (req, res) => {
  try {
    const db = getDb(req);
    const position = db.prepare('SELECT * FROM positions WHERE id = ?').get(req.params.id);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json(position);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /positions - Create new position (Admin only)
router.post('/', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const { nursery_id, data } = req.body;
    if (typeof nursery_id !== 'number' || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: nursery_id must be number and data must be string' });
    }
    const result = db.prepare('INSERT INTO positions (nursery_id, data) VALUES (?, ?)').run(nursery_id, data);
    res.status(201).json({ id: result.lastInsertRowid, nursery_id, data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /positions/:id - Update status (Admin only)
router.patch('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const { status } = req.body;
    if (typeof status !== 'string') {
      return res.status(400).json({ error: 'Invalid input: status must be a string' });
    }
    const result = db.prepare('UPDATE positions SET status = ? WHERE id = ?').run(status, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json({ message: 'Position status updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /positions/:id - Delete position (Admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDb(req);
    const result = db.prepare('DELETE FROM positions WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json({ message: 'Position deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
