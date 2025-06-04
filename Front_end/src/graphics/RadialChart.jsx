import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, MenuItem, Select } from '@mui/material';

const RadialChart = () => {
  const options = {
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        dataLabels: { total: { show: false } }
      }
    },
    labels: ['Vendido', 'Comissões'],
    colors: ['#99C9F2', '#00FF66']
  };

  const series = [71, 29];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Carros Vendidos</Typography>
        <Select size="small" value="2024" sx={{ fontSize: '0.875rem' }} disabled>
          <MenuItem value="2024">2024</MenuItem>
        </Select>
      </Box>
      <ReactApexChart options={options} series={series} type="radialBar" height={220} />
      <Box mt={2}>
        <Typography>Vendido: 10K</Typography>
        <Typography>Comissões: 4K</Typography>
      </Box>
    </Paper>
  );
};

export default RadialChart;
