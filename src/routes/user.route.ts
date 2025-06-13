import { Router } from 'express';
import { Register, Login } from '../controllers/user.controller';

const userRoutes:Router = Router();

userRoutes.post('/login', Login)
userRoutes.post('/register', Register);

export default userRoutes;