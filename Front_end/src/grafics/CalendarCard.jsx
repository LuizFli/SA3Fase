import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Popper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EventIcon from '@mui/icons-material/Event';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from 'date-fns/locale';

const CalendarCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const formatarData = (date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3, height: 370, width: '95%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ color: '#333', fontWeight: 500 }}>
            Calendário
          </Typography>

          <EventIcon sx={{ fontSize: 60, color: '#F25C2A' }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatarData(selectedDate)}
          </Typography>

          <Box ref={anchorRef}>
            <Button
              onClick={() => setOpen((prev) => !prev)}
              variant="contained"
              sx={{
                backgroundColor: '#F25C2A',
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                fontSize: 14,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#D84F1D',
                },
              }}
            >
              Select date
            </Button>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
              <DatePicker
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  setOpen(false);
                }}
                slotProps={{ textField: { hiddenLabel: true, size: 'small' } }}
              />
            </Popper>
          </LocalizationProvider>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalendarCard;
