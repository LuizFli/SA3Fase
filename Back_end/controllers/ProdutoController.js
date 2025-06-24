import pool from "../database.js";

export default class ProdutoController {
  static async getProdutos(req, res) {
    try {
      const { searchTerm, id, page = 1, pageSize = 10 } = req.query;

      let baseSelectQuery = `SELECT id, placa, marca, modelo, km, cor, valor, ano FROM produtos`;
      let baseCountQuery = `SELECT COUNT(*) FROM produtos`;

      const whereClauses = [];
      const params = [];
      let paramIndex = 1;

      // Adiciona filtro por ID (prioritário)
      if (id) {
        whereClauses.push(`id = $${paramIndex}`);
        params.push(parseInt(id));
        paramIndex++;
      } else if (searchTerm) { // Filtro de busca geral se não houver ID
        whereClauses.push(`(placa ILIKE $${paramIndex} OR marca ILIKE $${paramIndex} OR modelo ILIKE $${paramIndex} OR cor ILIKE $${paramIndex})`);
        params.push(`%${searchTerm}%`);
        paramIndex++;
      }

      let fullWhereClause = '';
      if (whereClauses.length > 0) {
        fullWhereClause = ` WHERE ` + whereClauses.join(' AND ');
      }

      // Constrói a query principal completa
      let fullQuery = baseSelectQuery + fullWhereClause;

      // Constrói a query de contagem completa
      let fullCountQuery = baseCountQuery + fullWhereClause;

      // Executa a query de contagem primeiro, usando os parâmetros de filtro (sem os parâmetros de limite/offset)
      const countResult = await pool.query(fullCountQuery, params); // Agora 'params' contém apenas os filtros
      const total = parseInt(countResult.rows[0].count);

      // Agora adiciona a ordenação e a paginação à query principal
      fullQuery += ` ORDER BY id ASC`;
      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      fullQuery += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(parseInt(pageSize), offset); // Adiciona os parâmetros de paginação

      // Executa a query principal
      const produtosResult = await pool.query(fullQuery, params);

      res.status(200).json({
        produtos: produtosResult.rows,
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).json({ erro: "Erro interno do servidor ao buscar produtos.", detalhes: error.message });
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
}
