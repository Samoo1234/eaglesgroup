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
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

// Dados de exemplo para clientes
const generateClients = () => {
  const clients = [];
  const companyNames = [
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
    'Office Park Development',
    'Industrial Complex',
    'Residential Towers',
    'Community Center',
    'Sports Stadium',
  ];
  
  const contactFirstNames = ['John', 'Maria', 'Robert', 'Sarah', 'Michael', 'Lisa', 'David', 'Jennifer', 'William', 'Jessica'];
  const contactLastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
  
  const types = ['Comercial', 'Residencial', 'Governamental', 'Industrial', 'Institucional'];
  const statuses = ['Ativo', 'Prospecto', 'Inativo', 'Arquivado'];
  
  for (let i = 1; i <= 50; i++) {
    const companyIndex = Math.floor(Math.random() * companyNames.length);
    const contactFirstNameIndex = Math.floor(Math.random() * contactFirstNames.length);
    const contactLastNameIndex = Math.floor(Math.random() * contactLastNames.length);
    const cityIndex = Math.floor(Math.random() * cities.length);
    const typeIndex = Math.floor(Math.random() * types.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    const contactName = `${contactFirstNames[contactFirstNameIndex]} ${contactLastNames[contactLastNameIndex]}`;
    const contactEmail = `${contactFirstNames[contactFirstNameIndex].toLowerCase()}.${contactLastNames[contactLastNameIndex].toLowerCase()}@${companyNames[companyIndex].toLowerCase().replace(/\s+/g, '').replace(/\./g, '')}.com`;
    
    clients.push({
      id: i,
      clientId: `CLI-${1000 + i}`,
      name: companyNames[companyIndex],
      type: types[typeIndex],
      contactName: contactName,
      contactEmail: contactEmail,
      contactPhone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${Math.floor(Math.random() * 9000) + 1000} ${['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Lincoln Dr'][Math.floor(Math.random() * 5)]}, ${cities[cityIndex]}, ${states[cityIndex]} ${Math.floor(Math.random() * 90000) + 10000}`,
      city: cities[cityIndex],
      state: states[cityIndex],
      projects: Math.floor(Math.random() * 5),
      totalValue: Math.floor(Math.random() * 10000000) + 100000,
      status: statuses[statusIndex],
      createdAt: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
    });
  }
  return clients;
};

const clients = generateClients();

const ClientList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  
  // Manipuladores de eventos
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === '' || client.type === typeFilter;
    const matchesStatus = statusFilter === '' || client.status === statusFilter;
    const matchesCompany = companyFilter === '' || client.company === companyFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesCompany;
  });
  
  // Obter cor para status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'success';
      case 'Prospecto':
        return 'warning';
      case 'Inativo':
        return 'error';
      case 'Arquivado':
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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Clientes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gerencie todos os clientes da sua empresa
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Estatísticas de Clientes */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <BusinessIcon />
              </Avatar>
              <Typography variant="h6">
                Total de Clientes
              </Typography>
            </Box>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold', mb: 1 }}>
              {clients.length}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Ativos
                </Typography>
                <Typography variant="h6">
                  {clients.filter(c => c.status === 'Ativo').length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Prospectos
                </Typography>
                <Typography variant="h6">
                  {clients.filter(c => c.status === 'Prospecto').length}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.success.main, mr: 2 }}>
                <BusinessIcon />
              </Avatar>
              <Typography variant="h6">
                Valor Total
              </Typography>
            </Box>
            <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold', mb: 1 }}>
              {formatCurrency(clients.reduce((sum, client) => sum + client.totalValue, 0))}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Valor médio por cliente
            </Typography>
            <Typography variant="h6">
              {formatCurrency(clients.reduce((sum, client) => sum + client.totalValue, 0) / clients.length)}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Distribuição por Tipo
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              {['Comercial', 'Residencial', 'Governamental', 'Industrial', 'Institucional'].map(type => {
                const count = clients.filter(c => c.type === type).length;
                const percentage = Math.round((count / clients.length) * 100);
                
                return (
                  <Box key={type} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">{type}</Typography>
                      <Typography variant="body2" color="text.secondary">{percentage}% ({count})</Typography>
                    </Box>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${percentage}%`,
                          bgcolor: theme.palette.primary.main,
                          height: 8,
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>
        
        {/* Lista de Clientes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Lista de Clientes</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={RouterLink}
                to="/dashboard/clients/add"
              >
                Novo Cliente
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
              <TextField
                size="small"
                label="Pesquisar clientes"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              
              <FormControl size="small" variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Residencial">Residencial</MenuItem>
                  <MenuItem value="Governamental">Governamental</MenuItem>
                  <MenuItem value="Industrial">Industrial</MenuItem>
                  <MenuItem value="Institucional">Institucional</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Prospecto">Prospecto</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                  <MenuItem value="Arquivado">Arquivado</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel>Empresa</InputLabel>
                <Select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  label="Empresa"
                >
                  <MenuItem value="">Todas</MenuItem>
                  <MenuItem value="Eagles Group LLC">Eagles Group LLC</MenuItem>
                  <MenuItem value="Brazilian Concrete LLC">Brazilian Concrete LLC</MenuItem>
                  <MenuItem value="Eagles Cleaning LLC">Eagles Cleaning LLC</MenuItem>
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
                    <TableCell>Cliente</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Contato</TableCell>
                    <TableCell>Localização</TableCell>
                    <TableCell>Projetos</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredClients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                              {getInitials(client.name)}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {client.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{client.clientId}</TableCell>
                        <TableCell>{client.type}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{client.contactName}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                              <EmailIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                              {client.contactEmail}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{client.city}, {client.state}</Typography>
                        </TableCell>
                        <TableCell align="center">{client.projects}</TableCell>
                        <TableCell>{formatCurrency(client.totalValue)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={client.status} 
                            size="small" 
                            color={getStatusColor(client.status)} 
                          />
                        </TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            color="primary" 
                            component={RouterLink}
                            to={`/dashboard/clients/${client.id}`}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="primary"
                            component={RouterLink}
                            to={`/dashboard/clients/edit/${client.id}`}
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredClients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientList;
