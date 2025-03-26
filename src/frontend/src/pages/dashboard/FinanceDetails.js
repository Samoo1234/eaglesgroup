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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  AttachMoney as AttachMoneyIcon,
  MoneyOff as MoneyOffIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  DateRange as DateRangeIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  Note as NoteIcon,
} from '@mui/icons-material';

// Dados de exemplo para transações financeiras
const generateTransactions = () => {
  const transactions = [];
  const types = ['Receita', 'Despesa'];
  const categories = {
    'Receita': ['Pagamento de Projeto', 'Consultoria', 'Adiantamento', 'Venda de Material', 'Outros'],
    'Despesa': ['Material de Construção', 'Mão de Obra', 'Equipamentos', 'Administrativo', 'Impostos', 'Outros']
  };
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
  const clients = [
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
  const paymentMethods = ['Transferência Bancária', 'Cartão de Crédito', 'Cheque', 'Dinheiro', 'Boleto'];
  const status = ['Pago', 'Pendente', 'Atrasado', 'Cancelado'];
  
  // Gerar transações para os últimos 12 meses
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setMonth(startDate.getMonth() - 11);
  
  for (let i = 1; i <= 100; i++) {
    const transactionDate = new Date(startDate);
    transactionDate.setDate(1);
    transactionDate.setMonth(startDate.getMonth() + Math.floor(Math.random() * 12));
    transactionDate.setDate(Math.floor(Math.random() * 28) + 1);
    
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[type][Math.floor(Math.random() * categories[type].length)];
    const projectIndex = Math.floor(Math.random() * projects.length);
    const clientIndex = Math.floor(Math.random() * clients.length);
    
    const amount = type === 'Receita' 
      ? Math.floor(Math.random() * 50000) + 10000 
      : Math.floor(Math.random() * 20000) + 1000;
    
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const statusValue = status[Math.floor(Math.random() * status.length)];
    
    const dueDate = new Date(transactionDate);
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 15);
    
    const paymentDate = statusValue === 'Pago' 
      ? new Date(dueDate.getTime() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000) 
      : null;
    
    transactions.push({
      id: i,
      transactionId: `TRX-${10000 + i}`,
      date: transactionDate,
      dueDate: dueDate,
      paymentDate: paymentDate,
      type: type,
      category: category,
      description: `${type === 'Receita' ? 'Recebimento' : 'Pagamento'} - ${category}`,
      amount: amount,
      project: projectIndex >= 0 ? projects[projectIndex] : null,
      projectId: projectIndex >= 0 ? projectIndex + 1 : null,
      client: clientIndex >= 0 ? clients[clientIndex] : null,
      clientId: clientIndex >= 0 ? clientIndex + 1 : null,
      paymentMethod: paymentMethod,
      status: statusValue,
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.',
      createdBy: ['João Silva', 'Maria Oliveira', 'Carlos Santos'][Math.floor(Math.random() * 3)],
      company: ['Eagles Group LLC', 'Brazilian Concrete LLC', 'Eagles Cleaning LLC'][Math.floor(Math.random() * 3)],
      attachments: Math.random() > 0.5 ? [
        { id: 1, name: 'Comprovante.pdf', type: 'PDF', size: '2.5 MB', uploadDate: transactionDate },
        { id: 2, name: 'Nota_Fiscal.pdf', type: 'PDF', size: '1.8 MB', uploadDate: transactionDate }
      ] : [],
    });
  }
  
  // Ordenar por data (mais recente primeiro)
  transactions.sort((a, b) => b.date - a.date);
  
  return transactions;
};

const transactions = generateTransactions();

const FinanceDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  
  // Buscar transação pelo ID
  useEffect(() => {
    // Simulando busca de transação
    const foundTransaction = transactions.find(t => t.id === parseInt(id));
    setTransaction(foundTransaction);
  }, [id]);
  
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
      case 'Pago':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Atrasado':
        return 'error';
      case 'Cancelado':
        return 'default';
      default:
        return 'default';
    }
  };
  
  // Obter cor para tipo
  const getTypeColor = (type) => {
    switch (type) {
      case 'Receita':
        return 'success';
      case 'Despesa':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Obter ícone para tipo
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Receita':
        return <AttachMoneyIcon color="success" />;
      case 'Despesa':
        return <MoneyOffIcon color="error" />;
      default:
        return <ReceiptIcon />;
    }
  };
  
  const handleDelete = () => {
    setOpenDialog(true);
  };
  
  const handleConfirmDelete = () => {
    // Aqui você enviaria uma requisição para excluir a transação
    console.log('Excluindo transação:', transaction.id);
    setOpenDialog(false);
    // Redirecionar para a lista de transações
    window.location.href = '/dashboard/finance';
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  if (!transaction) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4">Transação não encontrada</Typography>
        <Button
          component={RouterLink}
          to="/dashboard/finance"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Voltar para Lista de Transações
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
            to="/dashboard/finance"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Voltar para Lista de Transações
          </Button>
          <Typography variant="h4" gutterBottom>
            Detalhes da Transação
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chip 
              icon={getTypeIcon(transaction.type)}
              label={transaction.type} 
              size="small" 
              color={getTypeColor(transaction.type)} 
              sx={{ mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              ID: {transaction.transactionId}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            component={RouterLink}
            to={`/dashboard/finance/edit/${transaction.id}`}
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
        {/* Detalhes da Transação */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Informações da Transação
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
                    secondary={transaction.category} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Descrição" 
                    secondary={transaction.description} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data da Transação" 
                    secondary={formatDate(transaction.date)} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data de Vencimento" 
                    secondary={formatDate(transaction.dueDate)} 
                  />
                </ListItem>
                
                {transaction.paymentDate && (
                  <ListItem>
                    <ListItemIcon>
                      <DateRangeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Data de Pagamento" 
                      secondary={formatDate(transaction.paymentDate)} 
                    />
                  </ListItem>
                )}
                
                <ListItem>
                  <ListItemIcon>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Valor" 
                    secondary={
                      <Typography 
                        variant="body2" 
                        color={transaction.type === 'Receita' ? 'success.main' : 'error.main'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {formatCurrency(transaction.amount)}
                      </Typography>
                    } 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PaymentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Método de Pagamento" 
                    secondary={transaction.paymentMethod} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <AccountBalanceIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Status" 
                    secondary={
                      <Chip 
                        label={transaction.status} 
                        size="small" 
                        color={getStatusColor(transaction.status)} 
                      />
                    } 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          {transaction.notes && (
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
                  {transaction.notes}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        
        {/* Informações Relacionadas */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">
                  Informações da Empresa
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Empresa" 
                    secondary={transaction.company} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Registrado por" 
                    secondary={transaction.createdBy} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          {(transaction.project || transaction.client) && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h6">
                    Projeto e Cliente
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <List dense>
                  {transaction.project && (
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Projeto" 
                        secondary={
                          <RouterLink to={`/dashboard/projects/${transaction.projectId}`} style={{ textDecoration: 'none' }}>
                            {transaction.project}
                          </RouterLink>
                        } 
                      />
                    </ListItem>
                  )}
                  
                  {transaction.client && (
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Cliente" 
                        secondary={
                          <RouterLink to={`/dashboard/clients/${transaction.clientId}`} style={{ textDecoration: 'none' }}>
                            {transaction.client}
                          </RouterLink>
                        } 
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          )}
          
          {transaction.attachments && transaction.attachments.length > 0 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="h6">
                    Anexos
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <List dense>
                  {transaction.attachments.map((attachment) => (
                    <ListItem key={attachment.id}>
                      <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={attachment.name} 
                        secondary={`${attachment.type} • ${attachment.size} • ${formatDate(attachment.uploadDate)}`} 
                      />
                      <Button size="small" color="primary">
                        Visualizar
                      </Button>
                      <Button size="small" color="primary">
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esta transação? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
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

export default FinanceDetails;
