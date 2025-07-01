import pool from "../database.js";

export default class User {
    static async findByUsername(username) {
        try {
          const query = `
            SELECT id, username, password, name, role, email, avatar 
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

    static async findById(id) {
        try {
          const query = `
            SELECT id, username, password, name, role, email, avatar 
            FROM users 
            WHERE id = $1
          `;
          const { rows } = await pool.query(query, [id]);
          
          return rows[0] || null;
        } catch (error) {
          console.error('Erro ao buscar usuário por ID:', error);
          throw error;
        }
    }

    static async updateProfile(id, { name, email, avatar }) {
        try {
          const query = `
            UPDATE users 
            SET name = $2, email = $3, avatar = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 
            RETURNING id, name, username, role, email, avatar
          `;
          const { rows } = await pool.query(query, [id, name, email, avatar]);
          
          return rows[0] || null;
        } catch (error) {
          console.error('Erro ao atualizar perfil do usuário:', error);
          throw error;
        }
    }

    static async updatePassword(id, newPassword) {
        try {
          const query = `
            UPDATE users 
            SET password = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 
            RETURNING id, name, username, role, email, avatar
          `;
          const { rows } = await pool.query(query, [id, newPassword]);
          
          return rows[0] || null;
        } catch (error) {
          console.error('Erro ao atualizar senha do usuário:', error);
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

