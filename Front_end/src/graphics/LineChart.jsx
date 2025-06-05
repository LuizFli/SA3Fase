import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper , Select, MenuItem} from '@mui/material';

const LineChart = () => {
  const options = {
    chart: { type: 'line', toolbar: { show: false } },
    colors: ['#e65f2b', '#00FF66'],
    stroke: { curve: 'smooth', width: 3 },
    xaxis: { categories: ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'] },
    legend: { show: true, position: 'top',horizontalAlign: "right", markers: { radius: 5 } },
  };

  const series = [
    { name: 'Ganhos', data: [70, 90, 60, 80, 100, 90] },
    { name: 'Previsto', data: [50, 60, 50, 100, 70, 110] },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, width: '100%' }}>
      <Box display="flex" justifyContent="space-between">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Receita Total</Typography>
      <Select size="small" value="Semana" sx={{ fontSize: '0.875rem' }} disabled>
          <MenuItem value="Semana">Mês</MenuItem>
        </Select>
      </Box>
      <Typography variant="body1" color="#e65f2b" sx={{ mb: 2, fontWeight: 'bold'}}>R$ 102.5M</Typography>
      <ReactApexChart options={options} series={series} type="line" height={250} />
    </Paper>
  );
};

export default LineChart;
