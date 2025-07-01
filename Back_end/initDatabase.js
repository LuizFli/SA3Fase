import pool from './database.js';

const initializeDatabase = async () => {
  try {
    console.log('🔧 Inicializando banco de dados...');
    
    // Verificar e adicionar colunas se não existirem
    const checkEmailColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='email'
    `);
    
    if (checkEmailColumn.rows.length === 0) {
      await pool.query('ALTER TABLE users ADD COLUMN email VARCHAR(255)');
      console.log('✅ Coluna email adicionada');
    }
    
    const checkAvatarColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='avatar'
    `);
    
    if (checkAvatarColumn.rows.length === 0) {
      await pool.query('ALTER TABLE users ADD COLUMN avatar TEXT');
      console.log('✅ Coluna avatar adicionada');
    }
    
    const checkUpdatedAtColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='updated_at'
    `);
    
    if (checkUpdatedAtColumn.rows.length === 0) {
      await pool.query('ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
      console.log('✅ Coluna updated_at adicionada');
    }
    
    // Atualizar usuários existentes com valores padrão
    await pool.query(`
      UPDATE users 
      SET email = COALESCE(email, username || '@empresa.com'),
          avatar = COALESCE(avatar, '/Imagens/Adm.png'),
          updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)
      WHERE email IS NULL OR avatar IS NULL OR updated_at IS NULL
    `);
    
    // Criar usuário de teste se não existir
    const testUser = await pool.query(`
      SELECT id FROM users WHERE username = 'admin'
    `);
    
    if (testUser.rows.length === 0) {
      await pool.query(`
        INSERT INTO users (name, username, password, role, email, avatar) 
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        'Administrador Sistema',
        'admin',
        'admin123',
        'admin',
        'admin@empresa.com',
        '/Imagens/Adm.png'
      ]);
      console.log('✅ Usuário de teste criado (admin/admin123)');
    }
    
    console.log('✅ Banco de dados inicializado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
  }
};

export default initializeDatabase;
