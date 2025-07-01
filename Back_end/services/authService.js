import bcrypt from 'bcryptjs';
import User from '../models/User.js';  

export default class AuthService {
    static async login(username, password) {
        // 1. Busca o usuário pelo username
        const user = await User.findByUsername(username);
        
        if (!user) {
          throw new Error('Credenciais inválidas');
        }
    
        // 2. Verifica a senha em texto puro
        const isPasswordValid = (password === user.password);
        if (!isPasswordValid) {
          throw new Error('Credenciais inválidas');
        }
    
        // 3. Retorna os dados do usuário
        return {
          success: true,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role
          }
        };
    }
}