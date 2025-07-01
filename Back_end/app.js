// app.js ou routes.js
import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';
import VendasController from './controllers/VendaController.js';
import ProdutoController from './controllers/ProdutoController.js';
import AuthController from './controllers/AuthController.js';



const router = express.Router();

// router.use(adminAuthRoutes);

// Login
router.post('/auth/login', AuthController.login);

// Rotas para Funcionários
router.get('/funcionarios', FuncionarioController.getFuncionarios);
router.get('/funcionarios/:id', FuncionarioController.getFuncionarioById); 
router.post('/funcionarios', FuncionarioController.postFuncionario);
router.put('/funcionarios/:id', FuncionarioController.putFuncionario);
router.put('/funcionarios/:id/toggle-status', FuncionarioController.toggleStatusFuncionario);

// Rotas para Vendas
router.get('/vendas', VendasController.getVendas);
router.post('/vendas', VendasController.postVenda);
router.delete('/vendas', VendasController.deleteAllVendas);
router.delete('/vendas/:id', VendasController.deleteVenda);

// Rotas para Produtos
router.get('/produtos', ProdutoController.getProdutos);
router.post('/produtos', ProdutoController.postProduto);
router.put('/produtos/:id', ProdutoController.putProduto);
router.delete('/produtos/:id', ProdutoController.deleteProduto);
router.put('/produtos/:id/status', ProdutoController.atualizarStatusProduto);

export default router;
