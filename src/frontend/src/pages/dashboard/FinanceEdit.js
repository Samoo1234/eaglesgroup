import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
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
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';

// Dados de exemplo para transações financeiras
const generateTransactions = () => {
  const transactions = [];
  const types = ['Receita', 'Despesa'];
  const categories = {
    'Receita': ['Pagamento de Projeto', 'Consultoria', 'Adiantamento', 'Venda de Material', 'Outros'],
    'Despesa': ['Material de Construção', 'Mão de Obra', 'Equipamentos', 'Administrativo', 'Impostos', 'Outros']
  };
  const projects = [
    'Construção de Sede Corporativa',
    'Reforma de Escritórios',
    'Manutenção Predial',
    'Construção de Complexo Residencial',
    'Reforma de Shopping',
    'Ampliação de Hospital',
    'Instalação de Sistema de Energia Solar',
    'Construção de Hotel',
    'Reforma de Escola',
    'Construção de Condomínio',
  ];
  const clients = [
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
  ];
  const paymentMethods = ['Transferência Bancária', 'Cartão de Crédito', 'Cheque', 'Dinheiro', 'Boleto'];
  const status = ['Pago', 'Pendente', 'Atrasado', 'Cancelado'];
  
  // Gerar transações para os últimos 12 meses
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(startDate.getMonth() - 11);
  
  for (let i = 1; i <= 100; i++) {
    const transactionDate = new Date(startDate);
    transactionDate.setDate(1);
    transactionDate.setMonth(startDate.getMonth() + Math.floor(Math.random() * 12));
    transactionDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[type][Math.floor(Math.random() * categories[type].length)];
    const projectIndex = Math.floor(Math.random() * projects.length);
    const clientIndex = Math.floor(Math.random() * clients.length);
    
    const amount = type === 'Receita' 
      ? Math.floor(Math.random() * 50000) + 10000 
      : Math.floor(Math.random() * 20000) + 1000;
    
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const statusValue = status[Math.floor(Math.random() * status.length)];
    
    const dueDate = new Date(transactionDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 15);
    
    const paymentDate = statusValue === 'Pago' 
      ? new Date(dueDate.getTime() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) 
      : null;
    
    transactions.push({
      id: i,
      transactionId: `TRX-${10000 + i}`,
      date: transactionDate,
      dueDate: dueDate,
      paymentDate: paymentDate,
      type: type,
      category: category,
      description: `${type === 'Receita' ? 'Recebimento' : 'Pagamento'} - ${category}`,
      amount: amount,
      project: projectIndex >= 0 ? projects[projectIndex] : null,
      projectId: projectIndex >= 0 ? projectIndex + 1 : null,
      client: clientIndex >= 0 ? clients[clientIndex] : null,
      clientId: clientIndex >= 0 ? clientIndex + 1 : null,
      paymentMethod: paymentMethod,
      status: statusValue,
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
      createdBy: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      companyId: Math.floor(Math.random() * 3) + 1,
      attachments: Math.random() > 0.5 ? [
        { id: 1, name: 'Comprovante.pdf', type: 'PDF', size: '2.5 MB', uploadDate: transactionDate },
        { id: 2, name: 'Nota_Fiscal.pdf', type: 'PDF', size: '1.8 MB', uploadDate: transactionDate }
      ] : [],
    });
  }
  
  // Ordenar por data (mais recente primeiro)
  transactions.sort((a, b) => b.date - a.date);
  
  return transactions;
};

const transactions = generateTransactions();

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

const FinanceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [transaction, setTransaction] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    description: '',
    amount: '',
    date: new Date(),
    dueDate: new Date(),
    paymentDate: null,
    paymentMethod: '',
    status: '',
    client: '',
    project: '',
    company: '',
    notes: '',
    attachments: [],
  });
  const [errors, setErrors] = useState({});
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Buscar transação pelo ID
  useEffect(() => {
    // Simulando busca de transação
    const foundTransaction = transactions.find(t => t.id === parseInt(id));
    
    if (foundTransaction) {
      setTransaction(foundTransaction);
      
      // Preencher formulário com dados da transação
      setFormData({
        type: foundTransaction.type,
        category: foundTransaction.category,
        description: foundTransaction.description,
        amount: foundTransaction.amount,
        date: foundTransaction.date,
        dueDate: foundTransaction.dueDate,
        paymentDate: foundTransaction.paymentDate,
        paymentMethod: foundTransaction.paymentMethod,
        status: foundTransaction.status,
        client: foundTransaction.clientId || '',
        project: foundTransaction.projectId || '',
        company: foundTransaction.companyId || '',
        notes: foundTransaction.notes || '',
        attachments: foundTransaction.attachments || [],
      });
      
      // Filtrar projetos pelo cliente selecionado
      if (foundTransaction.clientId) {
        const clientProjects = projects.filter(project => project.clientId === foundTransaction.clientId);
        setFilteredProjects(clientProjects);
      }
    }
  }, [id]);
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Atualizar dados do formulário
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
    
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
    setHasChanges(true);
    
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
    setHasChanges(true);
  };
  
  const handleRemoveFile = (id) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(attachment => attachment.id !== id)
    }));
    setHasChanges(true);
  };
  
  const handleCancel = () => {
    if (hasChanges) {
      setOpenDialog(true);
    } else {
      navigate(`/dashboard/finance/${id}`);
    }
  };
  
  const handleConfirmCancel = () => {
    setOpenDialog(false);
    navigate(`/dashboard/finance/${id}`);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar todos os campos
    const isValid = validateForm();
    
    if (isValid) {
      // Aqui você enviaria os dados para a API
      console.log('Dados do formulário:', formData);
      
      // Redirecionar para a página de detalhes da transação
      navigate(`/dashboard/finance/${id}`);
    }
  };
  
  // Validação de campos
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validar campos obrigatórios
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
    
    if (!formData.company) {
      newErrors.company = 'A empresa é obrigatória';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
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
  
  if (!transaction) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Transação não encontrada</Typography>
        <Button
          component={RouterLink}
          to="/dashboard/finance"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Voltar para Lista de Transações
        </Button>
      </Container>
    );
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            component={RouterLink}
            to={`/dashboard/finance/${id}`}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Detalhes da Transação
          </Button>
          <Typography variant="h4" gutterBottom>
            Editar Transação
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {transaction.transactionId}
          </Typography>
        </Box>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Informações Básicas" icon={<ReceiptIcon />} iconPosition="start" />
            <Tab label="Detalhes de Pagamento" icon={<AttachMoneyIcon />} iconPosition="start" />
            <Tab label="Informações Adicionais" icon={<NoteIcon />} iconPosition="start" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              {/* Aba de Informações Básicas */}
              {tabValue === 0 && (
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
              )}
              
              {/* Aba de Detalhes de Pagamento */}
              {tabValue === 1 && (
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
              )}
              
              {/* Aba de Informações Adicionais */}
              {tabValue === 2 && (
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
                          Arquivos:
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
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancel}
                  startIcon={<CancelIcon />}
                  sx={{ mr: 1 }}
                >
                  Cancelar
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
      
      {/* Diálogo de confirmação de cancelamento */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Descartar Alterações</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem alterações não salvas. Tem certeza de que deseja descartar essas alterações?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Continuar Editando
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Descartar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default FinanceEdit;
