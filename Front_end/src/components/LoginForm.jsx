import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputAdornment,
    IconButton,
    Typography,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CustomCheckbox = styled(Checkbox)(() => ({
    padding: 0,
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '& svg': {
        width: 23,
        height: 24,
    },
    '& input': {
        display: 'none',
    },
}));

const icon = (
    <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="24"
        viewBox="0 0 23 24"
    >
        <rect
            y="0.71875"
            width="21.5243"
            height="22"
            rx="2"
            fill="#E65F2B"
            fillOpacity="0.10"
            stroke="#E65F2B"
            strokeOpacity="0.25"
        />
    </Box>
);

const checkedIcon = (
    <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="24"
        viewBox="0 0 23 24"
    >
        <rect
            y="0.71875"
            width="21.5243"
            height="22"
            rx="2"
            fill="#E65F2B"
            fillOpacity="0.10"
            stroke="#E65F2B"
            strokeOpacity="0.25"
        />
        <path
            d="M4.8916 11.1731L9.16089 15.5367L16.6321 7.90039"
            stroke="#E65F2B"
            strokeWidth="1.5"
            fill="none" 
        />
    </Box>
);

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Usuário é obrigatório'),
    password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Formik
                initialValues={{ email: '', password: '', remember: false }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <FormControl fullWidth margin="normal">
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                                autoComplete="username"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <Field
                                as={TextField}
                                name="password"
                                label="Senha"
                                type={showPassword ? 'text' : 'password'}
                                variant="standard"
                                fullWidth
                                autoComplete="current-password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
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
                                    ),
                                }}
                            />
                        </FormControl>

                        <Box
                            sx={{
                                mt: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Field
                                        as={CustomCheckbox}
                                        name="remember"
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                    />
                                }
                                label=' Lembrar-me'	
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting || loading}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    backgroundColor: '#FF6B00',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#e65900',
                                    },
                                }}
                            >
                                Entrar
                            </Button>
                        </Box>

                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
}
