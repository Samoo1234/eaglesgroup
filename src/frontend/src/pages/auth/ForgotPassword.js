import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // API call to request password reset
      await axios.post('/api/auth/forgot-password', { email });
      
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Ocorreu um erro ao processar sua solicitação.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <img src={eaglesLogo || '/logo.svg'} alt="Eagles Group LLC" height="60" />
        </Box>
        <Typography component="h1" variant="h5">
          Recuperação de Senha
        </Typography>
        
        {success ? (
          <Box sx={{ mt: 3, width: '100%' }}>
            <Alert severity="success">
              Um email com instruções para redefinir sua senha foi enviado para {email}.
            </Alert>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                component={RouterLink}
                to="/login"
                startIcon={<ArrowBackIcon />}
              >
                Voltar para o Login
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
            <Typography variant="body2" sx={{ mt: 2, mb: 3, textAlign: 'center' }}>
              Digite seu endereço de email e enviaremos um link para redefinir sua senha.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Enviar Link de Recuperação'}
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

export default ForgotPassword;
