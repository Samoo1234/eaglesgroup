import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
import {
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

// Dados de exemplo para clientes
const generateClients = () => {
  const clients = [];
  const clientNames = [
    'TechCorp Inc.',
    'Coastal Living Developers',
    'City Hospital Expansion',
    'Mountain View Residences',
    'Retail Development Group',
    'Public School District',
    'Green Energy Solutions',
    'Luxury Hotel Chain',
    'Industrial Complex',
    'Residential Towers',
    'Office Park Development',
    'Community Center',
    'Sports Stadium',
    'Shopping Mall Renovations',
    'Departamento de Transportes',
  ];
  
  for (let i = 1; i <= 15; i++) {
    clients.push({
      id: i,
      name: clientNames[i - 1],
      email: `contato@${clientNames[i - 1].toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `(555) ${100 + i}-${1000 + i}`,
      address: `${1000 + i} Business Ave, Suite ${100 + i}`,
      city: 'Miami',
      state: 'FL',
      zipCode: `33${100 + i}`,
    });
  }
  return clients;
};

// Dados de exemplo para gerentes de projeto
const projectManagers = [
  { id: 1, name: 'João Silva', role: 'Gerente de Projeto Sênior' },
  { id: 2, name: 'Maria Oliveira', role: 'Gerente de Projeto' },
  { id: 3, name: 'Carlos Santos', role: 'Gerente de Projeto' },
  { id: 4, name: 'Ana Pereira', role: 'Gerente de Projeto Sênior' },
  { id: 5, name: 'Roberto Almeida', role: 'Gerente de Projeto' },
];

const clients = generateClients();

const steps = ['Informações Básicas', 'Detalhes Financeiros', 'Equipe e Materiais', 'Revisão'];

const ProjectAdd = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: null,
    company: '',
    startDate: null,
    endDate: null,
    status: 'Planejamento',
    budget: '',
    laborCost: '',
    materialsCost: '',
    otherCosts: '',
    manager: null,
    team: [],
    initialMaterials: [],
  });
  const [errors, setErrors] = useState({});
  
  // Manipuladores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleDateChange = (name, date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleClientChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      client: newValue,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors.client) {
      setErrors((prev) => ({
        ...prev,
        client: '',
      }));
    }
  };
  
  const handleManagerChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      manager: newValue,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors.manager) {
      setErrors((prev) => ({
        ...prev,
        manager: '',
      }));
    }
  };
  
  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      if (!formData.name) newErrors.name = 'Nome do projeto é obrigatório';
      if (!formData.client) newErrors.client = 'Cliente é obrigatório';
      if (!formData.company) newErrors.company = 'Empresa é obrigatória';
      if (!formData.startDate) newErrors.startDate = 'Data de início é obrigatória';
      if (!formData.endDate) newErrors.endDate = 'Data de término é obrigatória';
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        newErrors.endDate = 'Data de término deve ser posterior à data de início';
      }
    } else if (activeStep === 1) {
      if (!formData.budget) newErrors.budget = 'Orçamento total é obrigatório';
    } else if (activeStep === 2) {
      if (!formData.manager) newErrors.manager = 'Gerente do projeto é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSubmit = () => {
    // Aqui você enviaria os dados para a API
    console.log('Dados do formulário:', formData);
    
    // Redirecionar para a lista de projetos
    navigate('/dashboard/projects');
  };
  
  // Formatar moeda
  const formatCurrency = (value) => {
    if (!value) return '';
    
    // Remover caracteres não numéricos
    const numericValue = value.toString().replace(/[^0-9]/g, '');
    
    // Formatar como moeda
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericValue / 100).replace('$', '');
  };
  
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    
    // Formatar o valor como moeda
    const formattedValue = formatCurrency(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Calcular custos totais
  const calculateTotalCosts = () => {
    const laborCost = parseFloat(formData.laborCost?.replace(/[^0-9]/g, '')) || 0;
    const materialsCost = parseFloat(formData.materialsCost?.replace(/[^0-9]/g, '')) || 0;
    const otherCosts = parseFloat(formData.otherCosts?.replace(/[^0-9]/g, '')) || 0;
    
    return (laborCost + materialsCost + otherCosts) / 100;
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Button
            component={RouterLink}
            to="/dashboard/projects"
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Voltar
          </Button>
          <Typography variant="h4">
            Adicionar Novo Projeto
          </Typography>
        </Box>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Informações Básicas do Projeto
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome do Projeto"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descrição do Projeto"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    options={clients}
                    getOptionLabel={(option) => option.name}
                    value={formData.client}
                    onChange={handleClientChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Cliente"
                        error={!!errors.client}
                        helperText={errors.client}
                        required
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.company} required>
                    <InputLabel>Empresa</InputLabel>
                    <Select
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      label="Empresa"
                    >
                      <MenuItem value="Eagles Group LLC">Eagles Group LLC</MenuItem>
                      <MenuItem value="Brazilian Concrete LLC">Brazilian Concrete LLC</MenuItem>
                      <MenuItem value="Eagles Cleaning LLC">Eagles Cleaning LLC</MenuItem>
                    </Select>
                    {errors.company && <FormHelperText>{errors.company}</FormHelperText>}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Data de Início"
                    value={formData.startDate}
                    onChange={(date) => handleDateChange('startDate', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Data de Término Prevista"
                    value={formData.endDate}
                    onChange={(date) => handleDateChange('endDate', date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!errors.endDate,
                        helperText: errors.endDate
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status do Projeto</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status do Projeto"
                    >
                      <MenuItem value="Planejamento">Planejamento</MenuItem>
                      <MenuItem value="Em andamento">Em andamento</MenuItem>
                      <MenuItem value="Em pausa">Em pausa</MenuItem>
                      <MenuItem value="Concluído">Concluído</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Detalhes Financeiros
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Orçamento Total"
                    name="budget"
                    value={formData.budget}
                    onChange={handleCurrencyChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    error={!!errors.budget}
                    helperText={errors.budget}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Custo de Mão de Obra"
                    name="laborCost"
                    value={formData.laborCost}
                    onChange={handleCurrencyChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Custo de Materiais"
                    name="materialsCost"
                    value={formData.materialsCost}
                    onChange={handleCurrencyChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Outros Custos"
                    name="otherCosts"
                    value={formData.otherCosts}
                    onChange={handleCurrencyChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                
                {(formData.laborCost || formData.materialsCost || formData.otherCosts) && (
                  <Grid item xs={12}>
                    <Card sx={{ bgcolor: 'background.default' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Resumo de Custos
                        </Typography>
                        <Grid container spacing={2}>
                          {formData.laborCost && (
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Mão de Obra:
                              </Typography>
                              <Typography variant="body1">
                                ${parseFloat(formData.laborCost.replace(/[^0-9]/g, '')) / 100}
                              </Typography>
                            </Grid>
                          )}
                          
                          {formData.materialsCost && (
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Materiais:
                              </Typography>
                              <Typography variant="body1">
                                ${parseFloat(formData.materialsCost.replace(/[^0-9]/g, '')) / 100}
                              </Typography>
                            </Grid>
                          )}
                          
                          {formData.otherCosts && (
                            <Grid item xs={12} sm={4}>
                              <Typography variant="body2" color="text.secondary">
                                Outros:
                              </Typography>
                              <Typography variant="body1">
                                ${parseFloat(formData.otherCosts.replace(/[^0-9]/g, '')) / 100}
                              </Typography>
                            </Grid>
                          )}
                          
                          <Grid item xs={12}>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle1">
                                Total de Custos:
                              </Typography>
                              <Typography variant="subtitle1" fontWeight="bold">
                                ${calculateTotalCosts()}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
          
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Equipe e Materiais
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={projectManagers}
                    getOptionLabel={(option) => `${option.name} (${option.role})`}
                    value={formData.manager}
                    onChange={handleManagerChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gerente do Projeto"
                        error={!!errors.manager}
                        helperText={errors.manager}
                        required
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Membros da Equipe
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Você poderá adicionar membros da equipe após a criação do projeto.
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Materiais Iniciais
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Você poderá adicionar materiais após a criação do projeto.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Revisão do Projeto
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <BusinessIcon sx={{ mr: 1 }} color="primary" />
                        <Typography variant="h6">
                          Informações Básicas
                        </Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Nome:</strong> {formData.name}
                      </Typography>
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Cliente:</strong> {formData.client?.name}
                      </Typography>
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Empresa:</strong> {formData.company}
                      </Typography>
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Data de Início:</strong> {formData.startDate?.toLocaleDateString()}
                      </Typography>
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Data de Término:</strong> {formData.endDate?.toLocaleDateString()}
                      </Typography>
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Status:</strong> {formData.status}
                      </Typography>
                      
                      {formData.description && (
                        <>
                          <Typography variant="body1" gutterBottom>
                            <strong>Descrição:</strong>
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {formData.description}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AttachMoneyIcon sx={{ mr: 1 }} color="primary" />
                        <Typography variant="h6">
                          Detalhes Financeiros
                        </Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Orçamento Total:</strong> ${parseFloat(formData.budget?.replace(/[^0-9]/g, '')) / 100 || 0}
                      </Typography>
                      
                      {formData.laborCost && (
                        <Typography variant="body1" gutterBottom>
                          <strong>Custo de Mão de Obra:</strong> ${parseFloat(formData.laborCost.replace(/[^0-9]/g, '')) / 100}
                        </Typography>
                      )}
                      
                      {formData.materialsCost && (
                        <Typography variant="body1" gutterBottom>
                          <strong>Custo de Materiais:</strong> ${parseFloat(formData.materialsCost.replace(/[^0-9]/g, '')) / 100}
                        </Typography>
                      )}
                      
                      {formData.otherCosts && (
                        <Typography variant="body1" gutterBottom>
                          <strong>Outros Custos:</strong> ${parseFloat(formData.otherCosts.replace(/[^0-9]/g, '')) / 100}
                        </Typography>
                      )}
                      
                      {(formData.laborCost || formData.materialsCost || formData.otherCosts) && (
                        <>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body1" fontWeight="bold">
                            <strong>Total de Custos:</strong> ${calculateTotalCosts()}
                          </Typography>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ mr: 1 }} color="primary" />
                        <Typography variant="h6">
                          Equipe do Projeto
                        </Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      
                      <Typography variant="body1" gutterBottom>
                        <strong>Gerente do Projeto:</strong> {formData.manager?.name} ({formData.manager?.role})
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Voltar
              </Button>
            )}
            
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Próximo
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Criar Projeto
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ProjectAdd;
