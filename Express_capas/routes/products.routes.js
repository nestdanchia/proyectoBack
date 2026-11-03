import express from 'express';
import { getProducts, createNewProduct } from '../controllers/products.controller.js';

const router = express.Router();
//router.get('/') interno de productos se transforma en GET /api/products
router.get('/', getProducts);
router.post('/register', createNewProduct);

export default router;
