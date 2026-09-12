import express from 'express';
import { db } from 'db';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const serverPort = process.env.SERVER_PORT;
const serverUrl = process.env.SERVER_URL;

if (!serverPort || !serverUrl) {
  console.error('❌ Missing required environment variables: SERVER_PORT and SERVER_URL must be defined in the environment.');
  process.exit(1);
}

const app = express();
const port = parseInt(serverPort);

app.get('/', (req, res) => {
  res.send('Job Portal API is running!');
});

app.get('/nurseries', (req, res) => {
  const nurseries = db.prepare('SELECT * FROM nurseries').all();
  res.json(nurseries);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
