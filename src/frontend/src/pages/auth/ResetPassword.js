import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';
import eaglesLogo from '../../assets/images/eagles-logo.svg';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [tokenChecked, setTokenChecked] = useState(false);
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // API call to verify reset token
        await axios.get(`/api/auth/reset-password/${token}`);
        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);
        setError('O link de redefinição de senha é inválido ou expirou.');
      } finally {
        setTokenChecked(true);
      }
    };
    
    verifyToken();
  }, [token]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // API call to reset password
      await axios.post(`/api/auth/reset-password/${token}`, {
        password: formData.password,
      });
      
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Ocorreu um erro ao redefinir sua senha.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!tokenChecked) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Verificando link de redefinição de senha...
          </Typography>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <img src={eaglesLogo || '/logo.svg'} alt="Eagles Group LLC" height="60" />
        </Box>
        <Typography component="h1" variant="h5">
          Redefinir Senha
        </Typography>
        
        {!tokenValid ? (
          <Box sx={{ mt: 3, width: '100%' }}>
            <Alert severity="error">
              {error}
            </Alert>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/forgot-password"
                variant="contained"
              >
                Solicitar Novo Link
              </Button>
            </Box>
          </Box>
        ) : success ? (
          <Box sx={{ mt: 3, width: '100%' }}>
            <Alert severity="success">
              Sua senha foi redefinida com sucesso! Você será redirecionado para a página de login.
            </Alert>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<ArrowBackIcon />}
              >
                Ir para o Login
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Nova Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Nova Senha"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !formData.password || !formData.confirmPassword}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Redefinir Senha'}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Voltar para o Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://eaglesgroupllc.com/">
              Eagles Group LLC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
