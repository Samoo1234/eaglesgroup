import React, { useEffect, createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

// Páginas
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import ClientList from './pages/dashboard/ClientList';
import ClientDetails from './pages/dashboard/ClientDetails';
import ClientAdd from './pages/dashboard/ClientAdd';
import ClientEdit from './pages/dashboard/ClientEdit';
import ProjectList from './pages/dashboard/ProjectList';
import ProjectDetails from './pages/dashboard/ProjectDetails';
import ProjectAdd from './pages/dashboard/ProjectAdd';
import ProjectEdit from './pages/dashboard/ProjectEdit';
import MaterialList from './pages/dashboard/MaterialList';
import MaterialDetails from './pages/dashboard/MaterialDetails';
import MaterialAdd from './pages/dashboard/MaterialAdd';
import MaterialEdit from './pages/dashboard/MaterialEdit';
import MaterialMovement from './pages/dashboard/MaterialMovement';
import MaterialsManagement from './pages/dashboard/MaterialsManagement';
import FinanceManagement from './pages/dashboard/FinanceManagement';
import PersonnelManagement from './pages/dashboard/PersonnelManagement';
import NotFound from './pages/NotFound';

// Layouts
import MainLayout from './layouts/MainLayout';

// Criar contexto para a empresa atual
export const CompanyContext = createContext();

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Se não estiver autenticado, redirecionar para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  
  // Lista de empresas disponíveis
  const companies = [
    { id: 1, name: 'Eagles Group LLC', type: 'construction' },
    { id: 2, name: 'Brazilian Concrete LLC', type: 'concrete' },
    { id: 3, name: 'Eagles Cleaning LLC', type: 'cleaning' }
  ];
  
  // Estado para a empresa selecionada
  const [currentCompany, setCurrentCompany] = useState(
    JSON.parse(localStorage.getItem('currentCompany')) || companies[0]
  );
  
  // Função para mudar de empresa
  const handleCompanyChange = (companyId) => {
    const selectedCompany = companies.find(company => company.id === Number(companyId));
    if (selectedCompany) {
      setCurrentCompany(selectedCompany);
      localStorage.setItem('currentCompany', JSON.stringify(selectedCompany));
    }
  };

  return (
    <Router>
      <CompanyContext.Provider value={{ currentCompany, setCurrentCompany: handleCompanyChange, companies }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/clients" element={
              <ProtectedRoute>
                <MainLayout>
                  <ClientList />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/clients/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ClientDetails />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/clients/add" element={
              <ProtectedRoute>
                <MainLayout>
                  <ClientAdd />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/clients/edit/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ClientEdit />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/projects" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProjectList />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/projects/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProjectDetails />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/projects/add" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProjectAdd />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/projects/edit/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <ProjectEdit />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/materials" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialList />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/materials/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialDetails />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/materials/add" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialAdd />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/materials/edit/:id" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialEdit />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/materials/movement" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialMovement />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/inventory" element={
              <ProtectedRoute>
                <MainLayout>
                  <MaterialsManagement inventoryMode={true} />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/finance" element={
              <ProtectedRoute>
                <MainLayout>
                  <FinanceManagement />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/personnel" element={
              <ProtectedRoute>
                <MainLayout>
                  <PersonnelManagement />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/reports" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Relatórios e Análises</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/production" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Produção de Concreto</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/schedules" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Agendamentos de Limpeza</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard/supplies" element={
              <ProtectedRoute>
                <MainLayout>
                  <div>Suprimentos de Limpeza</div>
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/logout" element={<Navigate to="/" replace />} />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </CompanyContext.Provider>
    </Router>
  );
}

export default App;
