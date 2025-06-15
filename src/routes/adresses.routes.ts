import { Router } from 'express';
import { errorHandler } from '../errorhandler';
import { addAddress, deleteAddress, listAdresses } from '../controllers/adresses.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const adressesRoutes: Router = Router();

adressesRoutes.post('/', [authMiddleware], errorHandler(addAddress));
adressesRoutes.delete('/:id', [authMiddleware], errorHandler(deleteAddress));
adressesRoutes.get('/', [authMiddleware], errorHandler(listAdresses));

export default adressesRoutes;