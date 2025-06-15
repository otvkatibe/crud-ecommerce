import { Router } from 'express';
import authRoutes from './auth.routes';
import productsRoutes from './product.routes';

const RootRouter: Router = Router()

RootRouter.use('/auth', authRoutes)
RootRouter.use('/products', productsRoutes);

export default RootRouter;