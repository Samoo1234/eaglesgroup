import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const steps = ['Informações Básicas', 'Contatos', 'Detalhes Adicionais'];

const ClientAdd = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Prospecto',
    industry: '',
    website: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Estados Unidos',
    company: '',
    contacts: [
      {
        name: '',
        position: '',
        email: '',
        phone: '',
        primary: true
      }
    ]
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro do campo quando o usuário digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [name]: value
    };
    
    setFormData({
      ...formData,
      contacts: updatedContacts
    });
    
    // Limpar erro do campo quando o usuário digitar
    if (errors[`contacts.${index}.${name}`]) {
      setErrors({
        ...errors,
        [`contacts.${index}.${name}`]: null
      });
    }
  };
  
  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        {
          name: '',
          position: '',
          email: '',
          phone: '',
          primary: false
        }
      ]
    });
  };
  
  const setPrimaryContact = (index) => {
    const updatedContacts = formData.contacts.map((contact, i) => ({
      ...contact,
      primary: i === index
    }));
    
    setFormData({
      ...formData,
      contacts: updatedContacts
    });
  };
  
  const removeContact = (index) => {
    if (formData.contacts.length === 1) {
      return; // Manter pelo menos um contato
    }
    
    const updatedContacts = formData.contacts.filter((_, i) => i !== index);
    
    // Se removermos o contato principal, definir o primeiro como principal
    if (formData.contacts[index].primary && updatedContacts.length > 0) {
      updatedContacts[0].primary = true;
    }
    
    setFormData({
      ...formData,
      contacts: updatedContacts
    });
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;
    
    if (step === 0) {
      // Validar informações básicas
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
        isValid = false;
      }
      
      if (!formData.type) {
        newErrors.type = 'Tipo é obrigatório';
        isValid = false;
      }
      
      if (!formData.status) {
        newErrors.status = 'Status é obrigatório';
        isValid = false;
      }
      
      if (!formData.company) {
        newErrors.company = 'Empresa é obrigatória';
        isValid = false;
      }
    } else if (step === 1) {
      // Validar contatos
      formData.contacts.forEach((contact, index) => {
        if (!contact.name.trim()) {
          newErrors[`contacts.${index}.name`] = 'Nome é obrigatório';
          isValid = false;
        }
        
        if (!contact.email.trim()) {
          newErrors[`contacts.${index}.email`] = 'Email é obrigatório';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
          newErrors[`contacts.${index}.email`] = 'Email inválido';
          isValid = false;
        }
        
        if (!contact.phone.trim()) {
          newErrors[`contacts.${index}.phone`] = 'Telefone é obrigatório';
          isValid = false;
        }
      });
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(activeStep)) {
      // Aqui você enviaria os dados para a API
      console.log('Dados do formulário:', formData);
      
      // Redirecionar para a lista de clientes após o sucesso
      navigate('/dashboard/clients');
    }
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome do Cliente"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.type}>
                <InputLabel>Tipo de Cliente</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Tipo de Cliente"
                >
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Residencial">Residencial</MenuItem>
                  <MenuItem value="Governamental">Governamental</MenuItem>
                  <MenuItem value="Industrial">Industrial</MenuItem>
                  <MenuItem value="Institucional">Institucional</MenuItem>
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Ativo">Ativo</MenuItem>
                  <MenuItem value="Prospecto">Prospecto</MenuItem>
                  <MenuItem value="Inativo">Inativo</MenuItem>
                  <MenuItem value="Arquivado">Arquivado</MenuItem>
                </Select>
                {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Indústria/Setor"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.company}>
                <InputLabel>Empresa</InputLabel>
                <Select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  label="Empresa"
                >
                  <MenuItem value="Eagles Group LLC">Eagles Group LLC</MenuItem>
                  <MenuItem value="Brazilian Concrete LLC">Brazilian Concrete LLC</MenuItem>
                  <MenuItem value="Eagles Cleaning LLC">Eagles Cleaning LLC</MenuItem>
                </Select>
                {errors.company && <FormHelperText>{errors.company}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <>
            {formData.contacts.map((contact, index) => (
              <Card key={index} sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {contact.primary ? 'Contato Principal' : `Contato ${index + 1}`}
                    </Typography>
                    <Box>
                      {!contact.primary && (
                        <Button
                          size="small"
                          onClick={() => setPrimaryContact(index)}
                          sx={{ mr: 1 }}
                        >
                          Definir como Principal
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        onClick={() => removeContact(index)}
                        disabled={formData.contacts.length === 1}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Nome do Contato"
                        name="name"
                        value={contact.name}
                        onChange={(e) => handleContactChange(index, e)}
                        error={!!errors[`contacts.${index}.name`]}
                        helperText={errors[`contacts.${index}.name`]}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Cargo/Posição"
                        name="position"
                        value={contact.position}
                        onChange={(e) => handleContactChange(index, e)}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleContactChange(index, e)}
                        error={!!errors[`contacts.${index}.email`]}
                        helperText={errors[`contacts.${index}.email`]}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Telefone"
                        name="phone"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, e)}
                        error={!!errors[`contacts.${index}.phone`]}
                        helperText={errors[`contacts.${index}.phone`]}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addContact}
              fullWidth
            >
              Adicionar Outro Contato
            </Button>
          </>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Endereço
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cidade"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CEP"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="País"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Confirmar Informações
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Por favor, revise todas as informações antes de salvar. Após a criação do cliente, você poderá adicionar projetos, faturas e documentos relacionados.
              </Typography>
            </Grid>
          </Grid>
        );
      default:
        return 'Passo desconhecido';
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            component={RouterLink}
            to="/dashboard/clients"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Clientes
          </Button>
          <Typography variant="h4" gutterBottom>
            Adicionar Novo Cliente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Preencha as informações abaixo para cadastrar um novo cliente no sistema.
          </Typography>
        </Box>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 2, mb: 4 }}>
            {getStepContent(activeStep)}
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Voltar
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  Salvar Cliente
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Próximo
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ClientAdd;
