import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Paper, MenuItem, Select } from '@mui/material';

const vendidos = 71; // Changed to match example values
const comissoes = 63; // Changed to match example values

const RadialChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 320,
      offsetY: -30,
      offsetX: 20
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: false,
        hollow: {
          margin: 5,
          size: '48%',
          background: 'transparent',
        },
        track: {
          show: true,
          background: '#40475D',
          strokeWidth: '10%',
          opacity: 1,
          margin: 3,
        },
        dataLabels: {
          total: {
            show: false
          }
        }
      },
    },
    colors: ['#ff5900', '#00FF66', '#f02fc2'], // Colors from the example
    stroke: {
      lineCap: 'round',
      width: 3
    },
    labels: [`Produtos Vendidos `, `Comissões`], // Modified labels
    legend: {
      show: true,
      position: 'right',
      offsetX: -30,
      offsetY: 10,
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex] + '%';
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    }
  };

  const series = [vendidos, comissoes];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" sx={{fontWeight: 'bold'}}>Produtos Vendidos</Typography>
        <Select size="small" value="2025" sx={{ fontSize: '0.875rem' }} disabled>
          <MenuItem value="2025">2025</MenuItem>
        </Select>
      </Box>
      <ReactApexChart 
        options={options} 
        series={series} 
        type="radialBar" 
        height={320} 
      />
    </Paper>
  );
};

export default RadialChart;