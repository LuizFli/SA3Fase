import express from 'express';
import AdminAuthController from '../controllers/adminAuthController.js';

const router = express.Router();

// Rota de login para admin
router.post('/admin/login', AdminAuthController.login);

// Rota para verificar token (opcional)
router.get('/admin/verify', AdminAuthController.verify);

export default router;