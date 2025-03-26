import React, { useState, useEffect } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  GetApp as DownloadIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  LocalShipping as LocalShippingIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';
import { format, subDays, isAfter, isBefore, parseISO } from 'date-fns';

// Dados de exemplo para materiais
const generateMaterials = () => {
  const materials = [];
  const categories = [
    'Cimento e Concreto',
    'Madeira',
    'Aço e Metal',
    'Elétrica',
    'Hidráulica',
    'Pintura',
    'Revestimentos',
    'Ferramentas',
    'Equipamentos de Segurança',
    'Outros'
  ];
  
  const units = ['kg', 'unidade', 'm²', 'm³', 'm', 'litro', 'pacote', 'conjunto', 'rolo', 'barra'];
  
  const suppliers = [
    'Construmax Materiais',
    'Ferreira & Cia',
    'Distribuidora Nacional',
    'Elétrica Total',
    'Hidro Sistemas',
    'Aço Forte',
    'Madeireira Central',
    'Segurança Construção',
    'Revestimentos Deluxe',
    'Ferramentas Pro'
  ];
  
  const materialNames = [
    // Cimento e Concreto
    ['Cimento Portland CP II', 'Cimento Portland CP IV', 'Concreto Usinado', 'Argamassa Colante', 'Argamassa de Rejunte'],
    // Madeira
    ['Tábua de Pinus', 'Compensado Naval', 'Viga de Madeira', 'Sarrafo', 'Ripas'],
    // Aço e Metal
    ['Vergalhão CA-50', 'Treliça', 'Arame Recozido', 'Perfil Metálico', 'Chapa Galvanizada'],
    // Elétrica
    ['Cabo Flexível', 'Disjuntor', 'Quadro de Distribuição', 'Tomada', 'Interruptor'],
    // Hidráulica
    ['Tubo PVC', 'Conexão PVC', "Caixa d'água", 'Torneira', 'Registro'],
    // Pintura
    ['Tinta Acrílica', 'Massa Corrida', 'Selador', 'Lixa', 'Rolo de Pintura'],
    // Revestimentos
    ['Porcelanato', 'Cerâmica', 'Piso Laminado', 'Granito', 'Mármore'],
    // Ferramentas
    ['Furadeira', 'Serra Circular', 'Betoneira', 'Nível a Laser', 'Martelo'],
    // Equipamentos de Segurança
    ['Capacete', 'Luva', 'Bota', 'Óculos de Proteção', 'Cinto de Segurança'],
    // Outros
    ['Lona Plástica', 'Fita Adesiva', 'Escada', 'Carrinho de Mão', 'Mangueira']
  ];
  
  for (let i = 1; i <= 100; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    const materialNameOptions = materialNames[categoryIndex];
    const materialName = materialNameOptions[Math.floor(Math.random() * materialNameOptions.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    
    const quantity = Math.floor(Math.random() * 1000) + 1;
    const minQuantity = Math.floor(quantity * 0.2);
    const unitPrice = (Math.random() * 500) + 1;
    
    const lastPurchaseDate = new Date();
    lastPurchaseDate.setDate(lastPurchaseDate.getDate() - Math.floor(Math.random() * 60));
    
    const lastUsedDate = new Date(lastPurchaseDate);
    lastUsedDate.setDate(lastUsedDate.getDate() + Math.floor(Math.random() * 30));
    
    materials.push({
      id: i,
      code: `MAT-${10000 + i}`,
      name: materialName,
      description: `${materialName} para uso em construção civil`,
      category: category,
      quantity: quantity,
      unit: unit,
      minQuantity: minQuantity,
      unitPrice: unitPrice,
      totalValue: quantity * unitPrice,
      supplier: supplier,
      location: ['Depósito Principal', 'Depósito Secundário', 'Almoxarifado', 'Canteiro de Obras'][Math.floor(Math.random() * 4)],
      lastPurchaseDate: lastPurchaseDate,
      lastUsedDate: lastUsedDate,
      status: quantity <= minQuantity ? 'Baixo Estoque' : 'Disponível',
    });
  }
  
  return materials;
};

// Gerar histórico de movimentação
const generateMovementHistory = () => {
  const history = [];
  const types = ['Entrada', 'Saída'];
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
  
  const materials = generateMaterials();
  
  // Data atual
  const currentDate = new Date();
  
  // Gerar histórico para os últimos 6 meses
  for (let i = 0; i < 200; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - Math.floor(Math.random() * 180)); // Últimos 6 meses
    
    const type = types[Math.floor(Math.random() * types.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const quantity = Math.floor(Math.random() * 100) + 1;
    
    history.push({
      id: i + 1,
      date: date,
      type: type,
      materialId: material.id,
      materialCode: material.code,
      materialName: material.name,
      quantity: quantity,
      unit: material.unit,
      unitPrice: material.unitPrice,
      totalValue: quantity * material.unitPrice,
      project: type === 'Saída' ? projects[Math.floor(Math.random() * projects.length)] : null,
      supplier: type === 'Entrada' ? material.supplier : null,
      location: material.location,
      user: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
      notes: type === 'Entrada' 
        ? 'Compra de material para estoque' 
        : 'Utilização em projeto',
      documentNumber: type === 'Entrada' 
        ? `NF-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}` 
        : `REQ-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`
    });
  }
  
  // Ordenar por data (mais recente primeiro)
  history.sort((a, b) => b.date - a.date);
  
  return history;
};

const materials = generateMaterials();
const movementHistory = generateMovementHistory();

const MaterialMovement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [startDate, setStartDate] = useState(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState(new Date());
  const [projectFilter, setProjectFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Estados para o formulário de nova movimentação
  const [movementType, setMovementType] = useState('Entrada');
  const [movementDate, setMovementDate] = useState(new Date());
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [notes, setNotes] = useState('');
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleDeleteClick = (movement) => {
    setSelectedMovement(movement);
    setOpenConfirmDialog(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedMovement(null);
  };
  
  const handleConfirmDelete = () => {
    // Aqui você enviaria uma requisição para excluir a movimentação
    console.log('Excluindo movimentação:', selectedMovement.id);
    
    // Exibir mensagem de sucesso
    setSnackbarMessage('Movimentação excluída com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    setOpenConfirmDialog(false);
    setSelectedMovement(null);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const handleAddMaterial = () => {
    setSelectedMaterials([
      ...selectedMaterials,
      {
        materialId: '',
        quantity: '',
        unitPrice: '',
        totalValue: 0,
        unit: '',
        location: ''
      }
    ]);
  };
  
  const handleRemoveMaterial = (index) => {
    const newSelectedMaterials = [...selectedMaterials];
    newSelectedMaterials.splice(index, 1);
    setSelectedMaterials(newSelectedMaterials);
  };
  
  const handleMaterialChange = (index, field, value) => {
    const newSelectedMaterials = [...selectedMaterials];
    
    if (field === 'materialId') {
      const selectedMaterial = materials.find(m => m.id === value);
      
      if (selectedMaterial) {
        newSelectedMaterials[index] = {
          ...newSelectedMaterials[index],
          materialId: selectedMaterial.id,
          unitPrice: selectedMaterial.unitPrice,
          unit: selectedMaterial.unit,
          location: selectedMaterial.location,
          quantity: newSelectedMaterials[index].quantity || '',
          totalValue: (newSelectedMaterials[index].quantity || 0) * selectedMaterial.unitPrice
        };
      }
    } else if (field === 'quantity') {
      const quantity = value === '' ? 0 : parseFloat(value);
      const unitPrice = newSelectedMaterials[index].unitPrice || 0;
      
      newSelectedMaterials[index] = {
        ...newSelectedMaterials[index],
        quantity: value,
        totalValue: quantity * unitPrice
      };
    } else if (field === 'unitPrice') {
      const unitPrice = value === '' ? 0 : parseFloat(value);
      const quantity = newSelectedMaterials[index].quantity || 0;
      
      newSelectedMaterials[index] = {
        ...newSelectedMaterials[index],
        unitPrice: value,
        totalValue: quantity * unitPrice
      };
    } else {
      newSelectedMaterials[index] = {
        ...newSelectedMaterials[index],
        [field]: value
      };
    }
    
    setSelectedMaterials(newSelectedMaterials);
  };
  
  const handleSubmitMovement = () => {
    // Validar formulário
    if (selectedMaterials.length === 0) {
      setSnackbarMessage('Adicione pelo menos um material à movimentação!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    
    for (const material of selectedMaterials) {
      if (!material.materialId || !material.quantity || material.quantity <= 0) {
        setSnackbarMessage('Preencha todos os campos obrigatórios!');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return;
      }
    }
    
    // Aqui você enviaria uma requisição para registrar a movimentação
    console.log('Registrando movimentação:', {
      type: movementType,
      date: movementDate,
      materials: selectedMaterials,
      project: selectedProject,
      documentNumber: documentNumber,
      notes: notes
    });
    
    // Exibir mensagem de sucesso
    setSnackbarMessage('Movimentação registrada com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    
    // Limpar formulário
    setMovementType('Entrada');
    setMovementDate(new Date());
    setSelectedMaterials([]);
    setSelectedProject('');
    setDocumentNumber('');
    setNotes('');
  };
  
  // Filtrar movimentações
  const filteredMovements = movementHistory.filter((movement) => {
    const matchesSearch = 
      movement.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movement.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (movement.documentNumber && movement.documentNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (movement.project && movement.project.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = typeFilter === '' || movement.type === typeFilter;
    const matchesProject = projectFilter === '' || (movement.project && movement.project === projectFilter);
    const matchesLocation = locationFilter === '' || movement.location === locationFilter;
    
    const isAfterStartDate = startDate ? isAfter(movement.date, startDate) || movement.date.getTime() === startDate.getTime() : true;
    const isBeforeEndDate = endDate ? isBefore(movement.date, endDate) || movement.date.getTime() === endDate.getTime() : true;
    
    return matchesSearch && matchesType && matchesProject && matchesLocation && isAfterStartDate && isBeforeEndDate;
  });
  
  // Calcular totais
  const totalEntradas = filteredMovements
    .filter(m => m.type === 'Entrada')
    .reduce((sum, movement) => sum + movement.totalValue, 0);
  
  const totalSaidas = filteredMovements
    .filter(m => m.type === 'Saída')
    .reduce((sum, movement) => sum + movement.totalValue, 0);
  
  // Obter projetos únicos para o filtro
  const uniqueProjects = [...new Set(movementHistory
    .filter(m => m.project)
    .map(m => m.project))];
  
  // Obter localizações únicas para o filtro
  const uniqueLocations = [...new Set(movementHistory.map(m => m.location))];
  
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
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR');
  };
  
  // Obter cor para tipo de movimentação
  const getMovementTypeColor = (type) => {
    switch (type) {
      case 'Entrada':
        return 'success';
      case 'Saída':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Calcular total da movimentação atual
  const calculateTotal = () => {
    return selectedMaterials.reduce((sum, material) => sum + (material.totalValue || 0), 0);
};

return (
  <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
    <Box sx={{ mb: 4 }}>
      <Button
        component={RouterLink}
        to="/dashboard/materials"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Voltar para Lista de Materiais
      </Button>
      <Typography variant="h4" gutterBottom>
        Movimentação de Materiais
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Registre entradas e saídas de materiais e visualize o histórico de movimentações
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
        <Tab label="Histórico de Movimentações" icon={<HistoryIcon />} iconPosition="start" />
        <Tab label="Nova Movimentação" icon={<AddIcon />} iconPosition="start" />
      </Tabs>
      
      {/* Aba de Histórico de Movimentações */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  placeholder="Buscar movimentações..."
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
                    <MenuItem value="Entrada">Entrada</MenuItem>
                    <MenuItem value="Saída">Saída</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data Inicial"
                    value={startDate}
                    onChange={setStartDate}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data Final"
                    value={endDate}
                    onChange={setEndDate}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PrintIcon />}
                    onClick={() => console.log('Imprimir relatório')}
                  >
                    Relatório
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={() => console.log('Exportar dados')}
                  >
                    Exportar
                  </Button>
                </Box>
              </Grid>
            </Grid>
            
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText', p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Total de Entradas
                  </Typography>
                  <Typography variant="h3">
                    {formatCurrency(totalEntradas)}
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'error.light', color: 'error.contrastText', p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Total de Saídas
                  </Typography>
                  <Typography variant="h3">
                    {formatCurrency(totalSaidas)}
                  </Typography>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText', p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Saldo
                  </Typography>
                  <Typography variant="h3">
                    {formatCurrency(totalEntradas - totalSaidas)}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Data</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor Unitário</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Projeto/Fornecedor</TableCell>
                  <TableCell>Documento</TableCell>
                  <TableCell>Localização</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMovements
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>{formatDate(movement.date)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={movement.type} 
                          size="small" 
                          color={getMovementTypeColor(movement.type)} 
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={movement.materialName}>
                          <Typography variant="body2">
                            {movement.materialCode}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>{movement.quantity} {movement.unit}</TableCell>
                      <TableCell>{formatCurrency(movement.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(movement.totalValue)}</TableCell>
                      <TableCell>
                        {movement.type === 'Entrada' ? movement.supplier : movement.project}
                      </TableCell>
                      <TableCell>{movement.documentNumber}</TableCell>
                      <TableCell>{movement.location}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDeleteClick(movement)}
                        >
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
            count={filteredMovements.length}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Box>
      )}
      
      {/* Aba de Nova Movimentação */}
      {tabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Movimentação</InputLabel>
                <Select
                  value={movementType}
                  onChange={(e) => setMovementType(e.target.value)}
                  label="Tipo de Movimentação"
                >
                  <MenuItem value="Entrada">Entrada</MenuItem>
                  <MenuItem value="Saída">Saída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                  label="Data da Movimentação"
                  value={movementDate}
                  onChange={setMovementDate}
                  renderInput={(params) => <TextField required {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Número do Documento"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder={movementType === 'Entrada' ? "Nota Fiscal" : "Requisição"}
              />
            </Grid>
            
            {movementType === 'Saída' && (
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Projeto</InputLabel>
                  <Select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    label="Projeto"
                  >
                    <MenuItem value="">Selecione um projeto</MenuItem>
                    {uniqueProjects.map((project, index) => (
                      <MenuItem key={index} value={project}>{project}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
          
          <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Materiais
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddMaterial}
            >
              Adicionar Material
            </Button>
          </Box>
          
          {selectedMaterials.length === 0 ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              Adicione materiais à movimentação clicando no botão acima.
            </Alert>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Unidade</TableCell>
                      <TableCell>Preço Unitário</TableCell>
                      <TableCell>Valor Total</TableCell>
                      <TableCell>Localização</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedMaterials.map((material, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Autocomplete
                            options={materials}
                            getOptionLabel={(option) => `${option.code} - ${option.name}`}
                            value={materials.find(m => m.id === material.materialId) || null}
                            onChange={(event, newValue) => {
                              handleMaterialChange(index, 'materialId', newValue ? newValue.id : '');
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                required
                                fullWidth
                                label="Material"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            required
                            value={material.quantity}
                            onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                            inputProps={{ min: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          {material.unit}
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            required
                            value={material.unitPrice}
                            onChange={(e) => handleMaterialChange(index, 'unitPrice', e.target.value)}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {formatCurrency(material.totalValue)}
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth size="small">
                            <Select
                              value={material.location}
                              onChange={(e) => handleMaterialChange(index, 'location', e.target.value)}
                            >
                              {uniqueLocations.map((location, idx) => (
                                <MenuItem key={idx} value={location}>{location}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveMaterial(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Typography variant="h6">
                  Total: {formatCurrency(calculateTotal())}
                </Typography>
              </Box>
            </>
          )}
          
          <TextField
            fullWidth
            label="Observações"
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmitMovement}
              disabled={selectedMaterials.length === 0}
            >
              Registrar Movimentação
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
    
    {/* Diálogo de confirmação de exclusão */}
    <Dialog
      open={openConfirmDialog}
      onClose={handleCloseConfirmDialog}
    >
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir esta movimentação? Esta ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirmDialog} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
    
    {/* Snackbar para mensagens */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </Container>
);
};

export default MaterialMovement;