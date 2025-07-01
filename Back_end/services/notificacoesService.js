import pool from '../database.js';

export default class NotificacaoService {
  static async criarNotificacao(tipo, titulo, descricao, dados_extras = {}) {
    try {
      const query = `
        INSERT INTO notificacoes (tipo, titulo, descricao, dados_extras, lida, created_at)
        VALUES ($1, $2, $3, $4, false, $5)
        RETURNING *
      `;
      
      const { rows } = await pool.query(query, [
        tipo,
        titulo,
        descricao,
        JSON.stringify(dados_extras),
        new Date().toISOString()
      ]);

      return rows[0];
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      throw error;
    }
  }

  static async getNotificacoes(limite = 50) {
    try {
      const query = `
        SELECT * FROM notificacoes 
        ORDER BY created_at DESC 
        LIMIT $1
      `;
      
      const { rows } = await pool.query(query, [limite]);
      
      return rows.map(notificacao => ({
        ...notificacao,
        dados_extras: typeof notificacao.dados_extras === 'string' 
          ? JSON.parse(notificacao.dados_extras) 
          : notificacao.dados_extras
      }));
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw error;
    }
  }

  static async marcarComoLida(id) {
    try {
      const query = `
        UPDATE notificacoes 
        SET lida = true, updated_at = $1
        WHERE id = $2
        RETURNING *
      `;
      
      const { rows } = await pool.query(query, [new Date().toISOString(), id]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      throw error;
    }
  }

  static async marcarTodasComoLidas() {
    try {
      const query = `
        UPDATE notificacoes 
        SET lida = true, updated_at = $1
        WHERE lida = false
      `;
      
      await pool.query(query, [new Date().toISOString()]);
      return { mensagem: 'Todas as notificações foram marcadas como lidas' };
    } catch (error) {
      console.error('Erro ao marcar todas as notificações como lidas:', error);
      throw error;
    }
  }

  static async getNotificacaoesNaoLidas() {
    try {
      const query = `
        SELECT COUNT(*) as total FROM notificacoes 
        WHERE lida = false
      `;
      
      const { rows } = await pool.query(query);
      return parseInt(rows[0].total);
    } catch (error) {
      console.error('Erro ao contar notificações não lidas:', error);
      throw error;
    }
  }

  // Métodos específicos para cada tipo de cadastro
  static async notificarCadastroFuncionario(funcionario) {
    const titulo = 'Novo Funcionário Cadastrado';
    const descricao = `${funcionario.nome} foi cadastrado como ${funcionario.cargo}`;
    const dados_extras = {
      funcionario_id: funcionario.id,
      identificador: funcionario.identificador,
      cargo: funcionario.cargo,
      email: funcionario.email
    };

    return await this.criarNotificacao('funcionario', titulo, descricao, dados_extras);
  }

  static async notificarCadastroProduto(produto) {
    const titulo = 'Novo Produto Cadastrado';
    const descricao = `${produto.marca} ${produto.modelo} (${produto.placa}) foi adicionado ao estoque`;
    const dados_extras = {
      produto_id: produto.id,
      marca: produto.marca,
      modelo: produto.modelo,
      placa: produto.placa,
      valor: produto.valor
    };

    return await this.criarNotificacao('produto', titulo, descricao, dados_extras);
  }

  static async notificarCadastroVenda(venda) {
    const titulo = 'Nova Venda Realizada';
    const descricao = `Venda de ${venda.produto} por ${venda.nome_vendedor} - R$ ${Number(venda.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const dados_extras = {
      venda_id: venda.id,
      produto: venda.produto,
      vendedor: venda.nome_vendedor,
      valor: venda.valor,
      auth_code: venda.auth_code
    };

    return await this.criarNotificacao('venda', titulo, descricao, dados_extras);
  }
}
