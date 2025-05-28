import { Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginHeader() {
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Acesse o SaleSight
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Insira suas credenciais para continuar
      </Typography>
    </>
  );
}