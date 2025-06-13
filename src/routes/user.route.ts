import { Router } from 'express';
import { Register, Login } from '../controllers/user.controller';
import { errorHandler } from '../middlewares/errorhandler';

const userRoutes:Router = Router();

userRoutes.post('/login', errorHandler(Login))
userRoutes.post('/register', errorHandler(Register));

export default userRoutes;