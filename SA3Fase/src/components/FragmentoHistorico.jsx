import React from 'react'
import { Box } from '@mui/material'

function FragmentoHistorico(props) {
  return (
    <div>
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid grey' }}>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.nome}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.matricula}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.status}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.nota1}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.nota2}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.nota3}</p>
            </Box>
            <Box sx={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{props.nota4}</p>
            </Box>
        </Box>
      
    </div>
  )
}

export default FragmentoHistorico
