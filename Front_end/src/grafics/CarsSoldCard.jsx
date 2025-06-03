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
  Stack,
} from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

const CarsSoldCard = () => {
  const vendidoData = [
    { id: 'Vendido', label: 'Vendido', value: 10000, color: '#72A1F2' },
    { id: 'Restante1', label: 'Restante1', value: 20000, color: '#F5F5F5' },
  ];

  const comissaoData = [
    { id: 'Comissões', label: 'Comissões', value: 4000, color: '#57E690' },
    { id: 'Restante2', label: 'Restante2', value: 20000, color: '#F5F5F5' },
  ];

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, width: '100%', maxWidth: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Carros Vendidos
          </Typography>
          <FormControl size="small" sx={{ minWidth: 90 }}>
            <InputLabel>Ano</InputLabel>
            <Select value="2024" label="Ano">
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 200,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Gráfico externo (Vendido) */}
          <Box sx={{ position: 'absolute', height: 200, width: 200 }}>
            <ResponsivePie
              data={vendidoData}
              innerRadius={0.7}
              padAngle={1}
              cornerRadius={3}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              colors={({ data }) => data.color}
              borderWidth={0}
            />
          </Box>

          {/* Gráfico interno (Comissões) */}
          <Box sx={{ position: 'absolute', height: 140, width: 140 }}>
            <ResponsivePie
              data={comissaoData}
              innerRadius={0.65}
              padAngle={1}
              cornerRadius={3}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              colors={({ data }) => data.color}
              borderWidth={0}
            />
          </Box>
        </Box>

        {/* Legendas */}
        <Stack direction="column" spacing={1} mt={2} ml={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#72A1F2' }} />
            <Typography variant="body2" sx={{ color: '#555' }}>
              Vendido
            </Typography>
            <Typography sx={{ fontWeight: 'bold', color: '#2D0F58', ml: 'auto' }}>10K</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#57E690' }} />
            <Typography variant="body2" sx={{ color: '#555' }}>
              Comissões
            </Typography>
            <Typography sx={{ fontWeight: 'bold', color: '#2D0F58', ml: 'auto' }}>4K</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CarsSoldCard;
