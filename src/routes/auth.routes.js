import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { validateRegistration } from '../middlewares/validation.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);

export default router;