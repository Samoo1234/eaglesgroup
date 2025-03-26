import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={3}
          sx={{ 
            p: 5, 
            borderRadius: 2,
            backgroundColor: 'background.paper',
            maxWidth: 600
          }}
        >
          <Typography variant="h1" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
            404
          </Typography>
          
          <Typography variant="h4" sx={{ mb: 3 }}>
            Página não encontrada
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            A página que você está procurando não existe ou foi movida.
            Por favor, verifique o URL ou retorne à página inicial.
          </Typography>
          
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            size="large"
          >
            Voltar para a Página Inicial
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;
