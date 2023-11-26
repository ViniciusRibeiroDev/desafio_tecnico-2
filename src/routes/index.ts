import { verifyEmailExits } from '../middleware/usuario/veriftEmailExist.middleware';
import { createUserController } from '../controllers/usuario/createUser.controller';
import { validationBodyMiddleware } from '../middleware/validartionBody.middleware';
import { verifyUserExist } from '../middleware/usuario/verifyUserExist.middleware';
import { findUserController } from '../controllers/usuario/findUser.controller';
import { loginController } from '../controllers/login /login.controller';
import { verifyLogin } from '../middleware/login/verifyLogin.middleware';
import { usuarioRequestSchema } from '../schemas/usuario.schema';
import { loginSchema } from '../schemas/login.schema';
import { Router } from 'express';

export const usuarioRoute = Router();

usuarioRoute.post(
  '',
  validationBodyMiddleware(usuarioRequestSchema),
  verifyEmailExits,
  createUserController
);
usuarioRoute.post(
  '/login',
  validationBodyMiddleware(loginSchema),
  verifyLogin,
  loginController
);
usuarioRoute.get('', verifyUserExist, findUserController);
