import { Router } from 'express';
const ApiUsers = Router();

import * as controllers from '../controllers/authController.js';
import * as middleware from '../middleware/middlewareControllers.js';
// GET METHOD
ApiUsers.get('/getAllUsers', middleware.verifyToken, controllers.getAllUsers);
// POST METHOD
ApiUsers.post('/refreshToken', controllers.requestRefreshToken);
ApiUsers.post('/register', controllers.Register);
ApiUsers.post('/login', controllers.Login);
// PUT METHOD

// DELETE METHOD
ApiUsers.delete(
  '/deleteUser/:id',
  middleware.verifyTokenAndAdmin,
  controllers.deleteUser
);
export default ApiUsers;
