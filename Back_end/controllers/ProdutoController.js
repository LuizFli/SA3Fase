import pool from "../database.js";

export default class ProdutoController {
  static async getProdutos(req, res) {
    try {
      const { searchTerm, id, page = 1, pageSize = 10 } = req.query;

      let baseSelectQuery = `SELECT id, placa, marca, modelo, km, cor, valor, ano, ativo FROM produtos`;
      let baseCountQuery = `SELECT COUNT(*) FROM produtos`;

      const whereClauses = [];
      const params = [];
      let paramIndex = 1;

      if (id) {
        whereClauses.push(`id = $${paramIndex}`);
        params.push(parseInt(id));
        paramIndex++;
      } else if (searchTerm) {
        whereClauses.push(`(placa ILIKE $${paramIndex} OR marca ILIKE $${paramIndex} OR modelo ILIKE $${paramIndex} OR cor ILIKE $${paramIndex})`);
        params.push(`%${searchTerm}%`);
        paramIndex++;
      }

      let fullWhereClause = whereClauses.length > 0 ? ` WHERE ` + whereClauses.join(' AND ') : '';

      // Query de contagem
      const countResult = await pool.query(baseCountQuery + fullWhereClause, params);
      const total = parseInt(countResult.rows[0].count);

      // Query principal com paginação
      let fullQuery = baseSelectQuery + fullWhereClause + ` ORDER BY id ASC`;
      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      fullQuery += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(parseInt(pageSize), offset);

      const produtosResult = await pool.query(fullQuery, params);

      // Garante que produtos seja sempre um array, mesmo quando vazio
      const produtos = produtosResult.rows || [];

      res.status(200).json({
        produtos, // Array garantido
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      // Retorna array vazio em caso de erro
      res.status(500).json({
        produtos: [], // Array vazio mesmo em erro
        total: 0,
        erro: "Erro interno do servidor ao buscar produtos.",
        detalhes: error.message
      });
    }
  }
  static async postProduto(req, res) {
    try {
      const { placa, marca, modelo, km, cor, valor, ano } = req.body;

      if (!placa || !marca || !modelo || !km || !cor || !valor || !ano) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
      }

      const newProduct = await pool.query(
        `INSERT INTO produtos (placa, marca, modelo, km, cor, valor, ano)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [placa, marca, modelo, parseInt(km), cor, parseFloat(valor), parseInt(ano)] // Conversão de tipo explícita
      );

      res.status(201).json(newProduct.rows[0]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      res.status(500).json({ erro: "Erro interno do servidor ao cadastrar produto.", detalhes: error.message });
    }
  }

  static async putProduto(req, res) {
    try {
      const { id } = req.params;
      const { placa, marca, modelo, km, cor, valor, ano } = req.body;

      let query = `UPDATE produtos SET`;
      const params = [];
      let paramIndex = 1;

      if (placa !== undefined) { query += ` placa = $${paramIndex},`; params.push(placa); paramIndex++; }
      if (marca !== undefined) { query += ` marca = $${paramIndex},`; params.push(marca); paramIndex++; }
      if (modelo !== undefined) { query += ` modelo = $${paramIndex},`; params.push(modelo); paramIndex++; }
      if (km !== undefined) { query += ` km = $${paramIndex},`; params.push(parseInt(km)); paramIndex++; } // Conversão de tipo explícita
      if (cor !== undefined) { query += ` cor = $${paramIndex},`; params.push(cor); paramIndex++; }
      if (valor !== undefined) { query += ` valor = $${paramIndex},`; params.push(parseFloat(valor)); paramIndex++; } // Conversão de tipo explícita
      if (ano !== undefined) { query += ` ano = $${paramIndex},`; params.push(parseInt(ano)); paramIndex++; } // Conversão de tipo explícita

      if (paramIndex === 1) {
        return res.status(400).json({ erro: "Nenhum dado fornecido para atualização." });
      }

      query = query.slice(0, -1) + ` WHERE id = $${paramIndex} RETURNING *`;
      params.push(id);

      const updatedProduct = await pool.query(query, params);

      if (updatedProduct.rows.length === 0) {
        return res.status(404).json({ erro: "Produto não encontrado para atualização." });
      }

      res.status(200).json(updatedProduct.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).json({ erro: "Erro interno do servidor ao atualizar produto.", detalhes: error.message });
    }
  }

  static async deleteProduto(req, res) {
    try {
      const { id } = req.params;

      const deletedProduct = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);

      if (deletedProduct.rows.length === 0) {
        return res.status(404).json({ erro: "Produto não encontrado para exclusão." });
      }

      res.status(200).json({ mensagem: "Produto excluído com sucesso!", produto: deletedProduct.rows[0] });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      // Verifica se o erro é uma violação de chave estrangeira (código SQLSTATE 23503)
      if (error.code === '23503') {
        return res.status(409).json({ // Retorna 409 Conflict
          erro: "Conflito de exclusão",
          detalhes: "Não é possível excluir este produto porque ele está associado a vendas existentes. Remova as vendas primeiro ou desative o produto."
        });
      }
      res.status(500).json({ erro: "Erro interno do servidor ao excluir produto.", detalhes: error.message });
    }
  }
  static async postVenda(req, res) {
    try {
      const { id_produto, valor, identificador_vendedor, auth_code } = req.body;
      
      // Validação básica dos dados
      if (!id_produto || !valor || !identificador_vendedor) {
        return res.status(400).json({ erro: "Dados incompletos" });
      }
  
      // 1. Verificar se o produto existe e está ativo
      const produto = await pool.query(
        'SELECT * FROM produtos WHERE id = $1 AND ativo = true', 
        [id_produto]
      );
      
      if (produto.rows.length === 0) {
        return res.status(404).json({ 
          erro: "Produto não encontrado ou já vendido" 
        });
      }
  
      // 2. Verificar se o vendedor existe e está ativo
      const vendedor = await pool.query(
        `SELECT * FROM funcionarios 
         WHERE identificador = $1 AND ativo = true`,
        [identificador_vendedor]
      );
  
      if (vendedor.rows.length === 0) {
        return res.status(404).json({ 
          erro: "Vendedor não encontrado ou inativo" 
        });
      }
  
      // Iniciar transação
      await pool.query('BEGIN');
  
      try {
        // 3. Inserir a venda
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
  
        // 4. Atualizar o produto para inativo
        await pool.query(
          'UPDATE produtos SET ativo = false WHERE id = $1',
          [id_produto]
        );
  
        // Commit da transação
        await pool.query('COMMIT');
  
        // 5. Retornar resposta enriquecida
        res.status(201).json({
          ...novaVenda.rows[0],
          produto: `${produto.rows[0].marca} ${produto.rows[0].modelo}`,
          nome_vendedor: vendedor.rows[0].nome,
          mensagem: "Venda cadastrada com sucesso e produto marcado como vendido"
        });
  
      } catch (error) {
        // Rollback em caso de erro
        await pool.query('ROLLBACK');
        throw error;
      }
  
    } catch (error) {
      console.error("Erro ao cadastrar venda:", {
        message: error.message,
        stack: error.stack
      });
      
      res.status(500).json({
        erro: "Erro ao cadastrar venda",
        detalhes: error.message
      });
    }
  }
  
}
