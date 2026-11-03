import express from 'express';
import { getUsers, createNewUser, getUserById } from '../controllers/users.controller.js';

const router = express.Router();

// Rutas relativas al punto de montaje (/api/users en index.js)
// Los handlers son async, pero las definiciones del router son iguales.
router.get('/', getUsers);
router.post('/register', createNewUser);
router.get('/:id', getUserById);

export default router;
