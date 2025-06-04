import React, { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarMonth } from '@mui/icons-material';
import { ptBR } from 'date-fns/locale';

const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2024-12-12'));

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, flex: 1 }}>
      <Typography variant="subtitle1">Calendário</Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <CalendarMonth sx={{ fontSize: 50, color: 'orangered' }} />
        <Typography mt={1} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Typography>
        <DatePicker
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          localeText={{ okButtonLabel: 'OK' }}
          slotProps={{ textField: { sx: { display: 'none' } } }}
        />
        <Button variant="contained" color="warning" sx={{ mt: 2, borderRadius: 5 }}>
          Select date
        </Button>
      </Box>
    </Paper>
  );
};

export default CalendarCard;
