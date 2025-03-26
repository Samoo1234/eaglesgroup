import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AttachMoney as AttachMoneyIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
  Construction as ConstructionIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Factory as FactoryIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector } from 'react-redux';

// Dados de exemplo para o dashboard
const generateDashboardData = () => {
  // Dados de receita mensal
  const monthlyRevenue = [
    { name: 'Jan', eagles: 120000, brazilian: 80000, cleaning: 40000 },
    { name: 'Fev', eagles: 150000, brazilian: 90000, cleaning: 45000 },
    { name: 'Mar', eagles: 180000, brazilian: 100000, cleaning: 50000 },
    { name: 'Abr', eagles: 160000, brazilian: 85000, cleaning: 55000 },
    { name: 'Mai', eagles: 200000, brazilian: 110000, cleaning: 60000 },
    { name: 'Jun', eagles: 220000, brazilian: 120000, cleaning: 65000 },
  ];
  
  // Dados de projetos por status
  const projectsByStatus = [
    { name: 'Em andamento', value: 12, color: '#2196f3' },
    { name: 'Concluídos', value: 8, color: '#4caf50' },
    { name: 'Planejamento', value: 5, color: '#ff9800' },
    { name: 'Em pausa', value: 2, color: '#f44336' },
  ];
  
  // Projetos recentes
  const recentProjects = [
    {
      id: 1,
      name: 'Construção de Sede Corporativa',
      client: 'TechCorp Inc.',
      progress: 75,
      status: 'Em andamento',
      dueDate: '15/12/2023',
      value: 1200000,
      company: 'Eagles Group LLC',
    },
    {
      id: 2,
      name: 'Reforma de Escritórios',
      client: 'Coastal Living Developers',
      progress: 90,
      status: 'Em andamento',
      dueDate: '30/11/2023',
      value: 450000,
      company: 'Brazilian Concrete LLC',
    },
    {
      id: 3,
      name: 'Manutenção Predial',
      client: 'City Hospital Expansion',
      progress: 100,
      status: 'Concluído',
      dueDate: '10/10/2023',
      value: 350000,
      company: 'Eagles Cleaning LLC',
    },
    {
      id: 4,
      name: 'Construção de Complexo Residencial',
      client: 'Mountain View Residences',
      progress: 40,
      status: 'Em andamento',
      dueDate: '28/02/2024',
      value: 2500000,
      company: 'Eagles Group LLC',
    },
    {
      id: 5,
      name: 'Reforma de Shopping',
      client: 'Retail Development Group',
      progress: 10,
      status: 'Planejamento',
      dueDate: '15/03/2024',
      value: 1800000,
      company: 'Brazilian Concrete LLC',
    },
  ];
  
  // Clientes recentes
  const recentClients = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      contactName: 'John Smith',
      contactEmail: 'john.smith@techcorp.com',
      contactPhone: '(212) 555-1234',
      status: 'Ativo',
      type: 'Comercial',
      company: 'Eagles Group LLC',
    },
    {
      id: 2,
      name: 'Coastal Living Developers',
      contactName: 'Maria Johnson',
      contactEmail: 'maria.johnson@coastalliving.com',
      contactPhone: '(305) 555-5678',
      status: 'Ativo',
      type: 'Residencial',
      company: 'Brazilian Concrete LLC',
    },
    {
      id: 3,
      name: 'City Hospital Expansion',
      contactName: 'Robert Williams',
      contactEmail: 'robert.williams@cityhospital.org',
      contactPhone: '(713) 555-9012',
      status: 'Ativo',
      type: 'Institucional',
      company: 'Eagles Cleaning LLC',
    },
  ];
  
  // Tarefas pendentes
  const pendingTasks = [
    {
      id: 1,
      title: 'Reunião com cliente TechCorp',
      dueDate: '10/11/2023',
      priority: 'Alta',
      assignedTo: 'João Silva',
    },
    {
      id: 2,
      title: 'Enviar orçamento para Coastal Living',
      dueDate: '12/11/2023',
      priority: 'Média',
      assignedTo: 'Maria Oliveira',
    },
    {
      id: 3,
      title: 'Visita técnica ao canteiro de obras',
      dueDate: '15/11/2023',
      priority: 'Alta',
      assignedTo: 'Carlos Santos',
    },
    {
      id: 4,
      title: 'Revisar contrato com fornecedor',
      dueDate: '18/11/2023',
      priority: 'Baixa',
      assignedTo: 'Ana Pereira',
    },
  ];
  
  // Resumo financeiro
  const financialSummary = {
    totalRevenue: 1130000,
    totalExpenses: 780000,
    totalProfit: 350000,
    pendingInvoices: 320000,
    revenueGrowth: 15.8,
    profitGrowth: 12.3,
  };
  
  // Resumo de materiais
  const materialsSummary = {
    totalItems: 156,
    lowStock: 12,
    totalValue: 450000,
    mostUsed: 'Cimento Portland',
  };
  
  // Resumo de pessoal
  const personnelSummary = {
    totalEmployees: 87,
    onSite: 62,
    office: 25,
    contractors: 34,
  };
  
  return {
    monthlyRevenue,
    projectsByStatus,
    recentProjects,
    recentClients,
    pendingTasks,
    financialSummary,
    materialsSummary,
    personnelSummary,
  };
};

const dashboardData = generateDashboardData();

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  
  // Obter estado de autenticação do Redux
  const { isAuthenticated, user, currentCompany } = useSelector((state) => state.auth);
  
  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Função para obter os itens de menu com base no tipo de empresa
  const getCompanyMenuItems = () => {
    const commonItems = [
      { name: 'Clientes', icon: <PeopleIcon />, path: '/dashboard/clients' },
      { name: 'Financeiro', icon: <AttachMoneyIcon />, path: '/dashboard/finance' },
    ];

    // Adicionar itens de menu específicos por tipo de empresa
    switch (currentCompany.type) {
      case 'construction':
        return [
          ...commonItems,
          { name: 'Materiais', icon: <InventoryIcon />, path: '/dashboard/materials' },
          { name: 'Projetos', icon: <BusinessIcon />, path: '/dashboard/projects' },
          { name: 'Equipe', icon: <GroupIcon />, path: '/dashboard/team' }
        ];
      case 'concrete':
        return [
          ...commonItems,
          { name: 'Materiais', icon: <InventoryIcon />, path: '/dashboard/materials' },
          { name: 'Produção', icon: <FactoryIcon />, path: '/dashboard/production' },
          { name: 'Estoque', icon: <StorageIcon />, path: '/dashboard/inventory' },
          { name: 'Projetos', icon: <BusinessIcon />, path: '/dashboard/projects' },
          { name: 'Equipe', icon: <GroupIcon />, path: '/dashboard/team' }
        ];
      case 'cleaning':
        return [
          ...commonItems,
          { name: 'Agendamentos', icon: <EventIcon />, path: '/dashboard/schedules' },
          { name: 'Suprimentos', icon: <InventoryIcon />, path: '/dashboard/supplies' },
          { name: 'Equipe', icon: <GroupIcon />, path: '/dashboard/team' }
        ];
      default:
        return commonItems;
    }
  };

  // Obter cor para status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Em andamento':
        return 'info';
      case 'Concluído':
        return 'success';
      case 'Planejamento':
        return 'warning';
      case 'Em pausa':
        return 'error';
      case 'Ativo':
        return 'success';
      case 'Prospecto':
        return 'warning';
      case 'Inativo':
        return 'error';
      case 'Alta':
        return 'error';
      case 'Média':
        return 'warning';
      case 'Baixa':
        return 'info';
      default:
        return 'default';
    }
  };

  // Formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Gerar iniciais para avatar
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard - {currentCompany.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Estatísticas */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Bem-vindo ao Dashboard da {currentCompany.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {currentCompany.type === 'construction' && 'Gerencie seus projetos de construção, materiais e equipes em um só lugar.'}
              {currentCompany.type === 'concrete' && 'Controle sua produção de concreto, estoque de materiais e entregas.'}
              {currentCompany.type === 'cleaning' && 'Organize seus agendamentos de limpeza, equipes e suprimentos.'}
            </Typography>
          </Grid>
          {/* Cards de Resumo */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                      Receita Total
                    </Typography>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <AttachMoneyIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatCurrency(dashboardData.financialSummary.totalRevenue)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpwardIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      {dashboardData.financialSummary.revenueGrowth}% 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      vs. mês anterior
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                      Projetos Ativos
                    </Typography>
                    <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                      <ConstructionIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {dashboardData.projectsByStatus.find(p => p.name === 'Em andamento').value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {dashboardData.projectsByStatus.find(p => p.name === 'Concluídos').value} concluídos este mês
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                      Clientes
                    </Typography>
                    <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                      <BusinessIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {dashboardData.recentClients.length}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowUpwardIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="success.main">
                      2 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      novos este mês
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="text.secondary">
                      Faturas Pendentes
                    </Typography>
                    <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                      <AssignmentIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formatCurrency(dashboardData.financialSummary.pendingInvoices)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowDownwardIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="error.main">
                      5.2% 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      vs. mês anterior
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* Gráficos e Tabelas */}
          <Grid container spacing={3}>
            {/* Gráfico de Receita */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Receita por Empresa (Últimos 6 Meses)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={dashboardData.monthlyRevenue}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="eagles" name="Eagles Group LLC" fill={theme.palette.primary.main} />
                    <Bar dataKey="brazilian" name="Brazilian Concrete LLC" fill={theme.palette.secondary.main} />
                    <Bar dataKey="cleaning" name="Eagles Cleaning LLC" fill={theme.palette.success.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* Gráfico de Projetos por Status */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Projetos por Status
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardData.projectsByStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {dashboardData.projectsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            {/* Projetos Recentes */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Projetos Recentes
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/dashboard/projects"
                    endIcon={<VisibilityIcon />}
                    color="primary"
                  >
                    Ver Todos
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome do Projeto</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Empresa</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Prazo</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Progresso</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboardData.recentProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <RouterLink to={`/dashboard/projects/${project.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                              {project.name}
                            </RouterLink>
                          </TableCell>
                          <TableCell>{project.client}</TableCell>
                          <TableCell>{project.company}</TableCell>
                          <TableCell>{formatCurrency(project.value)}</TableCell>
                          <TableCell>{project.dueDate}</TableCell>
                          <TableCell>
                            <Chip 
                              label={project.status} 
                              size="small" 
                              color={getStatusColor(project.status)} 
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={project.progress} 
                                  color={
                                    project.progress === 100 ? 'success' : 
                                    project.progress > 50 ? 'primary' : 
                                    project.progress > 25 ? 'warning' : 'error'
                                  }
                                />
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {project.progress}%
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
            {/* Tarefas Pendentes e Clientes Recentes */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Tarefas Pendentes
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/dashboard/tasks"
                    endIcon={<VisibilityIcon />}
                    color="primary"
                  >
                    Ver Todas
                  </Button>
                </Box>
                <List>
                  {dashboardData.pendingTasks.map((task) => (
                    <React.Fragment key={task.id}>
                      <ListItem
                        secondaryAction={
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            color={getStatusColor(task.priority)} 
                          />
                        }
                      >
                        <ListItemIcon>
                          <Avatar sx={{ bgcolor: theme.palette.grey[200] }}>
                            {task.priority === 'Alta' ? (
                              <WarningIcon color="error" />
                            ) : task.priority === 'Média' ? (
                              <ScheduleIcon color="warning" />
                            ) : (
                              <CheckCircleIcon color="info" />
                            )}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.secondary">
                                Prazo: {task.dueDate} • Responsável: {task.assignedTo}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Clientes Recentes
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/dashboard/clients"
                    endIcon={<VisibilityIcon />}
                    color="primary"
                  >
                    Ver Todos
                  </Button>
                </Box>
                <List>
                  {dashboardData.recentClients.map((client) => (
                    <React.Fragment key={client.id}>
                      <ListItem
                        secondaryAction={
                          <Chip 
                            label={client.status} 
                            size="small" 
                            color={getStatusColor(client.status)} 
                          />
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                            {getInitials(client.name)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <RouterLink to={`/dashboard/clients/${client.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                              {client.name}
                            </RouterLink>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                                <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                {client.contactName}
                              </Typography>
                              <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block' }}>
                                <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                                {client.contactEmail}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
