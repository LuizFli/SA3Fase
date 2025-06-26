import pool from '../database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export default class AdminAuthService {
  static async login(username, password) {
    // Verificar credenciais do admin (pode ser hardcoded ou em uma tabela específica)
    const adminCredentials = {
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: process.env.ADMIN_PASSWORD_HASH || 
                   await bcrypt.hash('admin123', 10) // Hash de fallback
    };

    // Verificar usuário
    if (username !== adminCredentials.username) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, adminCredentials.passwordHash);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        role: 'admin',
        username: username
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        username,
        role: 'admin'
      }
    };
  }

  static async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}