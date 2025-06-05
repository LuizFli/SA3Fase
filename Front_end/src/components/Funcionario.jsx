import React from 'react'
import GraficoBar from './GraficoBar';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Avatar,
  Typography
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
const Funcionario = ({ funcionario }) => {

  const StyledExpandIcon = styled(PlayArrowIcon)({
    color: '#e65f2b',
    fontSize: '2rem', // tamanho do incone
    '&:hover': {
      color: '#e65f2b',
    },
    transition: 'transform 0.3s ease',

    '.MuiAccordionSummary-root.Mui-expanded &': {
      transform: 'rotate(-90deg)', // rotação do ícone quando expandido
    },
  });
  const formCash = (valor) => {
    // Verifica se o valor é numérico
    if (isNaN(valor)) {
      console.error("O valor fornecido não é um número.");
      return "R$ 0,00";
    }

    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
  function calcularPorcentagem(valorParcial, valorTotal) {
    if (valorTotal === 0) return 0;
    const porcentagem = (valorParcial / valorTotal) * 100;
    return parseFloat(porcentagem.toFixed(2));
  }
  function formatarPorcentagem(valorNumerico) {
    return valorNumerico.toFixed(2) + '%';
  }
  function calcularValorPorcentagem(valorTotal, porcentagem) {
    return (valorTotal * porcentagem) / 100;
  }
  return (


    <Accordion sx={{ mb: '10px', borderRadius: '5px' }}>
      <AccordionSummary
        expandIcon={<StyledExpandIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Box sx={{ width: '94%' }}>
          <TableContainer sx={{ border: 'none' }}>
            <Table sx={{ border: 'none' }}>
              <TableBody sx={{ border: 'none' }}>

                <TableRow sx={{ border: 'none' }}>

                  <TableCell rowSpan={2} sx={{ width: '10%', verticalAlign: 'middle', border: 'none' }}>
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


                  <TableCell sx={{ maWidth: '15%', fontWeight: 'bold', fontSize: '20px' }}>Identificador</TableCell>
                  <TableCell sx={{ width: '20%', fontWeight: 'bold', fontSize: '20px' }}>Email</TableCell>
                  <TableCell sx={{ width: '20%', fontWeight: 'bold', fontSize: '20px' }}>Telefone</TableCell>
                  <TableCell sx={{ width: '15%', fontWeight: 'bold', fontSize: '20px' }}>CPF</TableCell>
                </TableRow>


                <TableRow>

                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.identificador}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.email}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.telefone}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.cpf}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
              <Typography sx={{ ml: '50px' }}>Meta de venda:    R$ 2.000,00 (4%)</Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ textAlign: 'center', width: '100%', height: '100%', mr: '20px' }}>
                  {funcionario.financeiro.meta}%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '98%' }}>
            <GraficoBar meta={funcionario.financeiro.meta} />
          </Box>

          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Typography sx={{ ml: '50px' }}>Vendas totais:   R$ {formCash(funcionario.financeiro.vendaTotal)}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ textAlign: 'center', width: '100%', height: '100%', mr: '20px' }}>
                Comissões <span style={{ color: '#e65f2b' }}>Totais</span>:  {formCash(funcionario.financeiro.comicao)}
              </Typography>
            </Box>
          </Box>


        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Funcionario;

