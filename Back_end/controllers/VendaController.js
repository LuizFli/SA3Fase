
import VendaService from '../services/vendasServices.js'

export default class VendaController {
  static async getVendas(req, res) {
    try {
      const vendas = await VendaService.getVendas(req.query);
      res.status(200).json(vendas);
    } catch (error) {
      console.error("Erro detalhado ao buscar vendas:", error);
      res.status(500).json({
        erro: "Erro ao buscar vendas",
        detalhes: error.message
      });
    }
  }

  static async postVenda(req, res) {
    try {
      const novaVenda = await VendaService.createVenda(req.body);
      res.status(201).json(novaVenda);
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      const status = error.message.includes("não encontrad") ? 404 : 500;
      res.status(status).json({
        erro: "Erro ao cadastrar venda",
        detalhes: error.message
      });
    }
  }

  static async deleteAllVendas(req, res) {
    try {
      await VendaService.deleteAllVendas();
      res.status(200).json({
        mensagem: "Todas as vendas foram removidas com sucesso",
        vendas_removidas: true
      });
    } catch (error) {
      console.error("Erro ao limpar vendas:", error);
      res.status(500).json({
        erro: "Erro ao limpar vendas",
        detalhes: error.message
      });
    }
  }

  static async deleteVenda(req, res) {
    try {
      const result = await VendaService.deleteVenda(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      const status = error.message.includes("não encontrad") ? 404 : 500;
      res.status(status).json({
        erro: "Erro ao deletar venda",
        detalhes: error.message
      });
    }
  }
}