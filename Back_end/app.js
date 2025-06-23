// routes.js
import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';
import VendasController from './controllers/VendaController.js';

const router = express.Router();

router.get('/', FuncionarioController.getFuncionarios);
router.post('/', FuncionarioController.postFuncionario);
router.put('/:id', FuncionarioController.putFuncionario);
router.delete('/:id', FuncionarioController.deleteFuncionario);

// Vendas
router.get('/vendas', VendasController.getVendas);
router.post('/vendas', VendasController.postVenda);


export default router;
