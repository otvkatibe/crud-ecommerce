import { Router } from 'express';
import { errorHandler } from '../errorhandler';
import { createProduct, updateProduct, deleteProduct, listProducts, getProductbyId } from '../controllers/products.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin';

const productsRoutes: Router = Router()

productsRoutes.post('/', [authMiddleware, adminMiddleware], errorHandler(createProduct))
productsRoutes.put('/:id', [authMiddleware, adminMiddleware], errorHandler(updateProduct))
productsRoutes.delete('/:id', [authMiddleware, adminMiddleware], errorHandler(deleteProduct))
productsRoutes.get('/', [authMiddleware, adminMiddleware], errorHandler(listProducts))
productsRoutes.get('/:id', [authMiddleware, adminMiddleware], errorHandler(getProductbyId))

export default productsRoutes;