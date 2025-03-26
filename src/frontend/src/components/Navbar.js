import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar, 
  Divider, 
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CompanySelector from './CompanySelector';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obter estado de autenticação do Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Serviços', path: '/services' },
    { name: 'Consultorias', path: '/consultations' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contato', path: '/contact' }
  ];

  const dashboardButton = isAuthenticated && (
    <Button
      component={Link}
      to="/dashboard"
      variant="contained"
      color="warning"
      sx={{ 
        ml: 2,
        display: 'flex', 
        alignItems: 'center',
        fontWeight: 'bold',
        '&:hover': { bgcolor: '#e6a700' },
        borderRadius: '4px',
        px: 2,
        py: 0.5
      }}
      startIcon={<DashboardIcon />}
    >
      Dashboard
    </Button>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Eagles Group LLC
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemText>
              <Button 
                component={Link} 
                to={item.path} 
                color="inherit" 
                fullWidth
              >
                {item.name}
              </Button>
            </ListItemText>
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemText>
              <Button 
                component={Link} 
                to="/dashboard" 
                color="inherit" 
                fullWidth
                startIcon={<DashboardIcon />}
                sx={{ 
                  bgcolor: '#ffc107',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#e6a700' },
                  my: 1
                }}
              >
                Dashboard
              </Button>
            </ListItemText>
          </ListItem>
        )}
        {!isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemText>
                <Button 
                  component={Link} 
                  to="/login" 
                  color="inherit" 
                  fullWidth
                >
                  Login
                </Button>
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText>
                <Button 
                  component={Link} 
                  to="/register" 
                  color="inherit" 
                  fullWidth
                >
                  Cadastro
                </Button>
              </ListItemText>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemText>
              <Button 
                component={Link} 
                to="/dashboard" 
                color="inherit" 
                fullWidth
              >
                Dashboard
              </Button>
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 0, textDecoration: 'none', color: 'inherit', mr: 2 }}>
            Eagles Group LLC
          </Typography>
          
          {isAuthenticated && <CompanySelector />}
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button 
                key={item.name} 
                component={Link} 
                to={item.path} 
                color="inherit"
                sx={{ mx: 1 }}
              >
                {item.name}
              </Button>
            ))}
            {dashboardButton}
          </Box>
          
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  {user?.profileImage ? (
                    <Avatar 
                      src={user.profileImage} 
                      alt={`${user.firstName} ${user.lastName}`} 
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Meu Perfil
                  </MenuItem>
                  <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Configurações
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    Sair
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  Cadastro
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
