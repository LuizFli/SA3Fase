// routes.js
import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';

const router = express.Router();

router.get('/funcionarios', FuncionarioController.getFuncionario);
router.post('/funcionarios', FuncionarioController.postFuncionario);

export default router;
