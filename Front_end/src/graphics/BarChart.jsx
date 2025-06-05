import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';

const BarChart = () => {
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
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    },
    colors: ['#E6C5FF'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#9C27B0'],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    }
  };

  const series = [
    {
      name: 'Ação',
      data: [200, 300, 150, 220, 280, 90],
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Ações dos Vendedores</Typography>
        <Select size="small" value="Semana" sx={{ fontSize: '0.875rem' }} disabled>
          <MenuItem value="Semana">Semana</MenuItem>
        </Select>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={230} />
    </Paper>
  );
};

export default BarChart;