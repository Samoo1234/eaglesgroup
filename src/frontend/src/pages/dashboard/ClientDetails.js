import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
  Tab,
  Tabs,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  Assignment as AssignmentIcon,
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
  Note as NoteIcon,
  Add as AddIcon,
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
      website: `www.${companyNames[companyIndex].toLowerCase().replace(/\s+/g, '').replace(/\./g, '')}.com`,
      industry: ['Construção Civil', 'Tecnologia', 'Saúde', 'Educação', 'Varejo', 'Hotelaria', 'Energia', 'Transporte'][Math.floor(Math.random() * 8)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
      notes: [
        {
          id: 1,
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          content: 'Reunião inicial para discutir necessidades do cliente.',
          author: 'João Silva'
        },
        {
          id: 2,
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          content: 'Cliente solicitou orçamento para projeto de expansão.',
          author: 'Maria Oliveira'
        }
      ],
      contacts: [
        {
          id: 1,
          name: contactName,
          position: 'Diretor de Operações',
          email: contactEmail,
          phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          primary: true
        },
        {
          id: 2,
          name: `${contactFirstNames[Math.floor(Math.random() * contactFirstNames.length)]} ${contactLastNames[Math.floor(Math.random() * contactLastNames.length)]}`,
          position: 'Gerente de Projetos',
          email: `${contactFirstNames[Math.floor(Math.random() * contactFirstNames.length)].toLowerCase()}.${contactLastNames[Math.floor(Math.random() * contactLastNames.length)].toLowerCase()}@${companyNames[companyIndex].toLowerCase().replace(/\s+/g, '').replace(/\./g, '')}.com`,
          phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          primary: false
        }
      ],
      projects: [
        {
          id: 1,
          name: 'Construção de Sede',
          startDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          endDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          status: ['Em andamento', 'Concluído', 'Planejamento', 'Em pausa'][Math.floor(Math.random() * 4)],
          value: Math.floor(Math.random() * 1000000) + 100000
        },
        {
          id: 2,
          name: 'Reforma de Escritórios',
          startDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          endDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          status: ['Em andamento', 'Concluído', 'Planejamento', 'Em pausa'][Math.floor(Math.random() * 4)],
          value: Math.floor(Math.random() * 500000) + 50000
        }
      ],
      invoices: [
        {
          id: 1,
          number: `INV-${2000 + Math.floor(Math.random() * 1000)}`,
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          dueDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          amount: Math.floor(Math.random() * 100000) + 10000,
          status: ['Pago', 'Pendente', 'Atrasado', 'Cancelado'][Math.floor(Math.random() * 4)]
        },
        {
          id: 2,
          number: `INV-${2000 + Math.floor(Math.random() * 1000)}`,
          date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          dueDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
          amount: Math.floor(Math.random() * 100000) + 10000,
          status: ['Pago', 'Pendente', 'Atrasado', 'Cancelado'][Math.floor(Math.random() * 4)]
        }
      ]
    });
  }
  return clients;
};

const clients = generateClients();

// Componente para detalhes do cliente
const ClientDetails = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Buscar cliente pelo ID
  useEffect(() => {
    // Simulando busca de cliente
    const foundClient = clients.find(c => c.id === parseInt(id));
    setClient(foundClient);
  }, [id]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      case 'Pago':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Atrasado':
        return 'error';
      case 'Cancelado':
        return 'default';
      case 'Em andamento':
        return 'info';
      case 'Concluído':
        return 'success';
      case 'Planejamento':
        return 'warning';
      case 'Em pausa':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Gerar iniciais para avatar
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };
  
  if (!client) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Cliente não encontrado</Typography>
        <Button
          component={RouterLink}
          to="/dashboard/clients"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Voltar para Lista de Clientes
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Button
            component={RouterLink}
            to="/dashboard/clients"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Clientes
          </Button>
          <Typography variant="h4" gutterBottom>
            {client.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip 
              label={client.status} 
              size="small" 
              color={getStatusColor(client.status)} 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={client.type} 
              size="small" 
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ID: {client.clientId}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            component={RouterLink}
            to={`/dashboard/clients/edit/${client.id}`}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {/* Informações do Cliente */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: theme.palette.primary.main,
                    mr: 2
                  }}
                >
                  {getInitials(client.name)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{client.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.industry}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Empresa" 
                    secondary={client.company} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Endereço" 
                    secondary={client.address} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Website" 
                    secondary={client.website} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Valor Total" 
                    secondary={formatCurrency(client.totalValue)} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cliente Desde" 
                    secondary={client.createdAt} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contatos
              </Typography>
              
              {client.contacts.map((contact) => (
                <Box key={contact.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: contact.primary ? theme.palette.primary.main : theme.palette.grey[500],
                        mr: 2
                      }}
                    >
                      {getInitials(contact.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {contact.name}
                        {contact.primary && (
                          <Chip 
                            label="Principal" 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ ml: 1, height: 20 }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contact.position}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 7 }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {contact.email}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {contact.phone}
                    </Typography>
                  </Box>
                  {contact.id !== client.contacts.length && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
              
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
                fullWidth
                sx={{ mt: 2 }}
              >
                Adicionar Contato
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Abas de Informações */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Projetos" />
              <Tab label="Finanças" />
              <Tab label="Notas" />
              <Tab label="Documentos" />
            </Tabs>
            
            {/* Conteúdo da Aba de Projetos */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Projetos do Cliente
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/dashboard/projects/add"
                  >
                    Novo Projeto
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome do Projeto</TableCell>
                        <TableCell>Data de Início</TableCell>
                        <TableCell>Data de Término</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>{project.startDate}</TableCell>
                          <TableCell>{project.endDate}</TableCell>
                          <TableCell>{formatCurrency(project.value)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={project.status} 
                              size="small" 
                              color={getStatusColor(project.status)} 
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color="primary"
                              component={RouterLink}
                              to={`/dashboard/projects/${project.id}`}
                            >
                              <AssignmentIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {client.projects.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhum projeto encontrado para este cliente.
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ mt: 2 }}
                      component={RouterLink}
                      to="/dashboard/projects/add"
                    >
                      Adicionar Primeiro Projeto
                    </Button>
                  </Box>
                )}
              </Box>
            )}
            
            {/* Conteúdo da Aba de Finanças */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Faturas e Pagamentos
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Nova Fatura
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Número</TableCell>
                        <TableCell>Data de Emissão</TableCell>
                        <TableCell>Data de Vencimento</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {client.invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.number}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={invoice.status} 
                              size="small" 
                              color={getStatusColor(invoice.status)} 
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {client.invoices.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma fatura encontrada para este cliente.
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ mt: 2 }}
                    >
                      Criar Primeira Fatura
                    </Button>
                  </Box>
                )}
              </Box>
            )}
            
            {/* Conteúdo da Aba de Notas */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Notas e Observações
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Nova Nota
                  </Button>
                </Box>
                
                {client.notes.map((note) => (
                  <Card key={note.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {note.date} - {note.author}
                        </Typography>
                        <Box>
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        {note.content}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                
                {client.notes.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nenhuma nota encontrada para este cliente.
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ mt: 2 }}
                    >
                      Adicionar Primeira Nota
                    </Button>
                  </Box>
                )}
              </Box>
            )}
            
            {/* Conteúdo da Aba de Documentos */}
            {tabValue === 3 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Documentos
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Novo Documento
                  </Button>
                </Box>
                
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nenhum documento encontrado para este cliente.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{ mt: 2 }}
                  >
                    Fazer Upload de Documento
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientDetails;
