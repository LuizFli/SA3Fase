import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, Select, MenuItem } from '@mui/material';

const BarChart = () => {
  const options = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '40%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['M', 'T', 'W', 'Th', 'F', 'S'],
    },
    colors: ['#E6C5FF'],
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
        <Typography variant="subtitle1">Ação do vendedor</Typography>
        <Select size="small" value="Semana" sx={{ fontSize: '0.875rem' }} disabled>
          <MenuItem value="Semana">Semana</MenuItem>
        </Select>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={230} />
    </Paper>
  );
};

export default BarChart;
