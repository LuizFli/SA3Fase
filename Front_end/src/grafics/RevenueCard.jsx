import React from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';

const RevenueCard = () => {
  const revenueData = [
    {
      id: "Ganhos",
      color: "orange",
      data: [
        { x: "Jan", y: 12 },
        { x: "Fev", y: 18 },
        { x: "Mar", y: 28 },
        { x: "Abr", y: 22 },
        { x: "Mai", y: 25 },
        { x: "Jun", y: 30 },
      ]
    },
    {
      id: "Previsto",
      color: "green",
      data: [
        { x: "Jan", y: 15 },
        { x: "Fev", y: 20 },
        { x: "Mar", y: 25 },
        { x: "Abr", y: 28 },
        { x: "Mai", y: 30 },
        { x: "Jun", y: 35 },
      ]
    }
  ];

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, width: '95%'}}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            R$ 102.5M
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select value="6meses" label="Período">
              <MenuItem value="6meses">6 meses</MenuItem>
              <MenuItem value="12meses">12 meses</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Receita Total
        </Typography>
        <Box sx={{ height: 300 }}>
          <ResponsiveLine
            data={revenueData}
            margin={{ top: 20, right: 30, bottom: 50, left: 40 }}
            colors={['orange', 'green']}
            pointSize={8}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
            enableSlices="x"
            curve="natural"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueCard;