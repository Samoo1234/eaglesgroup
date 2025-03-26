import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Menu, 
  MenuItem, 
  Typography, 
  Avatar, 
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentCompany } from '../redux/slices/authSlice';
import BusinessIcon from '@mui/icons-material/Business';
import ConstructionIcon from '@mui/icons-material/Construction';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CompanySelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user, currentCompany } = useSelector((state) => state.auth);
  
  // Get companies from user object
  const companies = user?.companies || [];
  
  // Set default company if not already set
  useEffect(() => {
    if (companies.length > 0 && !currentCompany) {
      dispatch(setCurrentCompany(companies[0]));
    }
  }, [companies, currentCompany, dispatch]);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCompanySelect = (company) => {
    dispatch(setCurrentCompany(company));
    handleClose();
  };
  
  // Get icon based on company type
  const getCompanyIcon = (type) => {
    switch (type) {
      case 'construction':
        return <ConstructionIcon />;
      case 'concrete':
        return <BusinessIcon />;
      case 'cleaning':
        return <CleaningServicesIcon />;
      default:
        return <BusinessIcon />;
    }
  };
  
  // If no companies or user, don't render
  if (!companies.length || !user) {
    return null;
  }
  
  // If only one company, show it without dropdown
  if (companies.length === 1) {
    const company = companies[0];
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        {company.logo ? (
          <Avatar 
            src={company.logo} 
            alt={company.name} 
            sx={{ width: 32, height: 32, mr: 1 }}
          />
        ) : (
          <ListItemIcon sx={{ minWidth: 40 }}>
            {getCompanyIcon(company.type)}
          </ListItemIcon>
        )}
        <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
          {company.name}
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      <Button
        id="company-selector-button"
        aria-controls={open ? 'company-selector-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ 
          textTransform: 'none', 
          color: 'inherit',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {currentCompany && (
          <>
            {currentCompany.logo ? (
              <Avatar 
                src={currentCompany.logo} 
                alt={currentCompany.name} 
                sx={{ width: 32, height: 32, mr: 1 }}
              />
            ) : (
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                {getCompanyIcon(currentCompany.type)}
              </ListItemIcon>
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {currentCompany.name}
            </Typography>
          </>
        )}
      </Button>
      <Menu
        id="company-selector-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'company-selector-button',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 250,
            maxHeight: 300,
            overflow: 'auto',
            mt: 1
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
          Suas Empresas
        </Typography>
        <Divider />
        {companies.map((company) => (
          <MenuItem 
            key={company.companyId} 
            onClick={() => handleCompanySelect(company)}
            selected={currentCompany?.companyId === company.companyId}
            sx={{ py: 1.5 }}
          >
            {company.logo ? (
              <Avatar 
                src={company.logo} 
                alt={company.name} 
                sx={{ width: 32, height: 32, mr: 2 }}
              />
            ) : (
              <ListItemIcon>
                {getCompanyIcon(company.type)}
              </ListItemIcon>
            )}
            <ListItemText 
              primary={company.name} 
              secondary={`Função: ${company.role === 'admin' ? 'Administrador' : 
                company.role === 'manager' ? 'Gerente' : 
                company.role === 'employee' ? 'Funcionário' : 'Cliente'}`}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CompanySelector;
