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
    FormHelperText,
    InputAdornment,
    IconButton,
    Link,
    Typography,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Schema de validação
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .required('Senha é obrigatória')
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values.email, values.password);
            navigate('/dashbord');
        } catch (err) {
            console.error('Login failed:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form style={{ width: '100%', marginTop: 3 }}>
                    <FormControl fullWidth margin="normal">
                        <Field
                            as={TextField}
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            fullWidth
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
                            variant="outlined"
                            fullWidth
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
                                )
                            }}
                        />
                    </FormControl>

                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting || loading}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {isSubmitting || loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link href="/forgot-password" variant="body2">
                            Esqueceu a senha?
                        </Link>
                        <Typography variant="body2">
                            Não tem conta?{' '}
                            <Link href="/register" variant="body2">
                                Cadastre-se
                            </Link>
                        </Typography>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}