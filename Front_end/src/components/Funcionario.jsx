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
  Accordion,
  Avatar
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
const Funcionario = ({ funcionario }) => {

  const StyledExpandIcon = styled(PlayArrowIcon)({
    color: 'blue',
    '&:hover': {
      color: 'darkblue',
    },
    transition: 'transform 0.3s ease',
    // Aplica a rotação quando o pai (AccordionSummary) estiver expandido
    '.MuiAccordionSummary-root.Mui-expanded &': {
      transform: 'rotate(30deg)',
    },
  });


  return (


    <Accordion>
      <AccordionSummary
        expandIcon={<StyledExpandIcon />} // Ícone de seta para expandir
        aria-controls="panel-content"
        id="panel-header"
      >
        <Box sx={{width:'94%'}}>
          <TableContainer sx={{ border:'none'}}>
            <Table sx={{border:'none'}}>
              <TableBody sx={{border:'none'}}>
                
                <TableRow sx={{border:'none'}}>
                  
                  <TableCell rowSpan={2} sx={{ width: '10%', verticalAlign: 'middle' , border:'none'}}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        fontSize: '2rem'
                      }}
                    />
                  </TableCell>

                  <TableCell
                    rowSpan={2}
                    sx={{
                      width: '20%',
                      verticalAlign: 'middle',
                      fontSize: '1.5rem',
                      padding: '16px',
                      border: 'none',
                    }}
                  >
                    {funcionario.nome}
                  </TableCell>

                  
                  <TableCell sx={{ maWidth: '15%', fontWeight: 'bold' , fontSize:'20px'}}>Matrícula</TableCell>
                  <TableCell sx={{ width: '20%', fontWeight: 'bold' , fontSize:'20px'}}>Email</TableCell>
                  <TableCell sx={{ width: '20%', fontWeight: 'bold' , fontSize:'20px'}}>Telefone</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold' , fontSize:'20px'}}>CPF</TableCell>
                </TableRow>

                
                <TableRow>
                  
                  <TableCell sx={{border:'none', fontSize:'17px'}}>{funcionario.matricula}</TableCell>
                  <TableCell sx={{border:'none', fontSize:'17px'}}>{funcionario.email}</TableCell>
                  <TableCell sx={{border:'none', fontSize:'17px'}}>{funcionario.telefone}</TableCell>
                  <TableCell sx={{border:'none', fontSize:'17px'}}>{funcionario.cpf}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', height: '100%', width: '92%'}}>
          <GraficoBar meta={funcionario.meta} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Funcionario;

