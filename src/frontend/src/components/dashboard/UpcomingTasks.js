import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';

// Dados de exemplo - em produção, estes dados viriam da API
const upcomingTasks = [
  { id: 1, title: 'Inspeção do Local - Edifício Downtown', date: '2025-03-27', priority: 'Alta' },
  { id: 2, title: 'Reunião com Cliente - Coastal Living', date: '2025-03-28', priority: 'Média' },
  { id: 3, title: 'Entrega de Material - Projeto da Ponte', date: '2025-03-30', priority: 'Alta' },
  { id: 4, title: 'Submissão de Licença - Shopping Center', date: '2025-04-02', priority: 'Média' },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Alta':
      return 'error';
    case 'Média':
      return 'warning';
    case 'Baixa':
      return 'success';
    default:
      return 'default';
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const UpcomingTasks = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Tarefas Próximas
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ maxHeight: 160, overflow: 'auto' }}>
        {upcomingTasks.map((task) => (
          <ListItem key={task.id} sx={{ px: 0, py: 1 }}>
            <ListItemIcon>
              <CalendarTodayIcon color={getPriorityColor(task.priority)} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {task.title}
                  </Typography>
                  <Chip 
                    label={task.priority} 
                    size="small" 
                    color={getPriorityColor(task.priority)}
                    icon={<FlagIcon />}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Data: {formatDate(task.date)}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UpcomingTasks;
