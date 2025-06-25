import express from 'express';
import FuncionarioController from './controllers/FuncionarioController.js';
import VendasController from './controllers/VendaController.js';
import ProdutoController from './controllers/ProdutoController.js'; // Importa o ProdutoController

const router = express.Router();

// Rotas para Funcionários
router.get('/funcionarios', FuncionarioController.getFuncionarios);
router.post('/funcionarios', FuncionarioController.postFuncionario);
router.put('/funcionarios/:id', FuncionarioController.putFuncionario);
router.delete('/funcionarios/:id', FuncionarioController.deleteFuncionario);

// Rotas para Vendas
router.get('/vendas', VendasController.getVendas);
router.post('/vendas', VendasController.postVenda);
// Adicione rotas PUT e DELETE para vendas aqui, se necessário.

// Rotas para Produtos
router.get('/produtos', ProdutoController.getProdutos);       // Listar todos os produtos
router.post('/produtos', ProdutoController.postProduto);     // Cadastrar novo produto
router.put('/produtos/:id', ProdutoController.putProduto);   // Atualizar produto por ID
router.delete('/produtos/:id', ProdutoController.deleteProduto); // Excluir produto por ID


export default router;
