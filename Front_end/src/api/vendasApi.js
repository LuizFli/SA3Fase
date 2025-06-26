import axios from 'axios';

const API_URL = 'http://localhost:3000/api/vendas'; // URL para vendas
const PRODUTOS_API_URL = 'http://localhost:3000/api/produtos'; // URL para produtos


axios.defaults.headers.common['Content-Type'] = 'application/json';

export const cadastrarVenda = async (vendaData) => {
  try {
    const response = await axios.post(API_URL, {
      id_produto: vendaData.id_produto,
      valor: vendaData.valor,
      identificador_vendedor: vendaData.identificador_vendedor,
      auth_code: vendaData.auth_code
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

export const limparTodasVendas = async () => {
  try {
    const response = await axios.delete(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao limpar vendas');
  }
};

export const deletarVenda = async (idVenda) => {
  try {
    const response = await axios.delete(`${API_URL}/${idVenda}`);
    return response.data;
  } catch (error) {
    
    console.error('Erro ao deletar venda:', {
      url: `${API_URL}/${idVenda}`,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    throw new Error(error.response?.data?.erro || 'Erro ao deletar venda');
  }
};

export const fetchProdutosAtivos = async () => {
  try {
    const response = await axios.get(PRODUTOS_API_URL, {
      params: { apenasAtivos: true }
    });
    return response.data || [];
  } catch (error) {
    console.error('Erro ao buscar produtos ativos:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return [];
  }
};