import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

const SellerActionCard = () => {
  const sellerActionData = [
    { day: 'M', vendas: 200 },
    { day: 'T', vendas: 300 },
    { day: 'W', vendas: 150 },
    { day: 'Th', vendas: 230 },
    { day: 'F', vendas: 280 },
    { day: 'S', vendas: 90 },
  ];

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, height: 370, width: '95%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Ação do vendedor
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Semana</InputLabel>
            <Select value="semana" label="Semana">
              <MenuItem value="semana">Semana</MenuItem>
              <MenuItem value="mes">Mês</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveBar
            data={sellerActionData}
            keys={['vendas']}
            indexBy="day"
            margin={{ top: 20, right: 30, bottom: 50, left: 40 }}
            padding={0.4}
            colors={() => 'url(#gradienteRoxo)'}
            enableGridY={false}
            borderRadius={6}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 10,
              tickRotation: 0,
              style: {
                fontSize: 12,
                fontWeight: 500,
              },
            }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: '#AAA',
                  },
                },
              },
              tooltip: {
                container: {
                  background: '#fff',
                  color: '#333',
                  fontSize: 12,
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                },
              },
            }}
            defs={[
              {
                id: 'gradienteRoxo',
                type: 'linearGradient',
                colors: [
                  { offset: 0, color: '#EBCDFE' },
                  { offset: 100, color: '#C78AF5' },
                ],
              },
            ]}
            fill={[{ match: '*', id: 'gradienteRoxo' }]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SellerActionCard;
