import express from 'express';
import { getProducts, createNewProduct } from '../controllers/products.controller.js';

const router = express.Router();

// Rutas relativas al punto de montaje (/api/products en index.js)
router.get('/', getProducts);
router.post('/register', createNewProduct);

export default router;
