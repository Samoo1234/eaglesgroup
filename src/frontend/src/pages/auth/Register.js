import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { register } from '../../redux/slices/authSlice';
import eaglesLogo from '../../assets/images/eagles-logo.svg';

const steps = ['Informações Pessoais', 'Informações da Empresa', 'Credenciais'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companyType: '',
    position: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading: isLoadingRedux } = useSelector((state) => state.auth);
  
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeTerms' ? checked : value,
    });
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar dados do formulário
    if (activeStep === 0) {
      // Validar informações pessoais
      if (!formData.firstName || !formData.lastName || !formData.email) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Avançar para o próximo passo
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      // Validar informações da empresa
      if (!formData.companyName || !formData.position) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Avançar para o próximo passo
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      // Validar credenciais
      if (!formData.password || !formData.confirmPassword) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      
      try {
        // Usar o Firebase para criar usuário
        setIsLoading(true);
        
        // Importar funções do Firebase de forma direta
        const firebase = await import('firebase/app');
        const firebaseAuth = await import('firebase/auth');
        const firestore = await import('firebase/firestore');
        
        // Obter referências do Firebase
        const { auth, db } = await import('../../firebase/config');
        
        console.log('Iniciando criação de usuário no Firebase');
        
        // Criar usuário no Firebase Authentication
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        console.log('Usuário criado:', userCredential);
        
        const user = userCredential.user;
        
        // Atualizar o perfil do usuário
        await firebaseAuth.updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        });
        
        console.log('Perfil atualizado');
        
        // Salvar dados adicionais no Firestore
        const userDocRef = firestore.doc(db, 'users', user.uid);
        await firestore.setDoc(userDocRef, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || '',
          company: {
            name: formData.companyName,
            type: formData.companyType || 'construction',
          },
          position: formData.position,
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        console.log('Dados salvos no Firestore');
        
        // Criar objeto de usuário
        const userData = {
          id: user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: 'user',
          avatar: null
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
          type: 'auth/register/fulfilled',
          payload: userData
        });
        
        // Redirecionar para o Dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        
        if (error.code === 'auth/email-already-in-use') {
          setError('Este email já está sendo usado por outra conta.');
        } else if (error.code === 'auth/invalid-email') {
          setError('Email inválido.');
        } else if (error.code === 'auth/weak-password') {
          setError('A senha é muito fraca. Use pelo menos 6 caracteres.');
        } else if (error.code === 'auth/network-request-failed') {
          setError('Erro de conexão com a internet. Verifique sua conexão e tente novamente.');
        } else if (error.code === 'auth/operation-not-allowed') {
          setError('O registro de novos usuários está desabilitado temporariamente.');
        } else {
          setError(`Erro ao criar conta: ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Telefone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                Próximo
              </Button>
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyName"
                  label="Nome da Empresa"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="companyType"
                  label="Tipo de Empresa"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Cargo"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                onClick={handleBack}
                sx={{ mt: 3, ml: 1 }}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                Próximo
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Senha"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      color="primary"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                  }
                  label="Eu concordo com os Termos de Serviço e Política de Privacidade."
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                onClick={handleBack}
                sx={{ mt: 3, ml: 1 }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                disabled={isLoading || isLoadingRedux || !formData.agreeTerms}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Cadastrar'}
              </Button>
            </Box>
          </>
        );
      default:
        return 'Passo desconhecido';
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
            backgroundImage: 'url(https://source.unsplash.com/random?construction,building)',
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
              Cadastro
            </Typography>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box sx={{ width: '100%', mt: 3 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {getStepContent(activeStep)}
              </Box>
              <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Já tem uma conta? Faça login
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

export default Register;
