import pool from '../database.js';

export default class VendaService {
  // Obter vendas com filtros opcionais
  static async getVendas(filters = {}) {
    const { searchTerm, startDate, endDate, apenasAtivos } = filters;

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

    if (searchTerm) {
      query += `
        AND (
          p.marca ILIKE $${params.length + 1} OR 
          p.modelo ILIKE $${params.length + 1} OR 
          f.nome ILIKE $${params.length + 1}
        )
      `;
      params.push(`%${searchTerm}%`);
    }

    if (startDate) {
      query += ` AND v.data >= $${params.length + 1}`;
      params.push(startDate);
    }

    if (endDate) {
      query += ` AND v.data <= $${params.length + 1}`;
      params.push(endDate);
    }

    if (apenasAtivos) {
      query += ` AND p.ativo = true AND f.ativo = true`;
    }

    query += ` ORDER BY v.data DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  // Criar uma nova venda
  static async createVenda(vendaData) {
    const { id_produto, valor, identificador_vendedor, auth_code } = vendaData;

    const produto = await pool.query('SELECT marca, modelo, ativo FROM produtos WHERE id = $1', [id_produto]);
    if (!produto.rows.length) {
      throw new Error('Produto não encontrado');
    }
    if (!produto.rows[0].ativo) {
      throw new Error('Produto inativo');
    }

    const vendedor = await pool.query('SELECT nome, ativo FROM funcionarios WHERE identificador = $1', [identificador_vendedor]);
    if (!vendedor.rows.length) {
      throw new Error('Vendedor não encontrado');
    }
    if (!vendedor.rows[0].ativo) {
      throw new Error('Vendedor inativo');
    }

    const result = await pool.query(
      `INSERT INTO vendas (id_produto, valor, identificador_vendedor, auth_code) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_produto, valor, identificador_vendedor, auth_code]
    );

    return {
      ...result.rows[0],
      produto: `${produto.rows[0].marca} ${produto.rows[0].modelo}`,
      nome_vendedor: vendedor.rows[0].nome,
    };
  }

  static async deleteAllVendas() {
    await pool.query('DELETE FROM vendas');
    return { mensagem: 'Todas as vendas foram removidas com sucesso' };
  }

  static async deleteVenda(id) {
    const venda = await pool.query('SELECT id_produto FROM vendas WHERE id = $1', [id]);
    if (!venda.rows.length) {
      throw new Error('Venda não encontrada');
    }

    const id_produto = venda.rows[0].id_produto;

    await pool.query('DELETE FROM vendas WHERE id = $1', [id]);
    await pool.query('UPDATE produtos SET ativo = true WHERE id = $1', [id_produto]);

    return { mensagem: 'Venda deletada com sucesso e produto reativado', produto_reativado: id_produto };
  }
}