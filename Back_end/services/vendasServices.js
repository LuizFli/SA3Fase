const db = require('../config/db');

const VendasService = {
  async getVendas(filters = {}) {
    const { searchTerm, startDate, endDate } = filters;
    
    let query = 'SELECT * FROM vendas WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    // Filtro por termo de busca
    if (searchTerm) {
      query += ` AND (
        id_produto::text LIKE $${paramIndex} OR 
        produto LIKE $${paramIndex} OR 
        matricula_vendedor LIKE $${paramIndex} OR 
        auth_code LIKE $${paramIndex}
      )`;
      params.push(`%${searchTerm}%`);
      paramIndex++;
    }

    // Filtro por data
    if (startDate) {
      query += ` AND data >= $${paramIndex}`;
      params.push(new Date(startDate).toISOString());
      paramIndex++;
    }

    if (endDate) {
      query += ` AND data <= $${paramIndex}`;
      params.push(new Date(endDate).toISOString());
      paramIndex++;
    }

    // Ordenação padrão
    query += ' ORDER BY data DESC';

    try {
      const { rows } = await db.query(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  async getTotalVendasCount(filters = {}) {
    const { searchTerm, startDate, endDate } = filters;
    
    let query = 'SELECT COUNT(*) FROM vendas WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (searchTerm) {
      query += ` AND (
        id_produto::text LIKE $${paramIndex} OR 
        produto LIKE $${paramIndex} OR 
        matricula_vendedor LIKE $${paramIndex} OR 
        auth_code LIKE $${paramIndex}
      )`;
      params.push(`%${searchTerm}%`);
      paramIndex++;
    }

    if (startDate) {
      query += ` AND data >= $${paramIndex}`;
      params.push(new Date(startDate).toISOString());
      paramIndex++;
    }

    if (endDate) {
      query += ` AND data <= $${paramIndex}`;
      params.push(new Date(endDate).toISOString());
      paramIndex++;
    }

    try {
      const { rows } = await db.query(query, params);
      return parseInt(rows[0].count, 10);
    } catch (error) {
      throw error;
    }
  }
};

module.exports = VendasService;