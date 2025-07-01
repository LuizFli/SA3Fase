import pool from "../database.js";

export default class User {
    static async findByUsername(username) {
        try {
          const query = `
            SELECT id, username, password, name, role 
            FROM users 
            WHERE username = $1
          `;
          const { rows } = await pool.query(query, [username]);
          
          return rows[0] || null;
        } catch (error) {
          console.error('Erro ao buscar usuário por username:', error);
          throw error;
        }
    }

    static async createUser(name, username, password) {
        const query = `
          INSERT INTO users (name, username, password, role) 
          VALUES ($1, $2, $3, $4) 
          RETURNING id, name, username, role
        `;
        // Agora armazena a senha em texto puro
        const { rows } = await pool.query(query, [name, username, password, 'user']);
        return rows[0];
    }
}

