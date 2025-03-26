import React, { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Tabs,
  Tab,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  AccountBalance as AccountBalanceIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

// Componentes do Dashboard
import FinancialSummary from '../../components/dashboard/FinancialSummary';

// Dados de exemplo para faturas
const generateInvoices = () => {
  const invoices = [];
  const clients = [
    'TechCorp Inc.',
    'Coastal Living Developers',
    'Departamento de Transportes',
    'Retail Development Group',
    'Mountain View Residences',
    'City Hospital Expansion',
    'Green Energy Solutions',
    'Luxury Hotel Chain',
    'Public School District',
    'Shopping Mall Renovations',
  ];
  
  const statuses = ['Paga', 'Pendente', 'Atrasada', 'Parcial', 'Cancelada'];
  
  for (let i = 1; i <= 50; i++) {
    const clientIndex = Math.floor(Math.random() * clients.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const amount = (Math.random() * 50000 + 1000).toFixed(2);
    const dueDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const issueDate = new Date(dueDate);
    issueDate.setDate(dueDate.getDate() - Math.floor(Math.random() * 30) - 15);
    
    invoices.push({
      id: `INV-${2025}-${1000 + i}`,
      client: clients[clientIndex],
      project: `Projeto ${i}`,
      amount: parseFloat(amount),
      issueDate: issueDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      status: statuses[statusIndex],
      paymentMethod: Math.random() > 0.5 ? 'Transferência Bancária' : 'Cartão de Crédito',
    });
  }
  return invoices;
};

// Dados de exemplo para despesas
const generateExpenses = () => {
  const expenses = [];
  const categories = [
    'Materiais',
    'Mão de Obra',
    'Equipamentos',
    'Transporte',
    'Serviços',
    'Licenças e Permissões',
    'Seguros',
    'Utilidades',
    'Aluguel',
    'Administrativo',
  ];
  
  const vendors = [
    'American Building Supply',
    'Construction Materials Inc.',
    'National Steel Corporation',
    'Quality Lumber Co.',
    'Electrical Systems Ltd.',
    'Plumbing Wholesale Depot',
    'HVAC Solutions',
    'Roofing Specialists',
    'Window & Door Experts',
    'Flooring Distributors',
  ];
  
  for (let i = 1; i <= 50; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const vendorIndex = Math.floor(Math.random() * vendors.length);
    const amount = (Math.random() * 20000 + 100).toFixed(2);
    const date = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    expenses.push({
      id: `EXP-${2025}-${1000 + i}`,
      category: categories[categoryIndex],
      vendor: vendors[vendorIndex],
      project: Math.random() > 0.3 ? `Projeto ${Math.floor(Math.random() * 10) + 1}` : 'Geral',
      amount: parseFloat(amount),
      date: date.toISOString().split('T')[0],
      paymentMethod: Math.random() > 0.6 ? 'Cartão Corporativo' : 'Transferência Bancária',
      status: Math.random() > 0.2 ? 'Pago' : 'Pendente',
      description: `Despesa com ${categories[categoryIndex].toLowerCase()} para ${Math.random() > 0.3 ? 'projeto específico' : 'operações gerais'}.`,
    });
  }
  return expenses;
};

// Dados de exemplo para contas bancárias
const bankAccounts = [
  {
    id: 1,
    name: 'Conta Principal - Eagles Group LLC',
    bank: 'Bank of America',
    accountNumber: 'xxxx-xxxx-1234',
    balance: 458750.25,
    currency: 'USD',
    type: 'Corrente',
  },
  {
    id: 2,
    name: 'Conta de Reserva - Eagles Group LLC',
    bank: 'Wells Fargo',
    accountNumber: 'xxxx-xxxx-5678',
    balance: 250000.00,
    currency: 'USD',
    type: 'Poupança',
  },
  {
    id: 3,
    name: 'Conta Operacional - Brazilian Concrete LLC',
    bank: 'Chase',
    accountNumber: 'xxxx-xxxx-9012',
    balance: 175250.75,
    currency: 'USD',
    type: 'Corrente',
  },
  {
    id: 4,
    name: 'Conta de Folha de Pagamento - Eagles Group LLC',
    bank: 'Bank of America',
    accountNumber: 'xxxx-xxxx-3456',
    balance: 120000.00,
    currency: 'USD',
    type: 'Corrente',
  },
  {
    id: 5,
    name: 'Conta Operacional - Eagles Cleaning LLC',
    bank: 'Wells Fargo',
    accountNumber: 'xxxx-xxxx-7890',
    balance: 85400.50,
    currency: 'USD',
    type: 'Corrente',
  },
];

const invoices = generateInvoices();
const expenses = generateExpenses();

// Componente principal
const FinanceManagement = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  // Estado para faturas
  const [invoicePage, setInvoicePage] = useState(0);
  const [invoiceRowsPerPage, setInvoiceRowsPerPage] = useState(10);
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('');
  
  // Estado para despesas
  const [expensePage, setExpensePage] = useState(0);
  const [expenseRowsPerPage, setExpenseRowsPerPage] = useState(10);
  const [expenseSearchQuery, setExpenseSearchQuery] = useState('');
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState('');
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Manipuladores para faturas
  const handleInvoicePageChange = (event, newPage) => {
    setInvoicePage(newPage);
  };
  
  const handleInvoiceRowsPerPageChange = (event) => {
    setInvoiceRowsPerPage(parseInt(event.target.value, 10));
    setInvoicePage(0);
  };
  
  // Manipuladores para despesas
  const handleExpensePageChange = (event, newPage) => {
    setExpensePage(newPage);
  };
  
  const handleExpenseRowsPerPageChange = (event) => {
    setExpenseRowsPerPage(parseInt(event.target.value, 10));
    setExpensePage(0);
  };
  
  // Filtrar faturas
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
    
    const matchesStatus = invoiceStatusFilter === '' || invoice.status === invoiceStatusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Filtrar despesas
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = 
      expense.id.toLowerCase().includes(expenseSearchQuery.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(expenseSearchQuery.toLowerCase()) ||
      expense.description.toLowerCase().includes(expenseSearchQuery.toLowerCase());
    
    const matchesCategory = expenseCategoryFilter === '' || expense.category === expenseCategoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Obter status de cor para faturas
  const getInvoiceStatusColor = (status) => {
    switch (status) {
      case 'Paga':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Atrasada':
        return 'error';
      case 'Parcial':
        return 'info';
      case 'Cancelada':
        return 'default';
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
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Resumo Financeiro */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <FinancialSummary />
          </Paper>
        </Grid>
        
        {/* Abas de Finanças */}
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="finance tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab 
                  icon={<ReceiptIcon />} 
                  iconPosition="start" 
                  label="Faturas" 
                  id="tab-0" 
                  aria-controls="tabpanel-0" 
                />
                <Tab 
                  icon={<PaymentIcon />} 
                  iconPosition="start" 
                  label="Despesas" 
                  id="tab-1" 
                  aria-controls="tabpanel-1" 
                />
                <Tab 
                  icon={<AccountBalanceIcon />} 
                  iconPosition="start" 
                  label="Contas Bancárias" 
                  id="tab-2" 
                  aria-controls="tabpanel-2" 
                />
                <Tab 
                  icon={<BarChartIcon />} 
                  iconPosition="start" 
                  label="Relatórios" 
                  id="tab-3" 
                  aria-controls="tabpanel-3" 
                />
              </Tabs>
            </Box>
            
            {/* Painel de Faturas */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Gerenciamento de Faturas</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Nova Fatura
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                  <TextField
                    size="small"
                    label="Pesquisar"
                    variant="outlined"
                    value={invoiceSearchQuery}
                    onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  
                  <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={invoiceStatusFilter}
                      onChange={(e) => setInvoiceStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Paga">Paga</MenuItem>
                      <MenuItem value="Pendente">Pendente</MenuItem>
                      <MenuItem value="Atrasada">Atrasada</MenuItem>
                      <MenuItem value="Parcial">Parcial</MenuItem>
                      <MenuItem value="Cancelada">Cancelada</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                  >
                    Exportar
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nº da Fatura</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Projeto</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data de Emissão</TableCell>
                        <TableCell>Data de Vencimento</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredInvoices
                        .slice(invoicePage * invoiceRowsPerPage, invoicePage * invoiceRowsPerPage + invoiceRowsPerPage)
                        .map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.client}</TableCell>
                            <TableCell>{invoice.project}</TableCell>
                            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                            <TableCell>{invoice.issueDate}</TableCell>
                            <TableCell>{invoice.dueDate}</TableCell>
                            <TableCell>
                              <Chip 
                                label={invoice.status} 
                                size="small" 
                                color={getInvoiceStatusColor(invoice.status)} 
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small">
                                <PrintIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredInvoices.length}
                  rowsPerPage={invoiceRowsPerPage}
                  page={invoicePage}
                  onPageChange={handleInvoicePageChange}
                  onRowsPerPageChange={handleInvoiceRowsPerPageChange}
                />
              </Box>
            </TabPanel>
            
            {/* Painel de Despesas */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Gerenciamento de Despesas</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Nova Despesa
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                  <TextField
                    size="small"
                    label="Pesquisar"
                    variant="outlined"
                    value={expenseSearchQuery}
                    onChange={(e) => setExpenseSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  
                  <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={expenseCategoryFilter}
                      onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                      label="Categoria"
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="Materiais">Materiais</MenuItem>
                      <MenuItem value="Mão de Obra">Mão de Obra</MenuItem>
                      <MenuItem value="Equipamentos">Equipamentos</MenuItem>
                      <MenuItem value="Transporte">Transporte</MenuItem>
                      <MenuItem value="Serviços">Serviços</MenuItem>
                      <MenuItem value="Licenças e Permissões">Licenças e Permissões</MenuItem>
                      <MenuItem value="Seguros">Seguros</MenuItem>
                      <MenuItem value="Utilidades">Utilidades</MenuItem>
                      <MenuItem value="Aluguel">Aluguel</MenuItem>
                      <MenuItem value="Administrativo">Administrativo</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                  >
                    Exportar
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nº da Despesa</TableCell>
                        <TableCell>Categoria</TableCell>
                        <TableCell>Fornecedor</TableCell>
                        <TableCell>Projeto</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredExpenses
                        .slice(expensePage * expenseRowsPerPage, expensePage * expenseRowsPerPage + expenseRowsPerPage)
                        .map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell>{expense.id}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>{expense.vendor}</TableCell>
                            <TableCell>{expense.project}</TableCell>
                            <TableCell>{formatCurrency(expense.amount)}</TableCell>
                            <TableCell>{expense.date}</TableCell>
                            <TableCell>
                              <Chip 
                                label={expense.status} 
                                size="small" 
                                color={expense.status === 'Pago' ? 'success' : 'warning'} 
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small">
                                <PrintIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredExpenses.length}
                  rowsPerPage={expenseRowsPerPage}
                  page={expensePage}
                  onPageChange={handleExpensePageChange}
                  onRowsPerPageChange={handleExpenseRowsPerPageChange}
                />
              </Box>
            </TabPanel>
            
            {/* Painel de Contas Bancárias */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Contas Bancárias</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Nova Conta
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {bankAccounts.map((account) => (
                    <Grid item xs={12} md={6} lg={4} key={account.id}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {account.name}
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {account.bank} • {account.type}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Nº da Conta: {account.accountNumber}
                          </Typography>
                          <Typography variant="h5" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                            {formatCurrency(account.balance)}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button size="small" color="primary">
                              Ver Transações
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>
            
            {/* Painel de Relatórios */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Relatórios Financeiros
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Selecione um relatório para visualizar ou gerar um novo relatório personalizado.
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <BarChartIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Relatório de Receitas e Despesas
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Visualize um resumo detalhado de todas as receitas e despesas por período.
                        </Typography>
                        <Button variant="outlined" fullWidth>
                          Gerar Relatório
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PieChartIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Relatório de Lucratividade por Projeto
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Analise a lucratividade de cada projeto com detalhamento de custos.
                        </Typography>
                        <Button variant="outlined" fullWidth>
                          Gerar Relatório
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6} lg={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <ReceiptIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Relatório de Contas a Receber
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Acompanhe todas as faturas pendentes e o fluxo de caixa projetado.
                        </Typography>
                        <Button variant="outlined" fullWidth>
                          Gerar Relatório
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Componente TabPanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default FinanceManagement;
