import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment,
  IconButton,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { ptBR } from 'date-fns/locale';

// Categorias de materiais
const materialCategories = [
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

// Unidades de medida
const measurementUnits = [
  'kg',
  'unidade',
  'm²',
  'm³',
  'm',
  'litro',
  'pacote',
  'conjunto',
  'rolo',
  'barra'
];

// Localizações de estoque
const stockLocations = [
  'Depósito Principal',
  'Depósito Secundário',
  'Almoxarifado',
  'Canteiro de Obras'
];

// Fornecedores
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

const materials = generateMaterials();

const MaterialEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    minQuantity: '',
    unitPrice: '',
    supplier: '',
    location: '',
    lastPurchaseDate: null,
    notes: '',
    supplierContact: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  // Estado original do formulário para detectar mudanças
  const [originalFormData, setOriginalFormData] = useState(null);
  
  // Estados para validação
  const [errors, setErrors] = useState({});
  
  // Buscar material pelo ID
  useEffect(() => {
    // Simulando busca de material
    const foundMaterial = materials.find(m => m.id === parseInt(id));
    
    if (foundMaterial) {
      setFormData(foundMaterial);
      setOriginalFormData(JSON.stringify(foundMaterial));
    } else {
      // Redirecionar para a lista de materiais se o material não for encontrado
      navigate('/dashboard/materials');
    }
  }, [id, navigate]);
  
  // Detectar mudanças no formulário
  useEffect(() => {
    if (originalFormData) {
      setHasChanges(JSON.stringify(formData) !== originalFormData);
    }
  }, [formData, originalFormData]);
  
  // Manipuladores de eventos
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleCancel = () => {
    if (hasChanges) {
      setOpenCancelDialog(true);
    } else {
      navigate('/dashboard/materials');
    }
  };
  
  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };
  
  const handleConfirmCancel = () => {
    setOpenCancelDialog(false);
    navigate('/dashboard/materials');
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Aqui você enviaria uma requisição para atualizar o material
      console.log('Atualizando material:', formData);
      
      // Redirecionar para a lista de materiais
      navigate('/dashboard/materials');
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date
    });
    
    // Limpar erro do campo
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: null
      });
    }
  };
  
  // Validação do formulário
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    
    // Validar campos obrigatórios
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
      isValid = false;
    }
    
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantidade deve ser maior que zero';
      isValid = false;
    }
    
    if (!formData.unit) {
      newErrors.unit = 'Unidade de medida é obrigatória';
      isValid = false;
    }
    
    if (!formData.minQuantity || formData.minQuantity < 0) {
      newErrors.minQuantity = 'Quantidade mínima deve ser maior ou igual a zero';
      isValid = false;
    }
    
    if (!formData.unitPrice || formData.unitPrice <= 0) {
      newErrors.unitPrice = 'Preço unitário deve ser maior que zero';
      isValid = false;
    }
    
    if (!formData.location) {
      newErrors.location = 'Localização é obrigatória';
      isValid = false;
    }
    
    if (!formData.supplier) {
      newErrors.supplier = 'Fornecedor é obrigatório';
      isValid = false;
    }
    
    if (!formData.lastPurchaseDate) {
      newErrors.lastPurchaseDate = 'Data da última compra é obrigatória';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Formatar moeda
  const formatCurrency = (value) => {
    if (!value) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          Editar Material
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formData.code} - {formData.name}
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
          <Tab label="Informações Básicas" icon={<InventoryIcon />} iconPosition="start" />
          <Tab label="Estoque" icon={<InventoryIcon />} iconPosition="start" />
          <Tab label="Fornecedor" icon={<BusinessIcon />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Aba de Informações Básicas */}
          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Código"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  disabled
                  helperText="O código não pode ser alterado"
                />
              </Grid>
              
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  required
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Descrição"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.category}>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Categoria"
                  >
                    {materialCategories.map((category, index) => (
                      <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  helperText="Informações adicionais sobre o material"
                />
              </Grid>
            </Grid>
          )}
          
          {/* Aba de Estoque */}
          {tabValue === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Quantidade"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.unit}>
                  <InputLabel>Unidade de Medida</InputLabel>
                  <Select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    label="Unidade de Medida"
                  >
                    {measurementUnits.map((unit, index) => (
                      <MenuItem key={index} value={unit}>{unit}</MenuItem>
                    ))}
                  </Select>
                  {errors.unit && <FormHelperText>{errors.unit}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Quantidade Mínima"
                  name="minQuantity"
                  type="number"
                  value={formData.minQuantity}
                  onChange={handleChange}
                  error={!!errors.minQuantity}
                  helperText={errors.minQuantity || "Quantidade mínima para alerta de estoque baixo"}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Preço Unitário"
                  name="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  error={!!errors.unitPrice}
                  helperText={errors.unitPrice}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.location}>
                  <InputLabel>Localização</InputLabel>
                  <Select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    label="Localização"
                  >
                    {stockLocations.map((location, index) => (
                      <MenuItem key={index} value={location}>{location}</MenuItem>
                    ))}
                  </Select>
                  {errors.location && <FormHelperText>{errors.location}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Alert 
                  severity={formData.quantity <= formData.minQuantity ? "warning" : "info"}
                  sx={{ mt: 2 }}
                >
                  {formData.quantity <= formData.minQuantity 
                    ? `Este material está com estoque abaixo do mínimo recomendado (${formData.minQuantity} ${formData.unit}).`
                    : `O estoque atual está acima do mínimo recomendado (${formData.minQuantity} ${formData.unit}).`
                  }
                </Alert>
              </Grid>
            </Grid>
          )}
          
          {/* Aba de Fornecedor */}
          {tabValue === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.supplier}>
                  <InputLabel>Fornecedor</InputLabel>
                  <Select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    label="Fornecedor"
                  >
                    {suppliers.map((supplier, index) => (
                      <MenuItem key={index} value={supplier}>{supplier}</MenuItem>
                    ))}
                  </Select>
                  {errors.supplier && <FormHelperText>{errors.supplier}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                  <DatePicker
                    label="Data da Última Compra"
                    value={formData.lastPurchaseDate}
                    onChange={(date) => handleDateChange(date, 'lastPurchaseDate')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        error={!!errors.lastPurchaseDate}
                        helperText={errors.lastPurchaseDate}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Informações de Contato do Fornecedor
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome do Contato"
                  name="supplierContact.name"
                  value={formData.supplierContact.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-mail do Contato"
                  name="supplierContact.email"
                  value={formData.supplierContact.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone do Contato"
                  name="supplierContact.phone"
                  value={formData.supplierContact.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          disabled={!hasChanges}
        >
          Salvar Alterações
        </Button>
      </Box>
      
      {/* Diálogo de confirmação para cancelar */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
      >
        <DialogTitle>Descartar Alterações</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja descartar as alterações feitas neste material? Todas as modificações serão perdidas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Não, Continuar Editando
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Sim, Descartar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialEdit;
