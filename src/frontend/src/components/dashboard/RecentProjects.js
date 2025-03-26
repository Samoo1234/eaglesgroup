import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinearProgress from '@mui/material/LinearProgress';

// Dados de exemplo - em produção, estes dados viriam da API
const recentProjects = [
  { id: 1, name: 'Edifício Comercial Downtown', client: 'TechCorp Inc.', status: 'Em Andamento', completion: 65 },
  { id: 2, name: 'Complexo Residencial de Luxo', client: 'Coastal Living Developers', status: 'Planejamento', completion: 15 },
  { id: 3, name: 'Reconstrução de Ponte', client: 'Departamento de Transportes', status: 'Em Andamento', completion: 42 },
  { id: 4, name: 'Shopping Center Moderno', client: 'Retail Development Group', status: 'Concluído', completion: 100 },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Em Andamento':
      return 'primary';
    case 'Planejamento':
      return 'info';
    case 'Concluído':
      return 'success';
    case 'Atrasado':
      return 'error';
    default:
      return 'default';
  }
};

const RecentProjects = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Projetos Recentes
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ maxHeight: 160, overflow: 'auto' }}>
        {recentProjects.map((project) => (
          <ListItem key={project.id} sx={{ px: 0, py: 1 }}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.status} 
                    size="small" 
                    color={getStatusColor(project.status)}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Cliente: {project.client}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.completion} 
                      sx={{ flexGrow: 1, mr: 1, height: 8, borderRadius: 4 }} 
                    />
                    <Typography variant="caption" color="text.secondary">
                      {project.completion}%
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecentProjects;
