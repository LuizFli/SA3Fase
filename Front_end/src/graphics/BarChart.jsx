import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';

const BarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Semana');
  const [data, setData] = useState([5, 8, 3, 7, 6, 4]); // Valores fixos para a semana
  const [categories, setCategories] = useState(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']); // Categorias fixas para a semana

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);

    let newData;
    let newCategories;

    if (newPeriod === 'Semana') {
      // Dados fixos para a semana
      newData = [5, 8, 3, 7, 6, 4];
      newCategories = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    } else if (newPeriod === 'Mês') {
      // Dados aleatórios para o mês
      newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 300)); // Valores menores que 300
      newCategories = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
      ];
    } else if (newPeriod === 'Ano') {
      // Dados aleatórios para o ano
      newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10000)); // Valores menores que 10.000
      newCategories = ['2019', '2020', '2021', '2022', '2023', '2024'];
    }

    setData(newData);
    setCategories(newCategories);
  };

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: categories, // Categorias dinâmicas
    },
    colors: ['#FF6D00'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['var(--primary-color)'],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: 'Ação',
      data: data,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Ações dos Vendedores
        </Typography>
        <Select
          size="small"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          sx={{ fontSize: '0.875rem' }}
        >
          <MenuItem value="Semana">Semana</MenuItem>
          <MenuItem value="Mês">Mês</MenuItem>
          <MenuItem value="Ano">Ano</MenuItem>
        </Select>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={230} />
    </Paper>
  );
};

export default BarChart;