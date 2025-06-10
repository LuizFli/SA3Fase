import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Typography,
    InputAdornment,
    IconButton,
    Stack
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de login aqui
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: '500px', // ou até mais se quiser
                px: 2,
            }}
        >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                E-mail
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                required
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                variant="standard"
            />

            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Senha
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 2 }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            color="primary"
                            sx={{
                                color: '#FF6D00',
                                '&.Mui-checked': {
                                    color: '#FF6D00',
                                },
                            }}
                        />
                    }
                    label="Lembrar-me"
                />

                <Button
                    variant="contained"
                    type="submit"
                    size="medium"
                    sx={{
                        px: 4,
                        py: 1,
                        borderRadius: 5,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '0.875rem',
                        backgroundColor: '#FF6D00',
                    }}
                >
                    Entrar
                </Button>
            </Stack>
        </Box>
    );
}
