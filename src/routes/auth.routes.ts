import { Router } from 'express';
import { login, register, me } from '../controllers/auth.controller';
import { errorHandler } from '../errorhandler';
import { authMiddleware } from '../middlewares/auth.middleware';

const authRoutes: Router = Router()

authRoutes.post('/login', errorHandler(login))
authRoutes.post('/register', errorHandler(register))
authRoutes.get('/me', [authMiddleware], errorHandler(me))

export default authRoutes