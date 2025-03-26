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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Category as CategoryIcon,
  LocalShipping as LocalShippingIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
      notes: Math.random() > 0.7 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : '',
    });
  }
  
  return materials;
};

const materials = generateMaterials();

// Preparar dados para gráficos
const prepareChartData = () => {
  const categoryData = [];
  const statusData = [];
  const valueData = [];
  
  // Dados para gráfico de categorias
  const categoryTotals = {};
  
  materials.forEach(material => {
    if (!categoryTotals[material.category]) {
      categoryTotals[material.category] = { name: material.category, value: 0, count: 0 };
    }
    
    categoryTotals[material.category].value += material.totalValue;
    categoryTotals[material.category].count += 1;
  });
  
  // Converter para array
  for (const category in categoryTotals) {
    categoryData.push(categoryTotals[category]);
  }
  
  // Ordenar por valor total
  categoryData.sort((a, b) => b.value - a.value);
  
  // Dados para gráfico de status
  const statusTotals = {
    'Disponível': { name: 'Disponível', value: 0 },
    'Baixo Estoque': { name: 'Baixo Estoque', value: 0 }
  };
  
  materials.forEach(material => {
    statusTotals[material.status].value += 1;
  });
  
  // Converter para array
  for (const status in statusTotals) {
    statusData.push(statusTotals[status]);
  }
  
  // Dados para gráfico de valor por localização
  const locationTotals = {};
  
  materials.forEach(material => {
    if (!locationTotals[material.location]) {
      locationTotals[material.location] = { name: material.location, value: 0 };
    }
    
    locationTotals[material.location].value += material.totalValue;
  });
  
  // Converter para array
  for (const location in locationTotals) {
    valueData.push(locationTotals[location]);
  }
  
  // Ordenar por valor total
  valueData.sort((a, b) => b.value - a.value);
  
  return { categoryData, statusData, valueData };
};

const { categoryData, statusData, valueData } = prepareChartData();

// Cores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#82CA9D', '#FFC658', '#8DD1E1', '#A4DE6C'];

const MaterialList = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  
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
  
  const handleDeleteClick = (material) => {
    setMaterialToDelete(material);
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setMaterialToDelete(null);
  };
  
  const handleConfirmDelete = () => {
    // Aqui você enviaria uma requisição para excluir o material
    console.log('Excluindo material:', materialToDelete.id);
    setOpenDeleteDialog(false);
    setMaterialToDelete(null);
  };
  
  // Filtrar materiais
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || material.category === categoryFilter;
    const matchesStatus = statusFilter === '' || material.status === statusFilter;
    const matchesLocation = locationFilter === '' || material.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });
  
  // Calcular totais
  const totalItems = filteredMaterials.length;
  const totalValue = filteredMaterials.reduce((sum, material) => sum + material.totalValue, 0);
  const lowStockItems = filteredMaterials.filter(m => m.status === 'Baixo Estoque').length;
  
  // Obter cor para status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Disponível':
        return 'success';
      case 'Baixo Estoque':
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Formatar data
  const formatDate = (date) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR');
  };
  
  // Obter categorias únicas para o filtro
  const uniqueCategories = [...new Set(materials.map(material => material.category))];
  
  // Obter localizações únicas para o filtro
  const uniqueLocations = [...new Set(materials.map(material => material.location))];
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Materiais
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gerencie o estoque de materiais para seus projetos de construção
        </Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Estatísticas de Materiais */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total de Materiais
            </Typography>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
              {totalItems}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Valor Total em Estoque
            </Typography>
            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>
              {formatCurrency(totalValue)}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Materiais Disponíveis
            </Typography>
            <Typography variant="h3" color="success.main" sx={{ fontWeight: 'bold' }}>
              {totalItems - lowStockItems}
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Baixo Estoque
            </Typography>
            <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>
              {lowStockItems}
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
          <Tab label="Lista de Materiais" icon={<InventoryIcon />} iconPosition="start" />
          <Tab label="Relatórios" icon={<BarChartIcon />} iconPosition="start" />
        </Tabs>
        
        {/* Aba de Lista de Materiais */}
        {tabValue === 0 && (
          <Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Buscar materiais..."
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
                    <InputLabel>Categoria</InputLabel>
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      label="Categoria"
                    >
                      <MenuItem value="">Todas</MenuItem>
                      {uniqueCategories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                      ))}
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
                      <MenuItem value="Disponível">Disponível</MenuItem>
                      <MenuItem value="Baixo Estoque">Baixo Estoque</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={2}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Localização</InputLabel>
                    <Select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      label="Localização"
                    >
                      <MenuItem value="">Todas</MenuItem>
                      {uniqueLocations.map((location, index) => (
                        <MenuItem key={index} value={location}>{location}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddIcon />}
                      component={RouterLink}
                      to="/dashboard/materials/add"
                    >
                      Novo Material
                    </Button>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      startIcon={<LocalShippingIcon />}
                      component={RouterLink}
                      to="/dashboard/materials/movement"
                    >
                      Movimentação
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              
              {lowStockItems > 0 && (
                <Alert 
                  severity="warning" 
                  icon={<WarningIcon />}
                  sx={{ mt: 2 }}
                >
                  Existem {lowStockItems} materiais com estoque abaixo do mínimo recomendado.
                </Alert>
              )}
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Unidade</TableCell>
                    <TableCell>Preço Unitário</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Fornecedor</TableCell>
                    <TableCell>Localização</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMaterials
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.code}</TableCell>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell>
                          {material.quantity}
                          {material.status === 'Baixo Estoque' && (
                            <Typography variant="caption" color="warning.main" sx={{ display: 'block' }}>
                              Min: {material.minQuantity}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>{material.unit}</TableCell>
                        <TableCell>{formatCurrency(material.unitPrice)}</TableCell>
                        <TableCell>{formatCurrency(material.totalValue)}</TableCell>
                        <TableCell>{material.supplier}</TableCell>
                        <TableCell>{material.location}</TableCell>
                        <TableCell>
                          <Chip 
                            label={material.status} 
                            size="small" 
                            color={getStatusColor(material.status)} 
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            color="primary"
                            component={RouterLink}
                            to={`/dashboard/materials/${material.id}`}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="primary"
                            component={RouterLink}
                            to={`/dashboard/materials/edit/${material.id}`}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteClick(material)}
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
              count={filteredMaterials.length}
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
              {/* Gráfico de Valor por Categoria */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Valor de Estoque por Categoria
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={categoryData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="value" name="Valor Total" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              
              {/* Gráfico de Status */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Status de Estoque
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
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#4caf50' : '#ff9800'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              
              {/* Gráfico de Valor por Localização */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Valor de Estoque por Localização
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={valueData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="value" name="Valor Total" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              
              {/* Estatísticas Adicionais */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Estatísticas de Estoque
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Total de Itens
                        </Typography>
                        <Typography variant="h4">
                          {materials.length}
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Valor Médio por Item
                        </Typography>
                        <Typography variant="h4">
                          {formatCurrency(totalValue / (materials.length || 1))}
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Categorias
                        </Typography>
                        <Typography variant="h4">
                          {uniqueCategories.length}
                        </Typography>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          % em Baixo Estoque
                        </Typography>
                        <Typography variant="h4">
                          {((lowStockItems / (materials.length || 1)) * 100).toFixed(1)}%
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o material "{materialToDelete?.name}"? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialList;
