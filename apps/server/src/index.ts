import express from 'express';
import { db } from 'db';

const app = express();
const port = process.env.PORT ?? 3000;

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
