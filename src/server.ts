import express, { type Request, type Response } from 'express';
import mysql from 'mysql2/promise';
import { UserControle } from './controle/user.controle';

const app = express();

app.use(express.json());

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'API_web',
});

app.post('/User', async (req: Request, res: Response) => {
  const userControle = new UserControle();
  await userControle.create(req, res);
});

app.get('/User', async (req: Request, res: Response) => {
  const userControle = new UserControle();
  await userControle.searchAll(req, res);
});

app.get('/User/:id', async (req: Request, res: Response) => {
  const userControle = new UserControle();
  await userControle.searchById(req, res);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});