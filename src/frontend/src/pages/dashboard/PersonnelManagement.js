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
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  EventNote as EventNoteIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';

// Dados de exemplo para funcionários
const generateEmployees = () => {
  const employees = [];
  const firstNames = ['John', 'Maria', 'Robert', 'Sarah', 'Michael', 'Lisa', 'David', 'Jennifer', 'William', 'Jessica'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
  const positions = [
    'Gerente de Projetos',
    'Engenheiro Civil',
    'Arquiteto',
    'Supervisor de Obra',
    'Pedreiro',
    'Eletricista',
    'Encanador',
    'Carpinteiro',
    'Operador de Máquinas',
    'Assistente Administrativo',
    'Contador',
    'Recursos Humanos',
    'Vendedor',
    'Atendimento ao Cliente',
    'Motorista',
  ];
  const departments = ['Projetos', 'Engenharia', 'Construção', 'Administrativo', 'Financeiro', 'Vendas', 'Operações'];
  const companies = ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'];
  
  for (let i = 1; i <= 50; i++) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const lastNameIndex = Math.floor(Math.random() * lastNames.length);
    const positionIndex = Math.floor(Math.random() * positions.length);
    const departmentIndex = Math.floor(Math.random() * departments.length);
    const companyIndex = Math.floor(Math.random() * companies.length);
    
    const hireDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const salary = Math.floor(Math.random() * 70000) + 30000;
    
    employees.push({
      id: i,
      employeeId: `EMP-${1000 + i}`,
      firstName: firstNames[firstNameIndex],
      lastName: lastNames[lastNameIndex],
      fullName: `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`,
      email: `${firstNames[firstNameIndex].toLowerCase()}.${lastNames[lastNameIndex].toLowerCase()}@eaglesgroup.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      position: positions[positionIndex],
      department: departments[departmentIndex],
      company: companies[companyIndex],
      hireDate: hireDate.toISOString().split('T')[0],
      salary: salary,
      status: Math.random() > 0.1 ? 'Ativo' : 'Inativo',
      address: `${Math.floor(Math.random() * 9000) + 1000} ${['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Lincoln Dr'][Math.floor(Math.random() * 5)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 90000) + 10000}`,
      projects: Math.random() > 0.3 ? [`Projeto ${Math.floor(Math.random() * 5) + 1}`, `Projeto ${Math.floor(Math.random() * 5) + 6}`] : [`Projeto ${Math.floor(Math.random() * 10) + 1}`],
    });
  }
  return employees;
};

// Dados de exemplo para equipes
const generateTeams = () => {
  const teams = [];
  const teamNames = [
    'Equipe de Construção A',
    'Equipe de Construção B',
    'Equipe de Construção C',
    'Equipe de Concreto',
    'Equipe de Acabamento',
    'Equipe de Instalações Elétricas',
    'Equipe de Instalações Hidráulicas',
    'Equipe de Limpeza Residencial',
    'Equipe de Limpeza Comercial',
    'Equipe de Administração',
  ];
  
  for (let i = 0; i < 10; i++) {
    teams.push({
      id: i + 1,
      name: teamNames[i],
      leader: `EMP-${1000 + Math.floor(Math.random() * 10) + 1}`,
      members: Math.floor(Math.random() * 8) + 3,
      projects: Math.floor(Math.random() * 3) + 1,
      company: i < 3 ? 'Eagles Group LLC' : i < 7 ? 'Brazilian Concrete LLC' : 'Eagles Cleaning LLC',
      status: Math.random() > 0.2 ? 'Ativo' : 'Em Férias',
    });
  }
  return teams;
};

const employees = generateEmployees();
const teams = generateTeams();

// Componente principal
const PersonnelManagement = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  // Estado para funcionários
  const [employeePage, setEmployeePage] = useState(0);
  const [employeeRowsPerPage, setEmployeeRowsPerPage] = useState(10);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  
  // Estado para equipes
  const [teamPage, setTeamPage] = useState(0);
  const [teamRowsPerPage, setTeamRowsPerPage] = useState(10);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamCompanyFilter, setTeamCompanyFilter] = useState('');
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Manipuladores para funcionários
  const handleEmployeePageChange = (event, newPage) => {
    setEmployeePage(newPage);
  };
  
  const handleEmployeeRowsPerPageChange = (event) => {
    setEmployeeRowsPerPage(parseInt(event.target.value, 10));
    setEmployeePage(0);
  };
  
  // Manipuladores para equipes
  const handleTeamPageChange = (event, newPage) => {
    setTeamPage(newPage);
  };
  
  const handleTeamRowsPerPageChange = (event) => {
    setTeamRowsPerPage(parseInt(event.target.value, 10));
    setTeamPage(0);
  };
  
  // Filtrar funcionários
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.fullName.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(employeeSearchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter;
    const matchesCompany = companyFilter === '' || employee.company === companyFilter;
    
    return matchesSearch && matchesDepartment && matchesCompany;
  });
  
  // Filtrar equipes
  const filteredTeams = teams.filter((team) => {
    const matchesSearch = 
      team.name.toLowerCase().includes(teamSearchQuery.toLowerCase());
    
    const matchesCompany = teamCompanyFilter === '' || team.company === teamCompanyFilter;
    
    return matchesSearch && matchesCompany;
  });
  
  // Obter cor para status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'success';
      case 'Inativo':
        return 'error';
      case 'Em Férias':
        return 'warning';
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
    const names = name.split(' ');
    return names.length > 1 
      ? `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}` 
      : names[0].charAt(0);
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Estatísticas de Pessoal */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total de Funcionários
              </Typography>
              <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
                {employees.length}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Eagles Group LLC
                  </Typography>
                  <Typography variant="h6">
                    {employees.filter(e => e.company === 'Eagles Group LLC').length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Brazilian Concrete LLC
                  </Typography>
                  <Typography variant="h6">
                    {employees.filter(e => e.company === 'Brazilian Concrete LLC').length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Eagles Cleaning LLC
                  </Typography>
                  <Typography variant="h6">
                    {employees.filter(e => e.company === 'Eagles Cleaning LLC').length}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Equipes
                  </Typography>
                  <Typography variant="h6">
                    {teams.length}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribuição por Departamento
              </Typography>
              <Box sx={{ mt: 2 }}>
                {['Projetos', 'Engenharia', 'Construção', 'Administrativo', 'Financeiro', 'Vendas', 'Operações'].map(dept => {
                  const count = employees.filter(e => e.department === dept).length;
                  const percentage = Math.round((count / employees.length) * 100);
                  
                  return (
                    <Box key={dept} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{dept}</Typography>
                        <Typography variant="body2" color="text.secondary">{percentage}%</Typography>
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
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ações Rápidas
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                <Button variant="outlined" startIcon={<PersonIcon />} fullWidth>
                  Adicionar Funcionário
                </Button>
                <Button variant="outlined" startIcon={<GroupIcon />} fullWidth>
                  Criar Nova Equipe
                </Button>
                <Button variant="outlined" startIcon={<AssignmentIcon />} fullWidth>
                  Gerenciar Escalas
                </Button>
                <Button variant="outlined" startIcon={<EventNoteIcon />} fullWidth>
                  Registrar Ausência
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />} fullWidth>
                  Exportar Relatório
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Abas de Pessoal */}
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="personnel tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab 
                  icon={<PersonIcon />} 
                  iconPosition="start" 
                  label="Funcionários" 
                  id="tab-0" 
                  aria-controls="tabpanel-0" 
                />
                <Tab 
                  icon={<GroupIcon />} 
                  iconPosition="start" 
                  label="Equipes" 
                  id="tab-1" 
                  aria-controls="tabpanel-1" 
                />
                <Tab 
                  icon={<EventNoteIcon />} 
                  iconPosition="start" 
                  label="Escalas" 
                  id="tab-2" 
                  aria-controls="tabpanel-2" 
                />
                <Tab 
                  icon={<AssignmentIcon />} 
                  iconPosition="start" 
                  label="Documentos" 
                  id="tab-3" 
                  aria-controls="tabpanel-3" 
                />
              </Tabs>
            </Box>
            
            {/* Painel de Funcionários */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Gerenciamento de Funcionários</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Novo Funcionário
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                  <TextField
                    size="small"
                    label="Pesquisar"
                    variant="outlined"
                    value={employeeSearchQuery}
                    onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  
                  <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Departamento</InputLabel>
                    <Select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      label="Departamento"
                    >
                      <MenuItem value="">Todos</MenuItem>
                      <MenuItem value="Projetos">Projetos</MenuItem>
                      <MenuItem value="Engenharia">Engenharia</MenuItem>
                      <MenuItem value="Construção">Construção</MenuItem>
                      <MenuItem value="Administrativo">Administrativo</MenuItem>
                      <MenuItem value="Financeiro">Financeiro</MenuItem>
                      <MenuItem value="Vendas">Vendas</MenuItem>
                      <MenuItem value="Operações">Operações</MenuItem>
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
                        <TableCell>Funcionário</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Cargo</TableCell>
                        <TableCell>Departamento</TableCell>
                        <TableCell>Empresa</TableCell>
                        <TableCell>Contato</TableCell>
                        <TableCell>Data de Contratação</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredEmployees
                        .slice(employeePage * employeeRowsPerPage, employeePage * employeeRowsPerPage + employeeRowsPerPage)
                        .map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                                  {getInitials(employee.fullName)}
                                </Avatar>
                                <Typography variant="body2">{employee.fullName}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{employee.employeeId}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.company}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                  {employee.email}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{employee.hireDate}</TableCell>
                            <TableCell>
                              <Chip 
                                label={employee.status} 
                                size="small" 
                                color={getStatusColor(employee.status)} 
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small" color="primary">
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
                  count={filteredEmployees.length}
                  rowsPerPage={employeeRowsPerPage}
                  page={employeePage}
                  onPageChange={handleEmployeePageChange}
                  onRowsPerPageChange={handleEmployeeRowsPerPageChange}
                />
              </Box>
            </TabPanel>
            
            {/* Painel de Equipes */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Gerenciamento de Equipes</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                  >
                    Nova Equipe
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2, gap: 2 }}>
                  <TextField
                    size="small"
                    label="Pesquisar"
                    variant="outlined"
                    value={teamSearchQuery}
                    onChange={(e) => setTeamSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  
                  <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel>Empresa</InputLabel>
                    <Select
                      value={teamCompanyFilter}
                      onChange={(e) => setTeamCompanyFilter(e.target.value)}
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
                
                <Grid container spacing={3}>
                  {filteredTeams
                    .slice(teamPage * teamRowsPerPage, teamPage * teamRowsPerPage + teamRowsPerPage)
                    .map((team) => (
                      <Grid item xs={12} md={6} lg={4} key={team.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="h6">{team.name}</Typography>
                              <Chip 
                                label={team.status} 
                                size="small" 
                                color={getStatusColor(team.status)} 
                              />
                            </Box>
                            <Divider sx={{ my: 1.5 }} />
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Empresa: {team.company}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Líder: {team.leader}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Membros: {team.members}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                Projetos Ativos: {team.projects}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                              <Button size="small" color="primary" sx={{ mr: 1 }}>
                                Ver Detalhes
                              </Button>
                              <Button size="small" variant="outlined">
                                Editar
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
                
                <TablePagination
                  rowsPerPageOptions={[6, 12, 24]}
                  component="div"
                  count={filteredTeams.length}
                  rowsPerPage={teamRowsPerPage}
                  page={teamPage}
                  onPageChange={handleTeamPageChange}
                  onRowsPerPageChange={handleTeamRowsPerPageChange}
                />
              </Box>
            </TabPanel>
            
            {/* Painel de Escalas */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Gerenciamento de Escalas
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Gerencie as escalas de trabalho das equipes e funcionários.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <Typography variant="body1">
                    Funcionalidade em desenvolvimento
                  </Typography>
                </Box>
              </Box>
            </TabPanel>
            
            {/* Painel de Documentos */}
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Documentos de Funcionários
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Gerencie documentos, certificações e treinamentos dos funcionários.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                  <Typography variant="body1">
                    Funcionalidade em desenvolvimento
                  </Typography>
                </Box>
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
      id={`personnel-tabpanel-${index}`}
      aria-labelledby={`personnel-tab-${index}`}
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

export default PersonnelManagement;
