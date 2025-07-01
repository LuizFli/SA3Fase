import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const usuariosApi = {
  // Obter perfil do usuário
  obterPerfil: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter perfil do usuário:', error);
      throw error;
    }
  },

  // Atualizar perfil do usuário
  atualizarPerfil: async (userId, dadosPerfil) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/profile`, dadosPerfil);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error);
      throw error;
    }
  },

  // Atualizar senha do usuário
  atualizarSenha: async (userId, dadosSenha) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/password`, dadosSenha);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar senha do usuário:', error);
      throw error;
    }
  }
};

export default usuariosApi;
