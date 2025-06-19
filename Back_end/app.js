// routes.js
import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';
import VendasController from './controllers/VendaController.js';

const router = express.Router();

router.get('/funcionarios', FuncionarioController.getFuncionario);
router.post('/funcionarios', FuncionarioController.postFuncionario);
// Vendas
router.get('/vendas', VendasController.getVendas);
router.post('/vendas', VendasController.postVenda);


export default router;
