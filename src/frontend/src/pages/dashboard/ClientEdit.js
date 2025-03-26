import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
  Tabs,
  Tab,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
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
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: 'Estados Unidos',
      projects: Math.floor(Math.random() * 5),
      totalValue: Math.floor(Math.random() * 10000000) + 100000,
      status: statuses[statusIndex],
      createdAt: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      website: `www.${companyNames[companyIndex].toLowerCase().replace(/\s+/g, '').replace(/\./g, '')}.com`,
      industry: ['Construção Civil', 'Tecnologia', 'Saúde', 'Educação', 'Varejo', 'Hotelaria', 'Energia', 'Transporte'][Math.floor(Math.random() * 8)],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
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
      ]
    });
  }
  return clients;
};

const clients = generateClients();

const ClientEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: '',
    industry: '',
    website: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    company: '',
    contacts: []
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  
  // Buscar dados do cliente
  useEffect(() => {
    // Simulando busca de cliente
    const foundClient = clients.find(c => c.id === parseInt(id));
    
    if (foundClient) {
      setFormData({
        name: foundClient.name,
        type: foundClient.type,
        status: foundClient.status,
        industry: foundClient.industry || '',
        website: foundClient.website || '',
        description: foundClient.description || '',
        address: foundClient.address || '',
        city: foundClient.city || '',
        state: foundClient.state || '',
        zipCode: foundClient.zipCode || '',
        country: foundClient.country || 'Estados Unidos',
        company: foundClient.company,
        contacts: foundClient.contacts || []
      });
    } else {
      setError('Cliente não encontrado');
    }
    
    setLoading(false);
  }, [id]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpar erro do campo quando o usuário digitar
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
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
    if (validationErrors[`contacts.${index}.${name}`]) {
      setValidationErrors({
        ...validationErrors,
        [`contacts.${index}.${name}`]: null
      });
    }
  };
  
  const addContact = () => {
    const newContactId = Math.max(...formData.contacts.map(c => c.id), 0) + 1;
    
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        {
          id: newContactId,
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
  
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // Validar campos básicos
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.type) {
      errors.type = 'Tipo é obrigatório';
      isValid = false;
    }
    
    if (!formData.status) {
      errors.status = 'Status é obrigatório';
      isValid = false;
    }
    
    if (!formData.company) {
      errors.company = 'Empresa é obrigatória';
      isValid = false;
    }
    
    // Validar contatos
    formData.contacts.forEach((contact, index) => {
      if (!contact.name.trim()) {
        errors[`contacts.${index}.name`] = 'Nome é obrigatório';
        isValid = false;
      }
      
      if (!contact.email.trim()) {
        errors[`contacts.${index}.email`] = 'Email é obrigatório';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
        errors[`contacts.${index}.email`] = 'Email inválido';
        isValid = false;
      }
      
      if (!contact.phone.trim()) {
        errors[`contacts.${index}.phone`] = 'Telefone é obrigatório';
        isValid = false;
      }
    });
    
    setValidationErrors(errors);
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulando salvamento
      setSuccess(true);
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate(`/dashboard/clients/${id}`);
      }, 2000);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Carregando dados do cliente...</Typography>
        </Paper>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
          <Button
            component={RouterLink}
            to="/dashboard/clients"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 2 }}
          >
            Voltar para Lista de Clientes
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Button
            component={RouterLink}
            to={`/dashboard/clients/${id}`}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Detalhes do Cliente
          </Button>
          <Typography variant="h4" gutterBottom>
            Editar Cliente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Atualize as informações do cliente conforme necessário.
          </Typography>
        </Box>
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Cliente atualizado com sucesso! Redirecionando...
          </Alert>
        )}
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="client edit tabs">
            <Tab label="Informações Básicas" />
            <Tab label="Contatos" />
            <Tab label="Endereço e Detalhes" />
          </Tabs>
        </Box>
        
        <form onSubmit={handleSubmit}>
          {/* Aba de Informações Básicas */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nome do Cliente"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!validationErrors.name}
                  helperText={validationErrors.name}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!validationErrors.type}>
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
                  {validationErrors.type && <FormHelperText>{validationErrors.type}</FormHelperText>}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!validationErrors.status}>
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
                  {validationErrors.status && <FormHelperText>{validationErrors.status}</FormHelperText>}
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
                <FormControl fullWidth required error={!!validationErrors.company}>
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
                  {validationErrors.company && <FormHelperText>{validationErrors.company}</FormHelperText>}
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
          )}
          
          {/* Aba de Contatos */}
          {tabValue === 1 && (
            <>
              {formData.contacts.map((contact, index) => (
                <Card key={contact.id} sx={{ mb: 3 }}>
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
                          startIcon={<DeleteIcon />}
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
                          error={!!validationErrors[`contacts.${index}.name`]}
                          helperText={validationErrors[`contacts.${index}.name`]}
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
                          error={!!validationErrors[`contacts.${index}.email`]}
                          helperText={validationErrors[`contacts.${index}.email`]}
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
                          error={!!validationErrors[`contacts.${index}.phone`]}
                          helperText={validationErrors[`contacts.${index}.phone`]}
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
          )}
          
          {/* Aba de Endereço e Detalhes */}
          {tabValue === 2 && (
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
            </Grid>
          )}
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Salvar Alterações
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ClientEdit;
