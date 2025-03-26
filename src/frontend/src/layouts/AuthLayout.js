import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Link,
  Grid,
} from '@mui/material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link component={RouterLink} to="/" underline="none">
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Eagles Group LLC
          </Typography>
        </Link>
        <Box>
          <Link component={RouterLink} to="/" underline="none" sx={{ mr: 3 }}>
            Home
          </Link>
          <Link component={RouterLink} to="/services" underline="none" sx={{ mr: 3 }}>
            Services
          </Link>
          <Link component={RouterLink} to="/book-consultation" underline="none">
            Book Consultation
          </Link>
        </Box>
      </Box>

      {/* Main Content */}
      <Container component="main" maxWidth="sm" sx={{ my: 4, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
          }}
        >
          <Outlet />
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Eagles Group LLC
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Professional Construction Services
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Construction Ave, Building City, CA 90210
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: (555) 123-4567
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: { sm: 'flex-end' } }}>
              <Box>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Quick Links
                </Typography>
                <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
                  Home
                </Link>
                <Link component={RouterLink} to="/services" color="inherit" display="block" sx={{ mb: 1 }}>
                  Services
                </Link>
                <Link component={RouterLink} to="/book-consultation" color="inherit" display="block" sx={{ mb: 1 }}>
                  Book Consultation
                </Link>
                <Link component={RouterLink} to="/auth/login" color="inherit" display="block">
                  Login
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" component={RouterLink} to="/">
                Eagles Group LLC
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AuthLayout;
