import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import positionsRouter from './routes/positions.js';
import applicantsRouter from './routes/applicants.js';
import applicationsRouter from './routes/applications.js';
import nurseriesRouter from './routes/nurseries.js';
import { createDatabase, DB } from './db.js';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

export function createApp(db: DB) {
  const app = express();
  
  const allowedOrigins = [
    `${process.env.APPLICANT_URL}:${process.env.APPLICANT_PORT}`,
    `${process.env.MANAGER_URL}:${process.env.MANAGER_PORT}`
  ];

  app.use(cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

  app.use(express.json());
  
  // Store DB instance in app settings for access in routes
  app.set('db', db);

  // Mount Routes
  app.use('/positions', positionsRouter);
  app.use('/applicants', applicantsRouter);
  app.use('/applications', applicationsRouter);
  app.use('/nurseries', nurseriesRouter);

  return app;
}

const port = process.env.SERVER_PORT ?? 3000;

if (process.env.NODE_ENV !== 'test') {
  const db = createDatabase();
  const app = createApp(db);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export { createDatabase };
