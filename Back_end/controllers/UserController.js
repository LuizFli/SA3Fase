import User from '../models/User.js';

export default class UserController {
    // Obter perfil do usuário
    static async getProfile(req, res) {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário é obrigatório'
                });
            }

            const user = await User.findById(id);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            // Remove a senha da resposta
            const { password, ...userWithoutPassword } = user;

            return res.status(200).json({
                success: true,
                user: userWithoutPassword
            });

        } catch (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Atualizar perfil do usuário
    static async updateProfile(req, res) {
        try {
            const { id } = req.params;
            const { name, email, avatar } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário é obrigatório'
                });
            }

            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    message: 'Nome e email são obrigatórios'
                });
            }

            const updatedUser = await User.updateProfile(id, { name, email, avatar });
            
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                user: updatedUser
            });

        } catch (error) {
            console.error('Erro ao atualizar perfil do usuário:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }

    // Atualizar senha do usuário
    static async updatePassword(req, res) {
        try {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID do usuário é obrigatório'
                });
            }

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha atual e nova senha são obrigatórias'
                });
            }

            // Verificar se a senha atual está correta
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            if (user.password !== currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Senha atual incorreta'
                });
            }

            const updatedUser = await User.updatePassword(id, newPassword);
            
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Erro ao atualizar senha'
                });
            }

            // Remove a senha da resposta
            const { password, ...userWithoutPassword } = updatedUser;

            return res.status(200).json({
                success: true,
                message: 'Senha atualizada com sucesso',
                user: userWithoutPassword
            });

        } catch (error) {
            console.error('Erro ao atualizar senha do usuário:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });
        }
    }
}
