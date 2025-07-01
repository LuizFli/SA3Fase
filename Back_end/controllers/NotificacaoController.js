import NotificacaoService from '../services/notificacoesService.js';

export default class NotificacaoController {
  static async getNotificacoes(req, res) {
    try {
      const { limite } = req.query;
      const notificacoes = await NotificacaoService.getNotificacoes(limite);
      res.status(200).json(notificacoes);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      res.status(500).json({
        erro: 'Erro ao buscar notificações',
        detalhes: error.message
      });
    }
  }

  static async marcarComoLida(req, res) {
    try {
      const { id } = req.params;
      const notificacao = await NotificacaoService.marcarComoLida(id);
      res.status(200).json(notificacao);
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      res.status(500).json({
        erro: 'Erro ao marcar notificação como lida',
        detalhes: error.message
      });
    }
  }

  static async marcarTodasComoLidas(req, res) {
    try {
      const resultado = await NotificacaoService.marcarTodasComoLidas();
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      res.status(500).json({
        erro: 'Erro ao marcar todas as notificações como lidas',
        detalhes: error.message
      });
    }
  }

  static async getContadorNaoLidas(req, res) {
    try {
      const total = await NotificacaoService.getNotificacaoesNaoLidas();
      res.status(200).json({ total });
    } catch (error) {
      console.error('Erro ao contar notificações não lidas:', error);
      res.status(500).json({
        erro: 'Erro ao contar notificações não lidas',
        detalhes: error.message
      });
    }
  }
}
