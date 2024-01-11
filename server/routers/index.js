import { Router } from 'express';
// const router = Router();
import UserApi from './ApiUsers.js';

export const InitRouter = (app) => {
  //   app.use('/', router);
  app.use('/', UserApi);
};
