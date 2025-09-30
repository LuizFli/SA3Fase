import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuração para banco externo (Render)
const externalConfig = {
  max: 10,
  host: 'dpg-d15lkg24d50c738cgtv0-a.oregon-postgres.render.com',
  user: 'abilio',
  password: 'ukmEBxU6oQsqfFTKhv6yZLrEI00dPUwW',
  database: 'sales_sight',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
};

// Configuração para banco local (Docker)
const localConfig = {
  max: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'abilio',
  password: process.env.DB_PASSWORD || 'ukmEBxU6oQsqfFTKhv6yZLrEI00dPUwW',
  database: process.env.DB_NAME || 'sales_sight',
  port: process.env.DB_PORT || 5432,
};

// Escolhe configuração baseada na variável de ambiente
const useExternalDB = process.env.USE_EXTERNAL_DB === 'true';
const config = useExternalDB ? externalConfig : localConfig;

console.log(`🔗 Conectando ao banco de dados ${useExternalDB ? 'EXTERNO (Render)' : 'LOCAL (Docker)'}`);
console.log(`📍 Host: ${config.host}`);
console.log(`🗃️ Database: ${config.database}`);

const pool = new Pool(config);

// Função de query para exportar
export const query = (text, params) => pool.query(text, params);

// Exportando o pool diretamente também
export default pool;

pool.on('error', (err) => {
  console.error('❌ Erro no pool do banco de dados:', err);
});

pool.on('connect', () => {
  console.log('✅ Conexão com banco de dados estabelecida');
});

// Teste de conexão na inicialização
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erro ao testar conexão:', err);
  } else {
    console.log('🟢 Teste de conexão realizado com sucesso:', res.rows[0]);
  }
});