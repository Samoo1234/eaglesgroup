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
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
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
    'Reforma de Apartamentos',
    'Construção de Estacionamento',
    'Reforma de Restaurante',
    'Construção de Centro Comercial',
    'Reforma de Clínica Médica',
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
    'Office Park Development',
    'Community Center',
    'Sports Stadium',
    'Shopping Mall Renovations',
    'Departamento de Transportes',
  ];
  
  const statuses = ['Em andamento', 'Concluído', 'Planejamento', 'Em pausa'];
  
  for (let i = 1; i <= 30; i++) {
    const startDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Math.floor(Math.random() * 12) + 3);
    
    const projectIndex = Math.floor(Math.random() * projectNames.length);
    const clientIndex = Math.floor(Math.random() * clientNames.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    const progress = statuses[statusIndex] === 'Concluído' ? 100 : 
                    statuses[statusIndex] === 'Planejamento' ? Math.floor(Math.random() * 20) :
                    statuses[statusIndex] === 'Em pausa' ? Math.floor(Math.random() * 70) + 10 :
                    Math.floor(Math.random() * 80) + 20;
    
    projects.push({
      id: i,
      projectId: `PRJ-${2000 + i}`,
      name: projectNames[projectIndex % projectNames.length],
      client: clientNames[clientIndex % clientNames.length],
      clientId: i,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: statuses[statusIndex],
      progress: progress,
      budget: (Math.floor(Math.random() * 10) + 1) * 100000,
      spent: (Math.floor(Math.random() * 8) + 1) * 100000,
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      manager: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira'][Math.floor(Math.random() * 4)],
    });
  }
  return projects;
};

const projects = generateProjects();

const ProjectList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
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
  
  // Filtrar projetos
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || project.status === statusFilter;
    const matchesCompany = companyFilter === '' || project.company === companyFilter;
    
    return matchesSearch && matchesStatus && matchesCompany;
  });
  
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
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Projetos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gerencie todos os projetos da sua empresa
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Estatísticas de Projetos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total de Projetos
            </Typography>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
              {projects.length}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Em Andamento
            </Typography>
            <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>
              {projects.filter(p => p.status === 'Em andamento').length}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Concluídos
            </Typography>
            <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
              {projects.filter(p => p.status === 'Concluído').length}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Valor Total
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(projects.reduce((sum, project) => sum + project.budget, 0))}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar projetos..."
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
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Em andamento">Em andamento</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
                <MenuItem value="Planejamento">Planejamento</MenuItem>
                <MenuItem value="Em pausa">Em pausa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
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
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/dashboard/projects/add"
            >
              Novo Projeto
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome do Projeto</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Gerente</TableCell>
                <TableCell>Data de Início</TableCell>
                <TableCell>Data de Término</TableCell>
                <TableCell>Orçamento</TableCell>
                <TableCell>Progresso</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.projectId}</TableCell>
                    <TableCell>
                      <RouterLink to={`/dashboard/projects/${project.id}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                        {project.name}
                      </RouterLink>
                    </TableCell>
                    <TableCell>
                      <RouterLink to={`/dashboard/clients/${project.clientId}`} style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                        {project.client}
                      </RouterLink>
                    </TableCell>
                    <TableCell>{project.company}</TableCell>
                    <TableCell>{project.manager}</TableCell>
                    <TableCell>{project.startDate}</TableCell>
                    <TableCell>{project.endDate}</TableCell>
                    <TableCell>{formatCurrency(project.budget)}</TableCell>
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
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="primary"
                        component={RouterLink}
                        to={`/dashboard/projects/edit/${project.id}`}
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
          count={filteredProjects.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Container>
  );
};

export default ProjectList;
