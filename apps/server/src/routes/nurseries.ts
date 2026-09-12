import { Router, Request, Response } from 'express';
import { DB } from '../db.js';

const router = Router();

const getDb = (req: Request): DB => {
  return req.app.get('db');
};

// GET /nurseries - List all nurseries (Public)
router.get('/', (req, res) => {
  try {
    const db = getDb(req);
    const nurseries = db.prepare('SELECT * FROM nurseries').all();
    res.json(nurseries);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /nurseries/:id - Get specific nursery (Public)
router.get('/:id', (req, res) => {
  try {
    const db = getDb(req);
    const nursery = db.prepare('SELECT * FROM nurseries WHERE id = ?').get(req.params.id);
    if (!nursery) {
      return res.status(404).json({ error: 'Nursery not found' });
    }
    res.json(nursery);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
