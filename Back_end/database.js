import { Pool } from 'pg';

const pool = new Pool({
  max: 10,
  host: 'dpg-d15lkg24d50c738cgtv0-a.oregon-postgres.render.com',
  user: 'abilio',
  password: 'ukmEBxU6oQsqfFTKhv6yZLrEI00dPUwW',
  database: 'sales_sight',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função de query para exportar
export const query = (text, params) => pool.query(text, params);

// Exportando o pool diretamente também
export default pool;

pool.on('error', (err) => {
  console.error('Erro no pool do banco de dados:', err);
});