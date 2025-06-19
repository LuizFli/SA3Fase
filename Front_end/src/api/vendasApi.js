import axios from 'axios';

const API_URL = 'http://localhost:3001/api/vendas';

export const getVendas = async (filters) => {
  try {
    const { searchTerm, startDate, endDate, page, rowsPerPage } = filters;
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    params.append('page', page + 1); // +1 porque o backend começa em 1
    params.append('pageSize', rowsPerPage);

    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    throw error;
  }
};