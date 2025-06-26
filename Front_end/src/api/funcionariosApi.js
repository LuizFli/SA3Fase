import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getFuncionarioByIdentificador = async (identificador) => {
  const { data } = await axios.get(`${API_URL}/funcionarios?identificador=${identificador}`);
  return data[0]; // Supondo que identificador é único
};

export const getVendasByIdentificador = async (identificador) => {
  const { data } = await axios.get(`${API_URL}/vendas?searchTerm=${identificador}`);
  // Filtra vendas exatas do identificador
  return data.filter(v => v.identificador_vendedor === identificador);
};

export const getFuncionarios = async () => {
  const { data } = await axios.get(`${API_URL}/funcionarios`);
  return data;
};