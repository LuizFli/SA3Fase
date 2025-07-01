import pool from '../database.js';

export default class ProdutoService {
  static async getProdutos(filters = {}) {
    const { searchTerm, id, startDate, endDate, ativo } = filters;

    // Construção da query base
    let query = `
      SELECT 
        p.id,
        p.marca,
        p.modelo,
        p.ano,
        p.km,
        p.placa,
        p.cor,
        p.valor,
        p.ativo,
        p.created_at,
        p.updated_at
      FROM produtos p
      WHERE 1=1
    `;

    const params = [];

    // Filtro de busca geral
    if (searchTerm) {
      query += `
        AND (
          p.marca ILIKE $${params.length + 1} OR 
          p.modelo ILIKE $${params.length + 1} OR
          p.placa ILIKE $${params.length + 1} OR
          p.cor ILIKE $${params.length + 1} OR
          p.id::text ILIKE $${params.length + 1}
        )
      `;
      params.push(`%${searchTerm}%`);
    }

    // Filtro por ID específico
    if (id) {
      query += ` AND p.id = $${params.length + 1}`;
      params.push(id);
    }

    // Filtro de data (usando created_at ou updated_at)
    if (startDate) {
      query += ` AND p.created_at >= $${params.length + 1}`;
      params.push(new Date(startDate).toISOString());
    }

    if (endDate) {
      query += ` AND p.created_at <= $${params.length + 1}`;
      params.push(new Date(endDate).toISOString());
    }

    // Filtro por status ativo
    if (ativo !== undefined) {
      query += ` AND p.ativo = $${params.length + 1}`;
      params.push(ativo === 'true' || ativo === true);
    }

    // Ordenação padrão
    query += ` ORDER BY p.created_at DESC`;

    // Executar query
    const { rows } = await pool.query(query, params);

    return rows;
  }

  static async createProduto(produtoData) {
    const { marca, modelo, ano, km, placa, cor, valor } = produtoData;
    
    // Iniciar transação
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Inserir o produto
      const novoProduto = await client.query(
        `INSERT INTO produtos (
          marca, 
          modelo, 
          ano, 
          km, 
          placa, 
          cor, 
          valor, 
          ativo, 
          created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, true, $8
        ) RETURNING *`,
        [
          marca,
          modelo,
          ano,
          km,
          placa,
          cor,
          valor,
          new Date().toISOString()
        ]
      );

      await client.query('COMMIT');

      return novoProduto.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async updateProduto(id, produtoData) {
    const { marca, modelo, ano, km, placa, cor, valor, ativo } = produtoData;
    
    // Iniciar transação
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Atualizar o produto
      const produtoAtualizado = await client.query(
        `UPDATE produtos 
         SET 
           marca = $1, 
           modelo = $2, 
           ano = $3, 
           km = $4, 
           placa = $5, 
           cor = $6, 
           valor = $7,
           ativo = $8,
           updated_at = $9
         WHERE id = $10
         RETURNING *`,
        [
          marca,
          modelo,
          ano,
          km,
          placa,
          cor,
          valor,
          ativo,
          new Date().toISOString(),
          id
        ]
      );

      await client.query('COMMIT');

      return produtoAtualizado.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteProduto(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Deletar o produto
      await client.query('DELETE FROM produtos WHERE id = $1', [id]);

      await client.query('COMMIT');

      return { mensagem: "Produto deletado com sucesso" };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}