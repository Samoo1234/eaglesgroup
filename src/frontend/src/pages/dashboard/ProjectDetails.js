import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Construction as ConstructionIcon,
  Inventory as InventoryIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
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
      client: clientNames[i - 1],
      clientId: i,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: statuses[statusIndex],
      progress: progress,
      budget: (Math.floor(Math.random() * 10) + 1) * 100000,
      spent: (Math.floor(Math.random() * 8) + 1) * 100000,
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
      manager: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira'][Math.floor(Math.random() * 4)],
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

const projects = generateProjects();

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Buscar projeto pelo ID
  useEffect(() => {
    // Simulando busca de projeto
    const foundProject = projects.find(p => p.id === parseInt(id));
    setProject(foundProject);
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
      case 'Em andamento':
        return 'info';
      case 'Concluído':
        return 'success';
      case 'Planejamento':
        return 'warning';
      case 'Em pausa':
        return 'error';
      case 'Entregue':
        return 'success';
      case 'Pendente':
        return 'warning';
      default:
        return 'default';
    }
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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Button
            component={RouterLink}
            to="/dashboard/projects"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Projetos
          </Button>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip 
              label={project.status} 
              size="small" 
              color={getStatusColor(project.status)} 
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ID: {project.projectId}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            component={RouterLink}
            to={`/dashboard/projects/edit/${project.id}`}
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
        {/* Informações do Projeto */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informações do Projeto
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cliente" 
                    secondary={
                      <RouterLink to={`/dashboard/clients/${project.clientId}`} style={{ textDecoration: 'none' }}>
                        {project.client}
                      </RouterLink>
                    } 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Empresa" 
                    secondary={project.company} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data de Início" 
                    secondary={project.startDate} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data de Conclusão Prevista" 
                    secondary={project.endDate} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Orçamento" 
                    secondary={formatCurrency(project.budget)} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Gasto Atual" 
                    secondary={formatCurrency(project.spent)} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Gerente do Projeto" 
                    secondary={project.manager} 
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progresso do Projeto
                </Typography>
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
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {project.progress}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Descrição
              </Typography>
              <Typography variant="body2">
                {project.description}
              </Typography>
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
              <Tab icon={<AssignmentIcon />} label="Tarefas" />
              <Tab icon={<PersonIcon />} label="Equipe" />
              <Tab icon={<InventoryIcon />} label="Materiais" />
              <Tab icon={<DescriptionIcon />} label="Documentos" />
            </Tabs>
            
            {/* Conteúdo da Aba de Tarefas */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Tarefas do Projeto
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Nova Tarefa
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Tarefa</TableCell>
                        <TableCell>Responsável</TableCell>
                        <TableCell>Prazo</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.assignedTo}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>
                            <Chip 
                              label={task.status} 
                              size="small" 
                              color={getStatusColor(task.status)} 
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
              </Box>
            )}
            
            {/* Conteúdo da Aba de Equipe */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Equipe do Projeto
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Adicionar Membro
                  </Button>
                </Box>
                
                <Grid container spacing={2}>
                  {project.team.map((member) => (
                    <Grid item xs={12} sm={6} md={4} key={member.id}>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                              {member.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1">{member.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                            </Box>
                          </Box>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Email:</strong> {member.email}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Telefone:</strong> {member.phone}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Conteúdo da Aba de Materiais */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Materiais do Projeto
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Adicionar Material
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Material</TableCell>
                        <TableCell>Quantidade</TableCell>
                        <TableCell>Preço Unitário</TableCell>
                        <TableCell>Preço Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>{material.name}</TableCell>
                          <TableCell>{material.quantity} {material.unit}</TableCell>
                          <TableCell>{formatCurrency(material.unitPrice)}</TableCell>
                          <TableCell>{formatCurrency(material.totalPrice)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={material.status} 
                              size="small" 
                              color={getStatusColor(material.status)} 
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
              </Box>
            )}
            
            {/* Conteúdo da Aba de Documentos */}
            {tabValue === 3 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    Documentos do Projeto
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                  >
                    Adicionar Documento
                  </Button>
                </Box>
                
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Tamanho</TableCell>
                        <TableCell>Enviado por</TableCell>
                        <TableCell>Data de Upload</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.documents.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell>{document.name}</TableCell>
                          <TableCell>{document.type}</TableCell>
                          <TableCell>{document.size}</TableCell>
                          <TableCell>{document.uploadedBy}</TableCell>
                          <TableCell>{document.uploadDate}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <DescriptionIcon fontSize="small" />
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
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectDetails;