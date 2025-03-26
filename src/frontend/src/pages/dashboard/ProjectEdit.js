import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Tab,
  Tabs,
  TextField,
  Typography,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Dados de exemplo para projetos
const generateProjects = () => {
  const projects = [];
  const projectNames = [
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
  ];
  
  const statuses = ['Em andamento', 'Concluído', 'Planejamento', 'Em pausa'];
  
  for (let i = 1; i <= 10; i++) {
    const startDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 12) + 3);
    
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const progress = statuses[statusIndex] === 'Concluído' ? 100 : 
                    statuses[statusIndex] === 'Planejamento' ? Math.floor(Math.random() * 20) :
                    statuses[statusIndex] === 'Em pausa' ? Math.floor(Math.random() * 70) + 10 :
                    Math.floor(Math.random() * 80) + 20;
    
    projects.push({
      id: i,
      projectId: `PRJ-${2000 + i}`,
      name: projectNames[i - 1],
      client: {
        id: i,
        name: clientNames[i - 1],
        email: `contato@${clientNames[i - 1].toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `(555) ${100 + i}-${1000 + i}`,
      },
      clientId: i,
      startDate: startDate,
      endDate: endDate,
      status: statuses[statusIndex],
      progress: progress,
      budget: (Math.floor(Math.random() * 10) + 1) * 100000,
      spent: (Math.floor(Math.random() * 8) + 1) * 100000,
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
      manager: {
        id: Math.floor(Math.random() * 5) + 1,
        name: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira', 'Roberto Almeida'][Math.floor(Math.random() * 5)],
        role: ['Gerente de Projeto Sênior', 'Gerente de Projeto'][Math.floor(Math.random() * 2)],
      },
      team: [
        {
          id: 1,
          name: 'João Silva',
          role: 'Gerente de Projeto',
          email: 'joao.silva@eaglesgroup.com',
          phone: '(555) 123-4567',
        },
        {
          id: 2,
          name: 'Maria Oliveira',
          role: 'Engenheira Civil',
          email: 'maria.oliveira@eaglesgroup.com',
          phone: '(555) 234-5678',
        },
        {
          id: 3,
          name: 'Carlos Santos',
          role: 'Arquiteto',
          email: 'carlos.santos@eaglesgroup.com',
          phone: '(555) 345-6789',
        }
      ],
      tasks: [
        {
          id: 1,
          title: 'Preparação do terreno',
          status: 'Concluído',
          assignedTo: 'João Silva',
          dueDate: startDate.toISOString().split('T')[0],
          completedDate: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          id: 2,
          title: 'Fundação',
          status: 'Em andamento',
          assignedTo: 'Maria Oliveira',
          dueDate: new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          id: 3,
          title: 'Estrutura',
          status: 'Pendente',
          assignedTo: 'Carlos Santos',
          dueDate: new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }
      ],
      materials: [
        {
          id: 1,
          name: 'Cimento Portland',
          quantity: 500,
          unit: 'sacos',
          unitPrice: 25,
          totalPrice: 12500,
          status: 'Entregue',
        },
        {
          id: 2,
          name: 'Aço CA-50',
          quantity: 2000,
          unit: 'kg',
          unitPrice: 5,
          totalPrice: 10000,
          status: 'Entregue',
        },
        {
          id: 3,
          name: 'Tijolos',
          quantity: 10000,
          unit: 'unidades',
          unitPrice: 0.8,
          totalPrice: 8000,
          status: 'Pendente',
        }
      ],
      documents: [
        {
          id: 1,
          name: 'Contrato.pdf',
          type: 'PDF',
          size: '2.5 MB',
          uploadedBy: 'João Silva',
          uploadDate: startDate.toISOString().split('T')[0],
        },
        {
          id: 2,
          name: 'Planta_Baixa.dwg',
          type: 'DWG',
          size: '5.8 MB',
          uploadedBy: 'Carlos Santos',
          uploadDate: new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          id: 3,
          name: 'Cronograma.xlsx',
          type: 'XLSX',
          size: '1.2 MB',
          uploadedBy: 'Maria Oliveira',
          uploadDate: new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        }
      ]
    });
  }
  return projects;
};

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

const projects = generateProjects();
const clients = generateClients();

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: null,
    company: '',
    startDate: null,
    endDate: null,
    status: '',
    budget: '',
    progress: 0,
    manager: null,
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Buscar projeto pelo ID
  useEffect(() => {
    // Simulando busca de projeto
    const foundProject = projects.find(p => p.id === parseInt(id));
    
    if (foundProject) {
      setProject(foundProject);
      setFormData({
        name: foundProject.name,
        description: foundProject.description,
        client: foundProject.client,
        company: foundProject.company,
        startDate: foundProject.startDate,
        endDate: foundProject.endDate,
        status: foundProject.status,
        budget: formatCurrency(foundProject.budget),
        progress: foundProject.progress,
        manager: foundProject.manager,
      });
    }
  }, [id]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Manipuladores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
    
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
    setHasChanges(true);
    
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
    setHasChanges(true);
    
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
    setHasChanges(true);
    
    // Limpar erro quando o campo é preenchido
    if (errors.manager) {
      setErrors((prev) => ({
        ...prev,
        manager: '',
      }));
    }
  };
  
  // Formatar moeda
  const formatCurrency = (value) => {
    if (!value) return '';
    
    // Se já for uma string formatada, retornar
    if (typeof value === 'string' && value.includes(',')) return value;
    
    // Formatar como moeda
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value).replace('$', '');
  };
  
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    
    // Formatar o valor como moeda
    const formattedValue = formatCurrency(value);
    
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
    setHasChanges(true);
    
    // Limpar erro quando o campo é preenchido
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Nome do projeto é obrigatório';
    if (!formData.client) newErrors.client = 'Cliente é obrigatório';
    if (!formData.company) newErrors.company = 'Empresa é obrigatória';
    if (!formData.startDate) newErrors.startDate = 'Data de início é obrigatória';
    if (!formData.endDate) newErrors.endDate = 'Data de término é obrigatória';
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'Data de término deve ser posterior à data de início';
    }
    if (!formData.budget) newErrors.budget = 'Orçamento é obrigatório';
    if (!formData.manager) newErrors.manager = 'Gerente do projeto é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Aqui você enviaria os dados para a API
      console.log('Dados do formulário:', formData);
      
      // Atualizar o projeto local para simular a atualização
      const updatedProject = {
        ...project,
        name: formData.name,
        description: formData.description,
        client: formData.client,
        company: formData.company,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        budget: parseFloat(formData.budget.replace(/[^0-9]/g, '')),
        progress: formData.progress,
        manager: formData.manager,
      };
      
      setProject(updatedProject);
      setHasChanges(false);
      
      // Mostrar mensagem de sucesso
      alert('Projeto atualizado com sucesso!');
    }
  };
  
  const handleCancel = () => {
    if (hasChanges) {
      setOpenDialog(true);
    } else {
      navigate(`/dashboard/projects/${id}`);
    }
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  const handleDiscardChanges = () => {
    setOpenDialog(false);
    navigate(`/dashboard/projects/${id}`);
  };
  
  if (!project) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Projeto não encontrado</Typography>
        <Button
          component={RouterLink}
          to="/dashboard/projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Voltar para Lista de Projetos
        </Button>
      </Container>
    );
  }
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to={`/dashboard/projects/${id}`}
              startIcon={<ArrowBackIcon />}
              sx={{ mr: 2 }}
            >
              Voltar
            </Button>
            <Typography variant="h4">
              Editar Projeto: {project.name}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{ mr: 1 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Informações Básicas" />
            <Tab label="Detalhes Financeiros" />
            <Tab label="Equipe do Projeto" />
          </Tabs>
          
          {/* Aba de Informações Básicas */}
          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
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
                    isOptionEqualToValue={(option, value) => option.id === value.id}
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
                
                <Grid item xs={12} md={6}>
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
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Progresso (%)"
                    name="progress"
                    type="number"
                    value={formData.progress}
                    onChange={handleChange}
                    InputProps={{
                      inputProps: { min: 0, max: 100 }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Aba de Detalhes Financeiros */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
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
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Gasto Atual"
                    value={formatCurrency(project.spent)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      readOnly: true,
                    }}
                    disabled
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Card sx={{ bgcolor: 'background.default' }}>
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Resumo Financeiro
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" color="text.secondary">
                            Orçamento:
                          </Typography>
                          <Typography variant="body1">
                            ${parseFloat(formData.budget.replace(/[^0-9]/g, '')) || 0}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" color="text.secondary">
                            Gasto Atual:
                          </Typography>
                          <Typography variant="body1">
                            ${project.spent}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" color="text.secondary">
                            Saldo Restante:
                          </Typography>
                          <Typography variant="body1" color={
                            (parseFloat(formData.budget.replace(/[^0-9]/g, '')) || 0) - project.spent < 0 
                              ? 'error.main' 
                              : 'success.main'
                          }>
                            ${(parseFloat(formData.budget.replace(/[^0-9]/g, '')) || 0) - project.spent}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {/* Aba de Equipe do Projeto */}
          {tabValue === 2 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Autocomplete
                    options={projectManagers}
                    getOptionLabel={(option) => `${option.name} (${option.role})`}
                    value={formData.manager}
                    onChange={handleManagerChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
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
                    Para gerenciar os membros da equipe, volte para a página de detalhes do projeto.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
        
        {/* Diálogo de confirmação */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
        >
          <DialogTitle>Descartar alterações?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Você tem alterações não salvas. Tem certeza de que deseja sair sem salvar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDiscardChanges} color="error">
              Descartar Alterações
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default ProjectEdit;
