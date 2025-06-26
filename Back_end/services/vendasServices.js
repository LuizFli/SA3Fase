import pool from '../database.js';

export default class VendaService {
  static async getVendas(filters = {}) {
    const { searchTerm, startDate, endDate, apenasAtivos } = filters;

    // Construção da query base
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

    // Filtro para mostrar apenas ativos
    if (apenasAtivos === 'true') {
      query += ` AND p.ativo = true AND f.ativo = true`;
    }

    // Ordenação padrão
    query += ` ORDER BY v.data DESC`;

    // Executar query
    const { rows } = await pool.query(query, params);

    // Formatando a resposta
    return rows.map(venda => ({
      ...venda,
      status: venda.produto_ativo && venda.vendedor_ativo ? 'ativo' : 'inativo',
      produto_status: venda.produto_ativo ? 'disponível' : 'vendido',
      vendedor_status: venda.vendedor_ativo ? 'ativo' : 'inativo'
    }));
  }

  static async createVenda(vendaData) {
    const { id_produto, valor, identificador_vendedor, auth_code } = vendaData;
    
    // Verificar se o produto existe
    const produto = await pool.query('SELECT * FROM produtos WHERE id = $1', [id_produto]);
    if (produto.rows.length === 0) {
      throw new Error("Produto não encontrado");
    }

    // Verificar se o vendedor existe
    const vendedor = await pool.query(
      'SELECT * FROM funcionarios WHERE identificador = $1',
      [identificador_vendedor]
    );
    if (vendedor.rows.length === 0) {
      throw new Error("Vendedor não encontrado");
    }

    // Iniciar transação
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Inserir a venda
      const novaVenda = await client.query(
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

      // Atualizar status do produto
      await client.query(
        'UPDATE produtos SET ativo = false WHERE id = $1',
        [id_produto]
      );

      await client.query('COMMIT');

      return {
        ...novaVenda.rows[0],
        produto: `${produto.rows[0].marca} ${produto.rows[0].modelo}`,
        nome_vendedor: vendedor.rows[0].nome
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async deleteAllVendas() {
    await pool.query('TRUNCATE TABLE vendas RESTART IDENTITY CASCADE');
  }

  static async deleteVenda(id) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Obter informações da venda
      const venda = await client.query('SELECT * FROM vendas WHERE id = $1', [id]);
      if (venda.rows.length === 0) {
        throw new Error("Venda não encontrada");
      }

      const idProduto = venda.rows[0].id_produto;

      // Deletar a venda
      await client.query('DELETE FROM vendas WHERE id = $1', [id]);

      // Reativar o produto
      await client.query(
        'UPDATE produtos SET ativo = true WHERE id = $1',
        [idProduto]
      );

      await client.query('COMMIT');

      return {
        mensagem: "Venda deletada com sucesso e produto reativado",
        venda_deletada: venda.rows[0],
        produto_reativado: idProduto
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static generateAuthCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}