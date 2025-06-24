// routes.js
import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';
import VendasController from './controllers/VendaController.js';

const router = express.Router();

router.get('/funcionarios', FuncionarioController.getFuncionarios);
router.post('/funcionarios', FuncionarioController.postFuncionario);
router.put('/funcionarios/:id', FuncionarioController.putFuncionario);
router.delete('/funcionarios/:id', FuncionarioController.deleteFuncionario);

// Vendas
router.get('/vendas', VendasController.getVendas);
router.post('/vendas', VendasController.postVenda);
router.delete('/vendas', VendasController.deleteAllVendas)


export default router;
