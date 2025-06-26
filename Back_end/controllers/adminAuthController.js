import AdminAuthService from '../services/adminAuthService.js';

export default class AdminAuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const authData = await AdminAuthService.login(username, password);
      res.status(200).json(authData);
    } catch (error) {
      console.error("Erro no login admin:", error);
      res.status(401).json({
        erro: "Falha na autenticação",
        detalhes: error.message
      });
    }
  }

  static async verify(req, res) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ erro: 'Token não fornecido' });
      }

      const decoded = await AdminAuthService.verifyToken(token);
      
      // Verificar se é admin
      if (decoded.role !== 'admin') {
        return res.status(403).json({ erro: 'Acesso não autorizado' });
      }

      res.status(200).json(decoded);
    } catch (error) {
      console.error("Erro na verificação do token admin:", error);
      res.status(401).json({
        erro: "Token inválido",
        detalhes: error.message
      });
    }
  }
}