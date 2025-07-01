import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/produtos';

export const getProdutos = async (filters = {}) => {
  try {
    const { searchTerm, id, startDate, endDate, ativo } = filters;

    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (id) params.append('id', id);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (ativo !== undefined) params.append('ativo', ativo); // Novo filtro por status

    const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || 'Erro ao buscar produtos');
  }
};

export const cadastrarProduto = async (produtoData) => {
  try {
    // Garante que o produto seja cadastrado como ativo por padrão
    const dadosCompletos = { ...produtoData, ativo: true };
    const response = await axios.post(API_BASE_URL, dadosCompletos, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || 'Erro ao cadastrar produto');
  }
};

export const atualizarProduto = async (id, produtoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, produtoData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || `Erro ao atualizar produto com ID ${id}`);
  }
};

export const excluirProduto = async (id) => {
  try {
    // Alternativa: em vez de deletar, você pode desativar o produto
    // const response = await axios.put(`${API_BASE_URL}/${id}`, { ativo: false });
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || `Erro ao excluir produto com ID ${id}`);
  }
};

// Nova função para alternar o status ativo/inativo
export const toggleStatusProduto = async (id, statusAtual) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { ativo: !statusAtual });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || `Erro ao alterar status do produto com ID ${id}`);
  }
};

export const atualizarStatusProduto = async (id, novoStatus) => {
  try {
    // 1. Busca o produto atual
    const { data: produto } = await axios.get(`http://localhost:3000/api/produtos/${id}`);
    
    // 2. Atualiza apenas o status
    const produtoAtualizado = { ...produto, status: novoStatus };
    
    // 3. Envia o objeto completo
    const response = await axios.put(
      `http://localhost:3000/api/produtos/${id}`,
      produtoAtualizado,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status:", error.response?.data || error.message);
    throw error;
  }
};