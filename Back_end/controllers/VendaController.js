import pool from "../database.js";

export default class VendaController {
  static async getVendas(req, res) {
    try {
      const { searchTerm, startDate, endDate, page = 1, pageSize = 5 } = req.query;
      
      // Construção da query base
      let query = `
        SELECT 
          v.id_produto, 
          p.nome as produto, 
          v.valor, 
          v.data, 
          v.matricula_vendedor, 
          v.auth_code,
          f.nome as nome_vendedor
        FROM vendas v
        JOIN produtos p ON v.id_produto = p.id
        JOIN funcionarios f ON v.matricula_vendedor = f.identificador
        WHERE 1=1
      `;
      
      const params = [];
      let paramIndex = 1;

      // Filtro de busca geral
      if (searchTerm) {
        query += `
          AND (
            p.nome ILIKE $${paramIndex} OR 
            v.id_produto::text ILIKE $${paramIndex} OR 
            v.matricula_vendedor ILIKE $${paramIndex} OR 
            v.auth_code ILIKE $${paramIndex} OR
            f.nome ILIKE $${paramIndex}
          )
        `;
        params.push(`%${searchTerm}%`);
        paramIndex++;
      }

      // Filtro de data
      if (startDate) {
        query += ` AND v.data >= $${paramIndex}`;
        params.push(new Date(startDate).toISOString());
        paramIndex++;
      }

      if (endDate) {
        query += ` AND v.data <= $${paramIndex}`;
        params.push(new Date(endDate).toISOString());
        paramIndex++;
      }

      // Ordenação padrão
      query += ` ORDER BY v.data DESC`;

      // Query para contar o total de registros
      const countQuery = query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) FROM');
      const countResult = await pool.query(countQuery, params);
      const total = parseInt(countResult.rows[0].count);

      // Paginação
      const offset = (page - 1) * pageSize;
      query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(parseInt(pageSize), offset);

      // Executar query principal
      const vendasResult = await pool.query(query, params);

      res.status(200).json({
        vendas: vendasResult.rows,
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize)
      });

    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      res.status(500).json({ erro: "Erro ao buscar vendas" });
    }
  }

  static async postVenda(req, res) {
    try {
      const venda = req.body;
      
      const response = await pool.query(
        `INSERT INTO vendas (
          id_produto, 
          valor, 
          data, 
          matricula_vendedor, 
          auth_code
        ) VALUES (
          $1, $2, $3, $4, $5
        ) RETURNING *`,
        [
          venda.id_produto,
          venda.valor,
          new Date().toISOString(), // Data atual
          venda.matricula_vendedor,
          venda.auth_code || this.generateAuthCode() // Gera um auth_code se não fornecido
        ]
      );

      res.status(201).json(response.rows[0]);
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      res.status(500).json({ erro: "Erro ao cadastrar venda" });
    }
  }

  // Método auxiliar para gerar auth_code
  static generateAuthCode() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}