import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const MaterialAdd = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  
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
  
  // Estados para validação
  const [errors, setErrors] = useState({});
  
  // Passos do formulário
  const steps = [
    'Informações Básicas',
    'Detalhes de Estoque',
    'Informações do Fornecedor',
    'Revisão'
  ];
  
  // Manipuladores de eventos
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleCancel = () => {
    setOpenCancelDialog(true);
  };
  
  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };
  
  const handleConfirmCancel = () => {
    setOpenCancelDialog(false);
    navigate('/dashboard/materials');
  };
  
  const handleSubmit = () => {
    // Aqui você enviaria uma requisição para salvar o material
    console.log('Salvando material:', formData);
    
    // Redirecionar para a lista de materiais
    navigate('/dashboard/materials');
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
  
  // Validação por etapa
  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};
    
    switch (step) {
      case 0: // Informações Básicas
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
        break;
        
      case 1: // Detalhes de Estoque
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
        break;
        
      case 2: // Informações do Fornecedor
        if (!formData.supplier) {
          newErrors.supplier = 'Fornecedor é obrigatório';
          isValid = false;
        }
        
        if (!formData.lastPurchaseDate) {
          newErrors.lastPurchaseDate = 'Data da última compra é obrigatória';
          isValid = false;
        }
        break;
        
      default:
        break;
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
  
  // Formatar data
  const formatDate = (date) => {
    if (!date) return '-';
    return date.toLocaleDateString('pt-BR');
  };
  
  // Renderizar etapa atual
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Informações Básicas
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Código"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Deixe em branco para gerar automaticamente"
                  helperText="Opcional. Um código será gerado automaticamente se não for fornecido."
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
            </Grid>
          </Box>
        );
        
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Detalhes de Estoque
            </Typography>
            
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
            </Grid>
          </Box>
        );
        
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Informações do Fornecedor
            </Typography>
            
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
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-mail do Contato"
                  name="supplierContact.email"
                  value={formData.supplierContact.email}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Telefone do Contato"
                  name="supplierContact.phone"
                  value={formData.supplierContact.phone}
                  onChange={handleChange}
                />
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
                  helperText="Informações adicionais sobre o material ou fornecedor"
                />
              </Grid>
            </Grid>
          </Box>
        );
        
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Revisão
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Revise as informações do material antes de salvar.
            </Alert>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <InventoryIcon sx={{ mr: 1 }} color="primary" />
                    <Typography variant="h6">
                      Informações Básicas
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Código:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          {formData.code || 'Será gerado automaticamente'}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Nome:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">{formData.name}</Typography>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Categoria:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">{formData.category}</Typography>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Descrição:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">{formData.description}</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
                
                <Card>
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <BusinessIcon sx={{ mr: 1 }} color="primary" />
                    <Typography variant="h6">
                      Informações do Fornecedor
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Fornecedor:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">{formData.supplier}</Typography>
                      </Grid>
                      
                      <Grid item xs={4}>
                        <Typography variant="subtitle2">Última Compra:</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2">
                          {formData.lastPurchaseDate ? formatDate(formData.lastPurchaseDate) : '-'}
                        </Typography>
                      </Grid>
                      
                      {formData.supplierContact.name && (
                        <>
                          <Grid item xs={4}>
                            <Typography variant="subtitle2">Contato:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2">{formData.supplierContact.name}</Typography>
                          </Grid>
                        </>
                      )}
                      
                      {formData.supplierContact.email && (
                        <>
                          <Grid item xs={4}>
                            <Typography variant="subtitle2">E-mail:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2">{formData.supplierContact.email}</Typography>
                          </Grid>
                        </>
                      )}
                      
                      {formData.supplierContact.phone && (
                        <>
                          <Grid item xs={4}>
                            <Typography variant="subtitle2">Telefone:</Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body2">{formData.supplierContact.phone}</Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <InventoryIcon sx={{ mr: 1 }} color="primary" />
                    <Typography variant="h6">
                      Detalhes de Estoque
                    </Typography>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Quantidade:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {formData.quantity} {formData.unit}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Quantidade Mínima:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {formData.minQuantity} {formData.unit}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Preço Unitário:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {formatCurrency(formData.unitPrice)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Valor Total:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          {formatCurrency(formData.quantity * formData.unitPrice)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Localização:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">{formData.location}</Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Status:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color={formData.quantity <= formData.minQuantity ? 'warning.main' : 'success.main'}>
                          {formData.quantity <= formData.minQuantity ? 'Baixo Estoque' : 'Disponível'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
                
                {formData.notes && (
                  <Card>
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                      <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                      <Typography variant="h6">
                        Observações
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2">{formData.notes}</Typography>
                    </Box>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Box>
        );
        
      default:
        return null;
    }
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
          Adicionar Novo Material
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preencha as informações para adicionar um novo material ao estoque
        </Typography>
      </Box>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {renderStepContent(activeStep)}
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
        
        <Box>
          {activeStep > 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              Próximo
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              Salvar Material
            </Button>
          )}
        </Box>
      </Box>
      
      {/* Diálogo de confirmação para cancelar */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
      >
        <DialogTitle>Cancelar Cadastro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja cancelar o cadastro deste material? Todas as informações inseridas serão perdidas.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelDialog} color="primary">
            Não, Continuar Editando
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Sim, Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialAdd;
