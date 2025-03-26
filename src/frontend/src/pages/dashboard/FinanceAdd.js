import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  AttachMoney as AttachMoneyIcon,
  MoneyOff as MoneyOffIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  DateRange as DateRangeIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  Note as NoteIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';

// Dados de exemplo para clientes e projetos
const clients = [
  { id: 1, name: 'TechCorp Inc.' },
  { id: 2, name: 'Coastal Living Developers' },
  { id: 3, name: 'City Hospital Expansion' },
  { id: 4, name: 'Mountain View Residences' },
  { id: 5, name: 'Retail Development Group' },
  { id: 6, name: 'Public School District' },
  { id: 7, name: 'Green Energy Solutions' },
  { id: 8, name: 'Luxury Hotel Chain' },
  { id: 9, name: 'Industrial Complex' },
  { id: 10, name: 'Residential Towers' },
];

const projects = [
  { id: 1, name: 'Construção de Sede Corporativa', clientId: 1 },
  { id: 2, name: 'Reforma de Escritórios', clientId: 2 },
  { id: 3, name: 'Manutenção Predial', clientId: 3 },
  { id: 4, name: 'Construção de Complexo Residencial', clientId: 4 },
  { id: 5, name: 'Reforma de Shopping', clientId: 5 },
  { id: 6, name: 'Ampliação de Hospital', clientId: 3 },
  { id: 7, name: 'Instalação de Sistema de Energia Solar', clientId: 7 },
  { id: 8, name: 'Construção de Hotel', clientId: 8 },
  { id: 9, name: 'Reforma de Escola', clientId: 6 },
  { id: 10, name: 'Construção de Condomínio', clientId: 10 },
];

const companies = [
  { id: 1, name: 'Eagles Group LLC' },
  { id: 2, name: 'Brazilian Concrete LLC' },
  { id: 3, name: 'Eagles Cleaning LLC' },
];

// Categorias de transações
const categories = {
  'Receita': ['Pagamento de Projeto', 'Consultoria', 'Adiantamento', 'Venda de Material', 'Outros'],
  'Despesa': ['Material de Construção', 'Mão de Obra', 'Equipamentos', 'Administrativo', 'Impostos', 'Outros']
};

// Métodos de pagamento
const paymentMethods = ['Transferência Bancária', 'Cartão de Crédito', 'Cheque', 'Dinheiro', 'Boleto'];

// Status de transação
const transactionStatus = ['Pago', 'Pendente', 'Atrasado', 'Cancelado'];

// Passos do formulário
const steps = ['Informações Básicas', 'Detalhes de Pagamento', 'Informações Adicionais', 'Revisão'];

const FinanceAdd = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    description: '',
    amount: '',
    date: new Date(),
    dueDate: new Date(),
    paymentDate: null,
    paymentMethod: '',
    status: 'Pendente',
    client: '',
    project: '',
    company: '',
    notes: '',
    attachments: [],
  });
  const [errors, setErrors] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Manipuladores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Atualizar dados do formulário
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Lógica especial para cliente e projeto
    if (name === 'client') {
      // Filtrar projetos pelo cliente selecionado
      const clientProjects = projects.filter(project => project.clientId === parseInt(value));
      setFilteredProjects(clientProjects);
      
      // Limpar projeto selecionado se o cliente mudar
      setFormData(prev => ({ ...prev, project: '' }));
    }
    
    // Lógica para tipo de transação
    if (name === 'type') {
      // Limpar categoria ao mudar o tipo
      setFormData(prev => ({ ...prev, category: '' }));
    }
  };
  
  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [
        ...prev.attachments,
        ...files.map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          name: file.name,
          type: file.type.split('/')[1].toUpperCase(),
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          uploadDate: new Date(),
        }))
      ]
    }));
  };
  
  const handleRemoveFile = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== id)
    }));
  };
  
  const handleNext = () => {
    // Validar campos do passo atual
    const currentStepValid = validateStep(activeStep);
    
    if (currentStepValid) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos os campos
    const isValid = validateForm();
    
    if (isValid) {
      // Aqui você enviaria os dados para a API
      console.log('Dados do formulário:', formData);
      
      // Redirecionar para a lista de transações
      navigate('/dashboard/finance');
    }
  };
  
  // Validação de campos
  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;
    
    // Validação do passo 1 - Informações Básicas
    if (step === 0) {
      if (!formData.type) {
        newErrors.type = 'O tipo de transação é obrigatório';
        isValid = false;
      }
      
      if (!formData.category) {
        newErrors.category = 'A categoria é obrigatória';
        isValid = false;
      }
      
      if (!formData.description) {
        newErrors.description = 'A descrição é obrigatória';
        isValid = false;
      }
      
      if (!formData.date) {
        newErrors.date = 'A data da transação é obrigatória';
        isValid = false;
      }
    }
    
    // Validação do passo 2 - Detalhes de Pagamento
    else if (step === 1) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        newErrors.amount = 'O valor deve ser maior que zero';
        isValid = false;
      }
      
      if (!formData.dueDate) {
        newErrors.dueDate = 'A data de vencimento é obrigatória';
        isValid = false;
      }
      
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = 'O método de pagamento é obrigatório';
        isValid = false;
      }
      
      if (!formData.status) {
        newErrors.status = 'O status é obrigatório';
        isValid = false;
      }
      
      // Se o status for "Pago", a data de pagamento é obrigatória
      if (formData.status === 'Pago' && !formData.paymentDate) {
        newErrors.paymentDate = 'A data de pagamento é obrigatória para transações pagas';
        isValid = false;
      }
    }
    
    // Validação do passo 3 - Informações Adicionais
    else if (step === 2) {
      if (!formData.company) {
        newErrors.company = 'A empresa é obrigatória';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const validateForm = () => {
    // Validar todos os passos
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        setActiveStep(i);
        return false;
      }
    }
    
    return true;
  };
  
  // Formatar moeda
  const formatCurrency = (value) => {
    if (!value) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Renderizar passo atual
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return renderBasicInfoStep();
      case 1:
        return renderPaymentDetailsStep();
      case 2:
        return renderAdditionalInfoStep();
      case 3:
        return renderReviewStep();
      default:
        return null;
    }
  };
  
  // Passo 1 - Informações Básicas
  const renderBasicInfoStep = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>Tipo de Transação *</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Tipo de Transação *"
            >
              <MenuItem value="Receita">Receita</MenuItem>
              <MenuItem value="Despesa">Despesa</MenuItem>
            </Select>
            {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.category} disabled={!formData.type}>
            <InputLabel>Categoria *</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Categoria *"
            >
              {formData.type && categories[formData.type].map((category, index) => (
                <MenuItem key={index} value={category}>{category}</MenuItem>
              ))}
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data da Transação *"
            value={formData.date}
            onChange={(date) => handleDateChange('date', date)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Cliente</InputLabel>
            <Select
              name="client"
              value={formData.client}
              onChange={handleChange}
              label="Cliente"
            >
              <MenuItem value="">Nenhum</MenuItem>
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id}>{client.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!formData.client}>
            <InputLabel>Projeto</InputLabel>
            <Select
              name="project"
              value={formData.project}
              onChange={handleChange}
              label="Projeto"
            >
              <MenuItem value="">Nenhum</MenuItem>
              {filteredProjects.map(project => (
                <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  };
  
  // Passo 2 - Detalhes de Pagamento
  const renderPaymentDetailsStep = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Valor *"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Data de Vencimento *"
            value={formData.dueDate}
            onChange={(date) => handleDateChange('dueDate', date)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.dueDate,
                helperText: errors.dueDate
              }
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.paymentMethod}>
            <InputLabel>Método de Pagamento *</InputLabel>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              label="Método de Pagamento *"
            >
              {paymentMethods.map((method, index) => (
                <MenuItem key={index} value={method}>{method}</MenuItem>
              ))}
            </Select>
            {errors.paymentMethod && <FormHelperText>{errors.paymentMethod}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Status *</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status *"
            >
              {transactionStatus.map((status, index) => (
                <MenuItem key={index} value={status}>{status}</MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </Grid>
        
        {formData.status === 'Pago' && (
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Data de Pagamento *"
              value={formData.paymentDate}
              onChange={(date) => handleDateChange('paymentDate', date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.paymentDate,
                  helperText: errors.paymentDate
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    );
  };
  
  // Passo 3 - Informações Adicionais
  const renderAdditionalInfoStep = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.company}>
            <InputLabel>Empresa *</InputLabel>
            <Select
              name="company"
              value={formData.company}
              onChange={handleChange}
              label="Empresa *"
            >
              {companies.map(company => (
                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
              ))}
            </Select>
            {errors.company && <FormHelperText>{errors.company}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Observações"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Anexos
          </Typography>
          
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
          >
            Adicionar Anexos
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
          
          {formData.attachments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Arquivos Selecionados:
              </Typography>
              
              <List>
                {formData.attachments.map((attachment) => (
                  <Box key={attachment.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {attachment.name} ({attachment.type} • {attachment.size})
                    </Typography>
                    <IconButton size="small" color="error" onClick={() => handleRemoveFile(attachment.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </List>
            </Box>
          )}
        </Grid>
      </Grid>
    );
  };
  
  // Passo 4 - Revisão
  const renderReviewStep = () => {
    // Obter nomes em vez de IDs
    const clientName = formData.client ? clients.find(c => c.id === parseInt(formData.client))?.name : '-';
    const projectName = formData.project ? projects.find(p => p.id === parseInt(formData.project))?.name : '-';
    const companyName = formData.company ? companies.find(c => c.id === parseInt(formData.company))?.name : '-';
    
    return (
      <Box>
        <Alert severity="info" sx={{ mb: 3 }}>
          Por favor, revise todas as informações antes de salvar a transação.
        </Alert>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informações Básicas
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Tipo:</Typography>
                    <Typography variant="body2">{formData.type}</Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Categoria:</Typography>
                    <Typography variant="body2">{formData.category}</Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Descrição:</Typography>
                    <Typography variant="body2">{formData.description}</Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Data da Transação:</Typography>
                    <Typography variant="body2">
                      {formData.date ? formData.date.toLocaleDateString('pt-BR') : '-'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Cliente:</Typography>
                    <Typography variant="body2">{clientName}</Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Projeto:</Typography>
                    <Typography variant="body2">{projectName}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Detalhes de Pagamento
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Valor:</Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 'bold',
                      color: formData.type === 'Receita' ? 'success.main' : 'error.main'
                    }}>
                      {formData.amount ? formatCurrency(formData.amount) : '-'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Data de Vencimento:</Typography>
                    <Typography variant="body2">
                      {formData.dueDate ? formData.dueDate.toLocaleDateString('pt-BR') : '-'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Método de Pagamento:</Typography>
                    <Typography variant="body2">{formData.paymentMethod}</Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Status:</Typography>
                    <Typography variant="body2">{formData.status}</Typography>
                  </Grid>
                  
                  {formData.status === 'Pago' && (
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Data de Pagamento:</Typography>
                      <Typography variant="body2">
                        {formData.paymentDate ? formData.paymentDate.toLocaleDateString('pt-BR') : '-'}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
            
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informações Adicionais
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Empresa:</Typography>
                    <Typography variant="body2">{companyName}</Typography>
                  </Grid>
                  
                  {formData.notes && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Observações:</Typography>
                      <Typography variant="body2">{formData.notes}</Typography>
                    </Grid>
                  )}
                  
                  {formData.attachments.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Anexos:</Typography>
                      {formData.attachments.map((attachment) => (
                        <Typography key={attachment.id} variant="body2">
                          {attachment.name} ({attachment.type} • {attachment.size})
                        </Typography>
                      ))}
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            component={RouterLink}
            to="/dashboard/finance"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Transações
          </Button>
          <Typography variant="h4" gutterBottom>
            Nova Transação Financeira
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preencha os campos abaixo para adicionar uma nova transação financeira
          </Typography>
        </Box>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Salvar Transação
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default FinanceAdd;
