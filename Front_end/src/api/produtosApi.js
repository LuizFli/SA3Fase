import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/produtos'; // Endpoint da sua API de produtos

/**
 * Busca produtos do backend.
 * Pode incluir filtros por termo de busca geral e por ID, além de paginação.
 * @param {object} filters - Objeto contendo os filtros (searchTerm, id, page, pageSize).
 * @returns {Promise<object>} - Promessa que resolve para os dados dos produtos e informações de paginação.
 */
export const getProdutos = async (filters = {}) => {
  try {
    const { searchTerm, id, page, pageSize } = filters;

    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (id) params.append('id', id);
    if (page) params.append('page', page);
    if (pageSize) params.append('pageSize', pageSize);

    const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
    // O backend já retorna um objeto com { produtos: [...], total: N, page: X, pageSize: Y }
    return response.data;
  } catch (error) {
    // Log detalhado para requisições GET, similar ao exemplo de vendas
    console.error('Erro detalhado na requisição de produtos:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    // Lança um erro mais conciso para ser tratado no componente que chamou
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || 'Erro ao buscar produtos');
  }
};

/**
 * Cadastra um novo produto no backend.
 * @param {object} produtoData - Dados do produto a ser cadastrado.
 * @returns {Promise<object>} - Promessa que resolve para o produto recém-criado.
 */
export const cadastrarProduto = async (produtoData) => {
  try {
    const response = await axios.post(API_BASE_URL, produtoData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    // Lança um erro conciso, o componente chamador tratará o log completo
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || 'Erro ao cadastrar produto');
  }
};

/**
 * Atualiza um produto existente no backend.
 * @param {string} id - ID do produto a ser atualizado.
 * @param {object} produtoData - Dados do produto a serem atualizados.
 * @returns {Promise<object>} - Promessa que resolve para o produto atualizado.
 */
export const atualizarProduto = async (id, produtoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, produtoData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    // Lança um erro conciso, o componente chamador tratará o log completo
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || `Erro ao atualizar produto com ID ${id}`);
  }
};

/**
 * Exclui um produto do backend.
 * @param {string} id - ID do produto a ser excluído.
 * @returns {Promise<object>} - Promessa que resolve para uma mensagem de sucesso.
 */
export const excluirProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    // Lança um erro conciso, o componente chamador tratará o log completo
    throw new Error(error.response?.data?.detalhes || error.response?.data?.erro || `Erro ao excluir produto com ID ${id}`);
  }
};
