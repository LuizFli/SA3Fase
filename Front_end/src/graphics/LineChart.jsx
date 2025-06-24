import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';

const LineChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Mês');
  const [data, setData] = useState({
    ganhos: [70, 90, 60, 80, 100, 90], // Dados iniciais para o mês
    previsto: [50, 60, 50, 100, 70, 110], // Dados iniciais para o mês
  });
  const [categories, setCategories] = useState(['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']); // Categorias iniciais para o mês

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);

    let newData;
    let newCategories;

    if (newPeriod === 'Mês') {
      // Dados para o mês
      newData = {
        ganhos: [70, 90, 60, 80, 100, 90],
        previsto: [50, 60, 50, 100, 70, 110],
      };
      newCategories = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
    } else if (newPeriod === 'Ano') {
      // Dados para o ano
      const currentYear = new Date().getFullYear(); // Ano atual
      newData = {
        ganhos: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000)), // Valores aleatórios para o ano
        previsto: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000)),
      };
      newCategories = Array.from({ length: 6 }, (_, i) => (currentYear - 5 + i).toString()); // Últimos 6 anos
    }

    setData(newData);
    setCategories(newCategories);
  };

  // Calcula a receita total com base nos dados de "Ganhos"
  const totalReceita = data.ganhos.reduce((acc, curr) => acc + curr, 0);
  const receitaFormatada =
    selectedPeriod === 'Mês'
      ? `R$ ${totalReceita}K` // Exibe em milhares para o mês
      : `R$ ${(totalReceita / 1000).toFixed(1)}M`; // Exibe em milhões para o ano

  const options = {
    chart: { type: 'line', toolbar: { show: false } },
    colors: ['#e65f2b', '#00FF66'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: categories }, // Categorias dinâmicas
    legend: { show: true, position: 'top', horizontalAlign: 'right', markers: { radius: 5 } },
  };

  const series = [
    { name: 'Ganhos', data: data.ganhos },
    { name: 'Previsto', data: data.previsto },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, width: '100%' }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Receita Total
        </Typography>
        <Select
          size="small"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          sx={{ fontSize: '0.875rem' }}
        >
          <MenuItem value="Mês">Mês</MenuItem>
          <MenuItem value="Ano">Ano</MenuItem>
        </Select>
      </Box>
      <Typography variant="body1" color="#e65f2b" sx={{ mb: 2, fontWeight: 'bold' }}>
        {receitaFormatada}
      </Typography>
      <ReactApexChart options={options} series={series} type="line" height={250} />
    </Paper>
  );
};

export default LineChart;