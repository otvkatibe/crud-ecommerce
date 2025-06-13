import { Router } from 'express';
import { Register, Login, me } from '../controllers/user.controller';
import { errorHandler } from '../errorhandler';
import authMiddleware from '../middlewares/auth';

const userRoutes:Router = Router();

userRoutes.post('/login', errorHandler(Login))
userRoutes.post('/register', errorHandler(Register));
userRoutes.get('/me', [authMiddleware], errorHandler(me));

export default userRoutes;