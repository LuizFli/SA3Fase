import React from 'react'
import { Box, Stack, TextField, Typography } from '@mui/material';
import BarraNavegacao from '../components/BarraNavegacao';
import FragmentoHistorico from '../components/FragmentoHistorico';


function HistoricoVendas() {
    return (

        <Box component="section" sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'top', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#EBDFD7' }}>
            <Box sx={{ width: '12%', height: '100%' }}>
                <BarraNavegacao />
            </Box>

            <Box sx={{ width: '88%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'top', flexDirection: 'column' }}>

                <Box sx={{ color: '#133337', width: '100%', height: '12%', display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ }}>Historico de Vendas</Typography>
                    <TextField id="pesquisa" label="Pesquisa" variant="outlined"></TextField>
                </Box>

                <Box sx={{ width: '100%', height: '88%', display: 'flex', backgroundColor: 'pink' }}>

                    <Box sx={{ width: '100%', height: '20%'}}>

                        <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection:'row'}}>
                            <Typography sx={{fontSize:'20px'}}>Id Produto</Typography>                                          
                            <Typography sx={{fontSize:'20px'}}>Produto</Typography>                  
                            <Typography sx={{fontSize:'20px'}}>Valor</Typography>
                            <Typography sx={{fontSize:'20px'}}>Data</Typography>
                            <Typography sx={{fontSize:'20px'}}>Matricula Vendedor</Typography>
                            <Typography sx={{fontSize:'20px'}}>Auth Code</Typography>

                        </Stack>

                    </Box>

                    <Box sx={{ width: '100%', height: '80%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

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
            </Box>
        </Box>

    )
}

export default HistoricoVendas
