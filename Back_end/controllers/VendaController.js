import pool from "../database.js";

export default class VendaController {
  static async getVendas(req, res) {
    try {
      const { searchTerm, startDate, endDate, apenasAtivos } = req.query;

      // Construção da query base com tratamento de parâmetros
      let query = `
        SELECT 
          v.id,
          v.id_produto, 
          p.marca || ' ' || p.modelo as produto,  
          v.valor, 
          v.data, 
          v.identificador_vendedor,
          v.auth_code,
          f.nome as nome_vendedor,
          p.ativo as produto_ativo,
          f.ativo as vendedor_ativo
        FROM vendas v
        JOIN produtos p ON v.id_produto = p.id
        JOIN funcionarios f ON v.identificador_vendedor = f.identificador
        WHERE 1=1
      `;

      const params = [];

      // Filtro de busca geral
      if (searchTerm) {
        query += `
          AND (
            p.marca ILIKE $${params.length + 1} OR 
            p.modelo ILIKE $${params.length + 1} OR
            v.id_produto::text ILIKE $${params.length + 1} OR 
            v.identificador_vendedor ILIKE $${params.length + 1} OR
            v.auth_code ILIKE $${params.length + 1} OR
            f.nome ILIKE $${params.length + 1}
          )
        `;
        params.push(`%${searchTerm}%`);
      }

      // Filtro de data
      if (startDate) {
        query += ` AND v.data >= $${params.length + 1}`;
        params.push(new Date(startDate).toISOString());
      }

      if (endDate) {
        query += ` AND v.data <= $${params.length + 1}`;
        params.push(new Date(endDate).toISOString());
      }

      // Filtro para mostrar apenas vendas com produtos/vendedores ativos (se solicitado)
      if (apenasAtivos === 'true') {
        query += ` AND p.ativo = true AND f.ativo = true`;
      }

      // Ordenação padrão
      query += ` ORDER BY v.data DESC`;

      // Executar query
      const { rows } = await pool.query(query, params);

      // Verificar se há resultados
      if (!rows || rows.length === 0) {
        return res.status(200).json([]);
      }

      // Formatando a resposta para incluir informações de status
      const vendasFormatadas = rows.map(venda => ({
        ...venda,
        status: venda.produto_ativo && venda.vendedor_ativo ? 'ativo' : 'inativo',
        produto_status: venda.produto_ativo ? 'disponível' : 'vendido',
        vendedor_status: venda.vendedor_ativo ? 'ativo' : 'inativo'
      }));

      // Retornar os dados formatados
      res.status(200).json(vendasFormatadas);

    } catch (error) {
      console.error("Erro detalhado ao buscar vendas:", {
        error: error.message,
        stack: error.stack
      });

      res.status(500).json({
        erro: "Erro ao buscar vendas",
        detalhes: error.message
      });
    }
  }

  static async postVenda(req, res) {
    try {
      const { id_produto, valor, identificador_vendedor, auth_code } = req.body;
      if (!id_produto || !valor || !identificador_vendedor) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }
  
      // 1. Verificar se o produto existe
      const produto = await pool.query('SELECT * FROM produtos WHERE id = $1', [id_produto]);
      if (produto.rows.length === 0) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
  
      // 2. Verificar se o vendedor existe
      const vendedor = await pool.query(
        'SELECT * FROM funcionarios WHERE identificador = $1',
        [identificador_vendedor]
      );
  
      if (vendedor.rows.length === 0) {
        return res.status(404).json({ erro: "Vendedor não encontrado" });
      }
  
      // 3. Iniciar uma transação para garantir atomicidade
      await pool.query('BEGIN');
  
      try {
        // 4. Inserir a venda
        const novaVenda = await pool.query(
          `INSERT INTO vendas (
            id_produto, 
            valor, 
            data, 
            identificador_vendedor,
            auth_code
          ) VALUES (
            $1, $2, $3, $4, $5
          ) RETURNING *`,
          [
            id_produto,
            valor || produto.rows[0].valor,
            new Date().toISOString(),
            identificador_vendedor,
            auth_code || this.generateAuthCode()
          ]
        );
  
        // 5. Atualizar o status do produto para inativo (vendido)
        await pool.query(
          'UPDATE produtos SET ativo = false WHERE id = $1',
          [id_produto]
        );
  
        // 6. Confirmar a transação
        await pool.query('COMMIT');
  
        // 7. Retornar resposta enriquecida
        res.status(201).json({
          ...novaVenda.rows[0],
          produto: `${produto.rows[0].marca} ${produto.rows[0].modelo}`,
          nome_vendedor: vendedor.rows[0].nome
        });
  
      } catch (error) {
        // Em caso de erro, fazer rollback
        await pool.query('ROLLBACK');
        throw error;
      }
  
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      res.status(500).json({
        erro: "Erro ao cadastrar venda",
        detalhes: error.message
      });
    }
  }

  static generateAuthCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // Função auxiliar para formatar o nome do produto (opcional)
  static formatProdutoNome(produto) {
    return `${produto.marca} ${produto.modelo}` +
      (produto.ano ? ` ${produto.ano}` : '');
  }
  static async deleteAllVendas(req, res) {
    try {
      // Verificar se há autorização (opcional, mas recomendado)
      // if (!req.user || !req.user.isAdmin) {
      //   return res.status(403).json({ erro: "Acesso negado" });
      // }

      // Executar a query para deletar todas as vendas
      await pool.query('TRUNCATE TABLE vendas RESTART IDENTITY CASCADE');

      res.status(200).json({
        mensagem: "Todas as vendas foram removidas com sucesso",
        vendas_removidas: true
      });

    } catch (error) {
      console.error("Erro ao limpar vendas:", {
        error: error.message,
        stack: error.stack
      });

      res.status(500).json({
        erro: "Erro ao limpar vendas",
        detalhes: error.message
      });
    }
  }
  static async deleteVenda(req, res) {
    try {
      const { id } = req.params;
  
      // Iniciar transação
      await pool.query('BEGIN');
  
      // 1. Obter informações da venda (incluindo id_produto)
      const venda = await pool.query('SELECT * FROM vendas WHERE id = $1', [id]);
      if (venda.rows.length === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).json({ erro: "Venda não encontrada" });
      }
  
      const idProduto = venda.rows[0].id_produto;
  
      // 2. Deletar a venda
      await pool.query('DELETE FROM vendas WHERE id = $1', [id]);
  
      // 3. Atualizar o produto para ativo novamente
      await pool.query(
        'UPDATE produtos SET ativo = true WHERE id = $1',
        [idProduto]
      );
  
      // Confirmar transação
      await pool.query('COMMIT');
  
      res.status(200).json({
        mensagem: "Venda deletada com sucesso e produto reativado",
        venda_deletada: venda.rows[0],
        produto_reativado: idProduto
      });
  
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error("Erro ao deletar venda:", {
        error: error.message,
        stack: error.stack
      });
  
      res.status(500).json({
        erro: "Erro ao deletar venda",
        detalhes: error.message
      });
    }
  }
}

