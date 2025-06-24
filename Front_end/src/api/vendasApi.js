import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vendas'; // Ajuste conforme sua configuração

export const cadastrarVenda = async (vendaData) => {
  try {
    const response = await axios.post(API_URL, {
      id_produto: vendaData.id_produto,
      valor: vendaData.valor,
      identificador_vendedor: vendaData.identificador_vendedor,
      auth_code: vendaData.auth_code
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao cadastrar venda');
  }
};

export const getVendas = async (filters = {}) => {
  try {
    const { searchTerm, startDate, endDate } = filters;
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    
    // O backend agora retorna diretamente o array de vendas
    return response.data || [];
    
  } catch (error) {
    console.error('Erro detalhado na requisição:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    throw new Error(error.response?.data?.erro || error.response?.data?.message || 'Erro ao buscar vendas');
  }
};