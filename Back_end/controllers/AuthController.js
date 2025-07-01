import AuthService from '../services/authService.js';

export default class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      
      // Validação básica dos campos
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username e password são obrigatórios'
        });
      }

      const result = await AuthService.login(username, password);

      // Armazena na sessão se necessário
      if (req.session) {
        req.session.user = {
          id: result.user.id,
          username: result.user.username,
          role: result.user.role
        };
      }

      return res.status(200).json({
        success: true,
        user: {
          id: result.user.id,
          name: result.user.name,
          username: result.user.username,
          role: result.user.role
        }
      });

    } catch (error) {
      console.error('Erro no login:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: error.message || 'Falha na autenticação' 
      });
    }
  }
}