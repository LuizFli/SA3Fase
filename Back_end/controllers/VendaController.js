import pool from "../database.js";

export default class VendaController {
  static async getVendas(req, res) {
    try {
      const { searchTerm, startDate, endDate } = req.query;
  
      // Construção da query base com tratamento de parâmetros
      let query = `
        SELECT 
          v.id_produto, 
          p.marca || ' ' || p.modelo as produto,  
          v.valor, 
          v.data, 
          v.identificador_vendedor,
          v.auth_code,
          f.nome as nome_vendedor
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
            p.marca ILIKE $1 OR 
            p.modelo ILIKE $1 OR
            v.id_produto::text ILIKE $1 OR 
            v.identificador_vendedor ILIKE $1 OR
            v.auth_code ILIKE $1 OR
            f.nome ILIKE $1
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
  
      // Ordenação padrão
      query += ` ORDER BY v.data DESC`;
  
      // Executar query
      const { rows } = await pool.query(query, params);
  
      // Verificar se há resultados
      if (!rows || rows.length === 0) {
        return res.status(200).json([]);
      }
  
      // Retornar os dados
      res.status(200).json(rows);
  
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

      // 4. Retornar resposta enriquecida
      res.status(201).json({
        ...novaVenda.rows[0],
        produto: `${produto.rows[0].marca} ${produto.rows[0].modelo}`,
        nome_vendedor: vendedor.rows[0].nome
      });

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
}