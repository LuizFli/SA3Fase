import React, { useEffect, useState } from 'react';
import GraficoBar from './GraficoBar';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableRow,
  AccordionDetails, AccordionSummary, Accordion, Avatar, Typography
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/material/styles';
import { getVendasByIdentificador } from '../api/funcionariosApi';

const META_VENDA = 2000000;
const COMISSAO_PORCENTAGEM = 4;

const Funcionario = ({ funcionario }) => {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  const StyledExpandIcon = styled(PlayArrowIcon)({
    color: '#e65f2b',
    fontSize: '2rem',
    '&:hover': { color: '#e65f2b' },
    transition: 'transform 0.3s ease',
    '.MuiAccordionSummary-root.Mui-expanded &': {
      transform: 'rotate(-90deg)',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const vendasFuncionario = await getVendasByIdentificador(funcionario.identificador);
        setVendas(vendasFuncionario);
      } catch (err) {
        setVendas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [funcionario.identificador]);

  const formCash = (valor) => {
    if (isNaN(valor)) return "R$ 0,00";
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Calcula o total vendido pelo funcionário
  const totalVendido = vendas.reduce((acc, venda) => acc + Number(venda.valor), 0);

  // Vendas totais e última comissão
  const vendasTotais = vendas.length;
  const ultimaVenda = vendas.length > 0 ? vendas[0] : null;
  const ultimaComissao = ultimaVenda ? (ultimaVenda.valor * (COMISSAO_PORCENTAGEM / 100)) : 0;

  // Calcula o percentual da meta atingida
  const calcularPorcentagem = (valor, meta) => {
    if (!valor || !meta) return 0;
    return ((valor / meta) * 100).toFixed(2);
  };

  // Formata a porcentagem da comissão
  const formatarPorcentagem = (valor) => {
    return `(${valor}%)`;
  };

  // Calcula o valor total de comissão
  const calcularValorPorcentagem = (valor, porcentagem) => {
    if (!valor || !porcentagem) return 0;
    return valor * (porcentagem / 100);
  };

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
                      src={funcionario.foto_url}
                      sx={{
                        width: 80,
                        height: 80,
                        fontSize: '2rem',
                        ...( !funcionario.foto_url && { bgcolor: 'primary.main' })
                      }}
                    >
                      {!funcionario.foto_url && funcionario.nome?.charAt(0).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell rowSpan={2} sx={{
                    width: '20%', verticalAlign: 'middle', fontSize: '1.5rem', padding: '16px', border: 'none',
                  }}>
                    {funcionario.nome}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>Identificador</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>Vendas Totais</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>Cargo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }}>Última Comissão Ganha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.identificador}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{vendasTotais}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>{funcionario.cargo}</TableCell>
                  <TableCell sx={{ border: 'none', fontSize: '17px' }}>
                    {ultimaVenda ? formCash(ultimaComissao) : 'Nenhuma'}
                  </TableCell>
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
              <Typography sx={{ ml: '50px' }}>
                Meta de venda: {formCash(META_VENDA)} {formatarPorcentagem(COMISSAO_PORCENTAGEM)}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ textAlign: 'center', width: '100%', height: '100%', mr: '20px' }}>
                  {calcularPorcentagem(totalVendido, META_VENDA)}%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: '98%' }}>
            <GraficoBar meta={calcularPorcentagem(totalVendido, META_VENDA)} />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Typography sx={{ ml: '50px' }}>Vendas totais:  {formCash(totalVendido)}</Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ textAlign: 'center', width: '100%', height: '100%', mr: '20px' }}>
                Comissões <span style={{ color: '#e65f2b' }}>Totais</span>:  {formCash(calcularValorPorcentagem(totalVendido, COMISSAO_PORCENTAGEM))}
              </Typography>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Funcionario;