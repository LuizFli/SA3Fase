import React from 'react'
import { Box, Typography } from '@mui/material';
import BarraNavegacao from '../components/BarraNavegacao';
import FragmentoHistorico from '../components/FragmentoHistorico';


function HistoricoVendas() {
  return (
    <div>
      <Box component="section" sx={{ p: 0, m: 0, border: '1px solid grey', width: 'auto-complete', height: '96vh', display: 'flex', alignItems: 'top', justifyContent: 'center', flexDirection: 'row', backgroundColor:'#EBDFD7' }}>
            <Box sx={{width:'12%', height:'100%'}}>
                <BarraNavegacao />
            </Box>

                <Box  sx={{ width: '88%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'top', flexDirection: 'column' }}>
                    <Box sx={{  color: '#133337', width: '100%', height: '8%', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h2" sx={{ fontFamily: 'monospace', marginLeft: '20px' }}>Historico de Vendas</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid grey' }}>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Id Produto</Typography>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Produto</Typography>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Valor</Typography>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Data</Typography>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Matricula Vendedor</Typography>
                        <Typography sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Auth Code</Typography>
                        
                    </Box>
                    {/* {
                        vendas.map((venda) => (
                            <FragmentoHistorico
                                key={venda.id_produto}
                                produto={venda.produto}
                                valor={venda.valor}
                                data={venda.data}
                                matricula_vendedor={venda.matricula_vendedor}
                                auth_code={venda.auth_code}
                                
                            />
                        ))
                    } */}
                </Box>
            </Box>
    </div>
  )
}

export default HistoricoVendas
