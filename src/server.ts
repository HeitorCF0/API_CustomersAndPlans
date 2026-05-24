import express, { type Request, type Response } from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'API_web',
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});