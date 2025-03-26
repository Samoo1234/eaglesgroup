import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  AttachMoney as AttachMoneyIcon,
  MoneyOff as MoneyOffIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBR from 'date-fns/locale/pt-BR';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
    
    transactions.push({
      id: i,
      transactionId: `TRX-${10000 + i}`,
      date: transactionDate,
      dueDate: dueDate,
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
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdBy: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
    });
  }
  
  // Ordenar por data (mais recente primeiro)
  transactions.sort((a, b) => b.date - a.date);
  
  return transactions;
};

const transactions = generateTransactions();

// Preparar dados para gráficos
const prepareChartData = () => {
  const monthlyData = [];
  const categoryData = [];
  const statusData = [];
  
  // Dados para gráfico mensal
  const monthlyTotals = {};
  
  transactions.forEach(transaction => {
    const month = transaction.date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' });
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = { month, receitas: 0, despesas: 0 };
    }
    
    if (transaction.type === 'Receita') {
      monthlyTotals[month].receitas += transaction.amount;
    } else {
      monthlyTotals[month].despesas += transaction.amount;
    }
  });
  
  // Converter para array e ordenar por data
  for (const month in monthlyTotals) {
    monthlyData.push(monthlyTotals[month]);
  }
  
  // Dados para gráfico de categorias
  const categoryTotals = {};
  
  transactions.forEach(transaction => {
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = { name: transaction.category, value: 0, type: transaction.type };
    }
    
    categoryTotals[transaction.category].value += transaction.amount;
  });
  
  // Converter para array
  for (const category in categoryTotals) {
    categoryData.push(categoryTotals[category]);
  }
  
  // Dados para gráfico de status
  const statusTotals = {};
  
  transactions.forEach(transaction => {
    if (!statusTotals[transaction.status]) {
      statusTotals[transaction.status] = { name: transaction.status, value: 0 };
    }
    
    statusTotals[transaction.status].value += 1;
  });
  
  // Converter para array
  for (const status in statusTotals) {
    statusData.push(statusTotals[status]);
  }
  
  return { monthlyData, categoryData, statusData };
};

const { monthlyData, categoryData, statusData } = prepareChartData();

// Cores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

const FinanceList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [tabValue, setTabValue] = useState(0);
  
  // Manipuladores de eventos
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.client && transaction.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (transaction.project && transaction.project.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = typeFilter === '' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === '' || transaction.status === statusFilter;
    
    const matchesDateRange = 
      (!dateRange.start || transaction.date >= dateRange.start) &&
      (!dateRange.end || transaction.date <= dateRange.end);
    
    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });
  
  // Calcular totais
  const totalReceitas = filteredTransactions
    .filter(t => t.type === 'Receita')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDespesas = filteredTransactions
    .filter(t => t.type === 'Despesa')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const saldoAtual = totalReceitas - totalDespesas;
  
  const totalPendente = filteredTransactions
    .filter(t => t.status === 'Pendente')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Obter cor para status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pago':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Atrasado':
        return 'error';
      case 'Cancelado':
        return 'default';
      default:
        return 'default';
    }
  };
  
  // Obter cor para tipo
  const getTypeColor = (type) => {
    switch (type) {
      case 'Receita':
        return 'success';
      case 'Despesa':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Formatar moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Formatar data
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Finanças
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie todas as transações financeiras da sua empresa
          </Typography>
        </Box>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Estatísticas Financeiras */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Saldo Atual
              </Typography>
              <Typography 
                variant="h3" 
                color={saldoAtual >= 0 ? 'success.main' : 'error.main'} 
                sx={{ fontWeight: 'bold' }}
              >
                {formatCurrency(saldoAtual)}
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Receitas
              </Typography>
              <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalReceitas)}
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Despesas
              </Typography>
              <Typography variant="h3" color="error.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalDespesas)}
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Pendente
              </Typography>
              <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(totalPendente)}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Transações" icon={<ReceiptIcon />} iconPosition="start" />
            <Tab label="Relatórios" icon={<AccountBalanceIcon />} iconPosition="start" />
          </Tabs>
          
          {/* Aba de Transações */}
          {tabValue === 0 && (
            <Box>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      placeholder="Buscar transações..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        label="Tipo"
                      >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Receita">Receita</MenuItem>
                        <MenuItem value="Despesa">Despesa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status"
                      >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Pago">Pago</MenuItem>
                        <MenuItem value="Pendente">Pendente</MenuItem>
                        <MenuItem value="Atrasado">Atrasado</MenuItem>
                        <MenuItem value="Cancelado">Cancelado</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2}>
                    <DatePicker
                      label="Data Inicial"
                      value={dateRange.start}
                      onChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={2}>
                    <DatePicker
                      label="Data Final"
                      value={dateRange.end}
                      onChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddIcon />}
                      component={RouterLink}
                      to="/dashboard/finance/add"
                    >
                      Nova
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Vencimento</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Categoria</TableCell>
                      <TableCell>Projeto</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.transactionId}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>{formatDate(transaction.dueDate)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            <Chip 
                              label={transaction.type} 
                              size="small" 
                              color={getTypeColor(transaction.type)} 
                            />
                          </TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>
                            {transaction.project ? (
                              <RouterLink to={`/dashboard/projects/${transaction.projectId}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                                {transaction.project}
                              </RouterLink>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {transaction.client ? (
                              <RouterLink to={`/dashboard/clients/${transaction.clientId}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                                {transaction.client}
                              </RouterLink>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell sx={{ 
                            color: transaction.type === 'Receita' ? 'success.main' : 'error.main',
                            fontWeight: 'bold'
                          }}>
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={transaction.status} 
                              size="small" 
                              color={getStatusColor(transaction.status)} 
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color="primary"
                              component={RouterLink}
                              to={`/dashboard/finance/${transaction.id}`}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="primary"
                              component={RouterLink}
                              to={`/dashboard/finance/edit/${transaction.id}`}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <TablePagination
                component="div"
                count={filteredTransactions.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </Box>
          )}
          
          {/* Aba de Relatórios */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Gráfico de Receitas e Despesas por Mês */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Receitas e Despesas por Mês
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={monthlyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="receitas" name="Receitas" fill="#4caf50" />
                        <Bar dataKey="despesas" name="Despesas" fill="#f44336" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                
                {/* Gráficos de Pizza */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Transações por Categoria
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Transações por Status
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default FinanceList;
