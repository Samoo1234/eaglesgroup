import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
  useTheme,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  AttachMoney as MoneyIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { logout, setCurrentCompany } from '../features/auth/authSlice';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  // Obter estado de autenticação do Redux
  const { isAuthenticated, user, currentCompany } = useSelector((state) => state.auth);
  
  // Lista de empresas disponíveis
  const companies = [
    { id: 1, name: 'Eagles Construction LLC', type: 'construction' },
    { id: 2, name: 'Brazilian Concrete LLC', type: 'concrete' },
    { id: 3, name: 'Eagles Cleaning LLC', type: 'cleaning' }
  ];
  
  // Função para mudar de empresa
  const handleCompanyChange = (event) => {
    const companyId = event.target.value;
    const selectedCompany = companies.find(company => company.id === Number(companyId));
    
    if (selectedCompany) {
      dispatch(setCurrentCompany(selectedCompany));
    }
  };
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleProfileMenuOpen = (event) => {
    setOpen(true);
  };
  
  const handleProfileMenuClose = () => {
    setOpen(false);
  };
  
  const handleNotificationsOpen = (event) => {
    setOpen(true);
  };
  
  const handleNotificationsClose = () => {
    setOpen(false);
  };
  
  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate('/login');
  };
  
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Clientes',
      icon: <PeopleIcon />,
      path: '/dashboard/clients'
    },
    {
      text: 'Projetos',
      icon: <BusinessIcon />,
      path: '/dashboard/projects'
    },
    {
      text: 'Materiais',
      icon: <InventoryIcon />,
      path: '/dashboard/materials'
    },
    {
      text: 'Financeiro',
      icon: <MoneyIcon />,
      path: '/dashboard/finance'
    },
    {
      text: 'Equipe',
      icon: <GroupIcon />,
      path: '/dashboard/personnel'
    },
    {
      text: 'Agendamentos',
      icon: <EventIcon />,
      path: '/dashboard/schedules'
    }
  ];
  
  // Função para navegar para uma rota específica
  const handleNavigation = (path) => {
    navigate(path);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
          {currentCompany?.name || 'Eagles Construction LLC'}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sistema de Gerenciamento
          </Typography>
          
          {/* Company Selector */}
          <FormControl 
            variant="outlined" 
            size="small" 
            sx={{ 
              minWidth: 200, 
              mr: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                }
              },
              '& .MuiSelect-icon': {
                color: 'white'
              }
            }}
          >
            <Select
              value={currentCompany?.id || ''}
              onChange={handleCompanyChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Selecionar Empresa' }}
            >
              {companies.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Notifications */}
          <IconButton
            color="inherit"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { width: 320, maxHeight: 450, mt: 1 }
            }}
          >
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1">Novo cliente cadastrado</Typography>
                <Typography variant="body2" color="text.secondary">Há 5 minutos</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1">Projeto atualizado</Typography>
                <Typography variant="body2" color="text.secondary">Há 30 minutos</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1">Estoque baixo de material</Typography>
                <Typography variant="body2" color="text.secondary">Há 2 horas</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1">Pagamento recebido</Typography>
                <Typography variant="body2" color="text.secondary">Há 1 dia</Typography>
              </Box>
            </MenuItem>
          </Menu>
          
          {/* User Profile */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar
              alt={user?.name || 'User'}
              src={user?.avatar || ''}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
          <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Meu Perfil
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/settings'); }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Drawer - Mobile and Desktop */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar /> {/* This creates space at the top for the AppBar */}
        {children} {/* Renderiza o componente filho passado como prop */}
      </Box>
    </Box>
  );
};

export default MainLayout;
