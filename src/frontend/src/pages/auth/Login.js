import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { login } from '../../redux/slices/authSlice';
import eaglesLogo from '../../assets/images/eagles-logo.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: isLoadingRedux, error, isAuthenticated } = useSelector((state) => state.auth);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirecionar para o Dashboard se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password, rememberMe } = formData;
    
    // Validação básica
    if (!email || !password) {
      setIsError(true);
      setErrorMessage('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      // Usar o Firebase para autenticação
      setIsLoading(true);
      
      // Importar função de login do Firebase
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      const { auth } = await import('../../firebase/config');
      
      // Tentar fazer login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Criar objeto de usuário
      const userData = {
        id: user.uid,
        firstName: user.displayName ? user.displayName.split(' ')[0] : 'Usuário',
        lastName: user.displayName ? user.displayName.split(' ').slice(1).join(' ') : '',
        email: user.email,
        role: 'admin', // Por padrão, definimos como admin
        avatar: user.photoURL
      };
      
      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Empresa padrão
      const defaultCompany = {
        id: 1,
        name: 'Eagles Group LLC',
        type: 'construction'
      };
      localStorage.setItem('currentCompany', JSON.stringify(defaultCompany));
      
      // Atualizar o estado do Redux
      dispatch({
        type: 'auth/login/fulfilled',
        payload: userData
      });
      
      // Redirecionar para o Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro de autenticação:', error);
      
      // Verificar se é um erro de usuário não encontrado ou senha incorreta
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setIsError(true);
        setErrorMessage('Email ou senha incorretos');
      } else if (error.code === 'auth/too-many-requests') {
        setIsError(true);
        setErrorMessage('Muitas tentativas de login. Tente novamente mais tarde');
      } else {
        setIsError(true);
        setErrorMessage('Erro ao fazer login. Tente novamente');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container component="main" maxWidth="lg">
      <Grid container sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?construction)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <img src={eaglesLogo || '/logo.svg'} alt="Eagles Group LLC" height="60" />
            </Box>
            <Typography component="h1" variant="h5">
              Acesso ao Sistema
            </Typography>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}
            {isError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Alert severity="info" sx={{ width: '100%', mt: 2, mb: 2 }}>
              <Typography variant="body2">
                <strong>Credenciais de teste:</strong><br />
                Crie uma conta no sistema ou use:<br />
                Email: admin@eaglesgroup.com<br />
                Senha: password123
              </Typography>
            </Alert>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    color="primary"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                }
                label="Lembrar-me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/forgot-password" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
