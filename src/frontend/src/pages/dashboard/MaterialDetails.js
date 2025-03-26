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
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  LocalShipping as LocalShippingIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  DateRange as DateRangeIcon,
  Note as NoteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      supplierContact: {
        name: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
        email: 'contato@' + supplier.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
        phone: '(11) 9' + Math.floor(Math.random() * 10000).toString().padStart(4, '0') + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      }
    });
  }
  
  return materials;
};

// Gerar histórico de movimentação para um material
const generateMovementHistory = (materialId) => {
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
  
  // Data atual
  const currentDate = new Date();
  
  // Gerar histórico para os últimos 6 meses
  for (let i = 0; i < 15; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - Math.floor(Math.random() * 180)); // Últimos 6 meses
    
    const type = types[Math.floor(Math.random() * types.length)];
    const quantity = Math.floor(Math.random() * 100) + 1;
    
    history.push({
      id: i + 1,
      date: date,
      type: type,
      quantity: quantity,
      project: type === 'Saída' ? projects[Math.floor(Math.random() * projects.length)] : null,
      user: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
      notes: type === 'Entrada' 
        ? 'Compra de material para estoque' 
        : 'Utilização em projeto'
    });
  }
  
  // Ordenar por data (mais recente primeiro)
  history.sort((a, b) => b.date - a.date);
  
  return history;
};

// Gerar dados para o gráfico de histórico de estoque
const generateStockHistory = () => {
  const history = [];
  const currentDate = new Date();
  let currentStock = Math.floor(Math.random() * 500) + 100;
  
  // Gerar dados para os últimos 12 meses
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    
    // Variação aleatória no estoque
    const variation = Math.floor(Math.random() * 100) - 50;
    currentStock += variation;
    
    // Garantir que o estoque não fique negativo
    if (currentStock < 0) currentStock = 0;
    
    history.push({
      date: date.toLocaleString('pt-BR', { month: 'short', year: '2-digit' }),
      estoque: currentStock
    });
  }
  
  // Ordenar por data (mais antiga primeiro)
  history.reverse();
  
  return history;
};

const materials = generateMaterials();

const MaterialDetails = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [movementHistory, setMovementHistory] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openMovementDialog, setOpenMovementDialog] = useState(false);
  const [movementType, setMovementType] = useState('');
  const [movementQuantity, setMovementQuantity] = useState('');
  const [movementNotes, setMovementNotes] = useState('');
  
  // Buscar material pelo ID
  useEffect(() => {
    // Simulando busca de material
    const foundMaterial = materials.find(m => m.id === parseInt(id));
    setMaterial(foundMaterial);
    
    // Simulando busca de histórico de movimentação
    const history = generateMovementHistory(parseInt(id));
    setMovementHistory(history);
    
    // Simulando busca de histórico de estoque
    const stockData = generateStockHistory();
    setStockHistory(stockData);
  }, [id]);
  
  // Manipuladores de eventos
  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleConfirmDelete = () => {
    // Aqui você enviaria uma requisição para excluir o material
    console.log('Excluindo material:', material.id);
    setOpenDeleteDialog(false);
    // Redirecionar para a lista de materiais
    window.location.href = '/dashboard/materials';
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleOpenMovementDialog = (type) => {
    setMovementType(type);
    setMovementQuantity('');
    setMovementNotes('');
    setOpenMovementDialog(true);
  };
  
  const handleCloseMovementDialog = () => {
    setOpenMovementDialog(false);
  };
  
  const handleConfirmMovement = () => {
    // Aqui você enviaria uma requisição para registrar a movimentação
    console.log('Registrando movimentação:', {
      materialId: material.id,
      type: movementType,
      quantity: movementQuantity,
      notes: movementNotes
    });
    setOpenMovementDialog(false);
    
    // Atualizar histórico de movimentação (simulação)
    const newMovement = {
      id: movementHistory.length + 1,
      date: new Date(),
      type: movementType,
      quantity: parseInt(movementQuantity),
      project: null,
      user: 'Usuário Atual',
      notes: movementNotes
    };
    
    setMovementHistory([newMovement, ...movementHistory]);
    
    // Atualizar quantidade do material (simulação)
    const newQuantity = movementType === 'Entrada' 
      ? material.quantity + parseInt(movementQuantity)
      : material.quantity - parseInt(movementQuantity);
    
    setMaterial({
      ...material,
      quantity: newQuantity,
      status: newQuantity <= material.minQuantity ? 'Baixo Estoque' : 'Disponível'
    });
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
  
  if (!material) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Material não encontrado</Typography>
        <Button
          component={RouterLink}
          to="/dashboard/materials"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Voltar para Lista de Materiais
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
            to="/dashboard/materials"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Materiais
          </Button>
          <Typography variant="h4" gutterBottom>
            {material.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip 
              label={material.status} 
              size="small" 
              color={getStatusColor(material.status)} 
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              Código: {material.code}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => handleOpenMovementDialog('Entrada')}
            sx={{ mr: 1 }}
          >
            Entrada
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<RemoveIcon />}
            onClick={() => handleOpenMovementDialog('Saída')}
            sx={{ mr: 1 }}
          >
            Saída
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            component={RouterLink}
            to={`/dashboard/materials/edit/${material.id}`}
            sx={{ mr: 1 }}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {/* Detalhes do Material */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InventoryIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Informações do Material
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CategoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Categoria" 
                    secondary={material.category} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Descrição" 
                    secondary={material.description} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <InventoryIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Quantidade em Estoque" 
                    secondary={
                      <Box>
                        <Typography variant="body2" component="span">
                          {material.quantity} {material.unit}
                        </Typography>
                        {material.status === 'Baixo Estoque' && (
                          <Typography variant="caption" color="warning.main" sx={{ display: 'block' }}>
                            Quantidade mínima: {material.minQuantity} {material.unit}
                          </Typography>
                        )}
                      </Box>
                    } 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Preço Unitário" 
                    secondary={formatCurrency(material.unitPrice)} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Valor Total em Estoque" 
                    secondary={formatCurrency(material.totalValue)} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Localização" 
                    secondary={material.location} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Última Compra" 
                    secondary={formatDate(material.lastPurchaseDate)} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Último Uso" 
                    secondary={formatDate(material.lastUsedDate)} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          {material.notes && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NoteIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h6">
                    Observações
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2">
                  {material.notes}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        
        {/* Informações do Fornecedor */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Informações do Fornecedor
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fornecedor" 
                    secondary={material.supplier} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Contato" 
                    secondary={material.supplierContact.name} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="E-mail" 
                    secondary={material.supplierContact.email} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Telefone" 
                    secondary={material.supplierContact.phone} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BarChartIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Histórico de Estoque
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={stockHistory}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="estoque" name="Quantidade" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Histórico de Movimentação */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Histórico de Movimentação
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell>Projeto</TableCell>
                      <TableCell>Usuário</TableCell>
                      <TableCell>Observações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movementHistory.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>{formatDate(movement.date)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={movement.type} 
                            size="small" 
                            color={getMovementTypeColor(movement.type)} 
                          />
                        </TableCell>
                        <TableCell>{movement.quantity} {material.unit}</TableCell>
                        <TableCell>
                          {movement.project ? (
                            <RouterLink to="#" style={{ textDecoration: 'none' }}>
                              {movement.project}
                            </RouterLink>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>{movement.user}</TableCell>
                        <TableCell>{movement.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o material "{material.name}"? Esta ação não pode ser desfeita.
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
      
      {/* Diálogo de movimentação de estoque */}
      <Dialog
        open={openMovementDialog}
        onClose={handleCloseMovementDialog}
      >
        <DialogTitle>
          {movementType === 'Entrada' ? 'Registrar Entrada' : 'Registrar Saída'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {movementType === 'Entrada' 
              ? 'Informe a quantidade de itens a serem adicionados ao estoque.' 
              : 'Informe a quantidade de itens a serem retirados do estoque.'}
          </DialogContentText>
          
          <TextField
            fullWidth
            label="Quantidade"
            type="number"
            value={movementQuantity}
            onChange={(e) => setMovementQuantity(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">{material.unit}</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Observações"
            multiline
            rows={3}
            value={movementNotes}
            onChange={(e) => setMovementNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMovementDialog} color="inherit">
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmMovement} 
            color={movementType === 'Entrada' ? 'success' : 'error'}
            disabled={!movementQuantity || parseInt(movementQuantity) <= 0}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialDetails;
