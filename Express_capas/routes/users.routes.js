import express from 'express';
import { getUsers, createNewUser, getUserById } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/register', createNewUser);
router.get('/:id', getUserById);

export default router;
