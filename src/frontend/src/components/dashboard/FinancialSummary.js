import React from 'react';
import { Box, Typography, Divider, Grid, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Dados de exemplo - em produção, estes dados viriam da API
const financialData = {
  totalRevenue: 1250000,
  pendingPayments: 320000,
  expenses: 680000,
  profit: 250000,
  monthlyComparison: {
    revenue: 15, // porcentagem de aumento em relação ao mês anterior
    expenses: -5, // porcentagem de diminuição em relação ao mês anterior
    profit: 22 // porcentagem de aumento em relação ao mês anterior
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const FinancialSummary = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resumo Financeiro
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Receita Total
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(financialData.totalRevenue)}
              </Typography>
              {financialData.monthlyComparison.revenue > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingUpIcon fontSize="small" color="success" />
                  <Typography variant="caption" color="success.main">
                    {financialData.monthlyComparison.revenue}%
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingDownIcon fontSize="small" color="error" />
                  <Typography variant="caption" color="error.main">
                    {Math.abs(financialData.monthlyComparison.revenue)}%
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Pagamentos Pendentes
            </Typography>
            <Typography variant="h6" color="warning.main" sx={{ mt: 1, fontWeight: 'bold' }}>
              {formatCurrency(financialData.pendingPayments)}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Despesas
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="h6" color="error.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(financialData.expenses)}
              </Typography>
              {financialData.monthlyComparison.expenses < 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingDownIcon fontSize="small" color="success" />
                  <Typography variant="caption" color="success.main">
                    {Math.abs(financialData.monthlyComparison.expenses)}%
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingUpIcon fontSize="small" color="error" />
                  <Typography variant="caption" color="error.main">
                    {financialData.monthlyComparison.expenses}%
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Lucro
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(financialData.profit)}
              </Typography>
              {financialData.monthlyComparison.profit > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingUpIcon fontSize="small" color="success" />
                  <Typography variant="caption" color="success.main">
                    {financialData.monthlyComparison.profit}%
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <TrendingDownIcon fontSize="small" color="error" />
                  <Typography variant="caption" color="error.main">
                    {Math.abs(financialData.monthlyComparison.profit)}%
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="caption" color="text.secondary">
          Última atualização: Hoje às 10:00
        </Typography>
      </Box>
    </Box>
  );
};

export default FinancialSummary;
