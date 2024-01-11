import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { InitRouter } from './routers/index.js';
import cookieParser from 'cookie-parser';
const port = 5000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
InitRouter(app);

mongoose
  .connect(process.env.JWT_CONNECT_DB)
  .then(() => {
    console.log('Connect database successfully !');
  })
  .catch((err) => {
    console.log('Connect database failed', err);
  });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
