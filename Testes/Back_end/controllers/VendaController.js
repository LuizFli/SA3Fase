import VendaService from '../services/vendasServices.js';

export default class VendaController {
  static async getVendas(req, res) {
    try {
      const vendas = await VendaService.getVendas(req.query);
      res.status(200).json(vendas);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error.message);
      res.status(500).json({ erro: 'Erro ao buscar vendas' });
    }
  }

  static async postVenda(req, res) {
    try {
      const novaVenda = await VendaService.createVenda(req.body);
      res.status(201).json(novaVenda);
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error.message);
      const status = error.message.includes('não encontrado') || error.message.includes('inativo') ? 500 : 400;
      res.status(status).json({
        erro: 'Erro ao cadastrar venda',
        mensagem: error.message,
      });
    }
  }

  static async deleteAllVendas(req, res) {
    try {
      const result = await VendaService.deleteAllVendas();
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao deletar todas as vendas:', error.message);
      res.status(500).json({ erro: 'Erro ao deletar todas as vendas' });
    }
  }

  static async deleteVenda(req, res) {
    try {
      const result = await VendaService.deleteVenda(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Erro ao deletar venda:', error.message);
      const status = error.message.includes('não encontrada') ? 404 : 500;
      res.status(status).json({
        erro: 'Erro ao deletar venda',
        mensagem: error.message,
      });
    }
  }
}