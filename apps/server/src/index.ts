import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import positionsRouter from './routes/positions.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT ?? 3000;

// Mount Routes
app.use('/positions', positionsRouter);

// Export app for testing
export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
