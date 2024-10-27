import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function getStatsData() {
  await client.connect();
  const database = client.db('stats');
  const stats = database.collection('stats');
  return await stats.findOne();
}

app.get('/api/stats', async (req, res) => {
  try {
    const data = await getStatsData();
    res.json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/stats/download', async (req, res) => {
  try {
    const data = await getStatsData();
    const json = JSON.stringify(data, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=stats.json');
    res.status(200).send(json);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {});
