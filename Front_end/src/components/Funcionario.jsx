import React from 'react'
import GraficoBar from './GraficoBar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AccordionDetails,
  AccordionSummary,
  Accordion

} from '@mui/material';
const Funcionario = ({funcionario}) => {


  return (


    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Ícone de seta para expandir
        aria-controls="panel-content"
        id="panel-header"
      >
        <Box>
          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: '#e65f2b',
                  '& th': {
                    color: '#fff',
                    fontSize: '1rem'
                  }
                }}>
                  <TableCell>ID Produto</TableCell>
                  <TableCell>Produto</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Auth Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    
                  </TableCell>
                  <TableCell>
                    
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>

                  </TableCell>
                </TableRow>
                : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
                )
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <GraficoBar meta={funcionario.meta} />
      </AccordionDetails>
    </Accordion>
  );
};

export default Funcionario;

