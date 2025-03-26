import React, { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  InputAdornment,
  Tabs,
  Tab,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  AttachMoney as AttachMoneyIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

// Sample data for materials
const materialCategories = [
  'Concrete',
  'Steel',
  'Lumber',
  'Masonry',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Finishes',
  'Insulation',
  'Roofing',
  'Windows & Doors',
  'Flooring',
  'Hardware',
  'Tools',
  'Safety Equipment',
];

const suppliers = [
  'American Building Supply',
  'Construction Materials Inc.',
  'National Steel Corporation',
  'Quality Lumber Co.',
  'Electrical Systems Ltd.',
  'Plumbing Wholesale Depot',
  'HVAC Solutions',
  'Roofing Specialists',
  'Window & Door Experts',
  'Flooring Distributors',
  'Hardware Supply Co.',
  'Safety First Equipment',
];

const units = [
  'Cubic Yards',
  'Tons',
  'Pounds',
  'Kilograms',
  'Linear Feet',
  'Square Feet',
  'Pieces',
  'Bundles',
  'Pallets',
  'Boxes',
  'Rolls',
  'Gallons',
  'Liters',
  'Each',
];

// Sample material data
const generateMaterials = () => {
  const materials = [];
  for (let i = 1; i <= 50; i++) {
    const categoryIndex = Math.floor(Math.random() * materialCategories.length);
    const supplierIndex = Math.floor(Math.random() * suppliers.length);
    const unitIndex = Math.floor(Math.random() * units.length);
    const quantity = Math.floor(Math.random() * 1000) + 1;
    const unitPrice = (Math.random() * 1000 + 10).toFixed(2);
    const reorderLevel = Math.floor(Math.random() * 100) + 10;
    
    materials.push({
      id: i,
      code: `MAT-${1000 + i}`,
      name: `${materialCategories[categoryIndex]} Material ${i}`,
      description: `High-quality ${materialCategories[categoryIndex].toLowerCase()} material for construction projects.`,
      category: materialCategories[categoryIndex],
      supplier: suppliers[supplierIndex],
      unit: units[unitIndex],
      quantity: quantity,
      unitPrice: parseFloat(unitPrice),
      totalValue: (quantity * parseFloat(unitPrice)).toFixed(2),
      reorderLevel: reorderLevel,
      location: `Warehouse ${Math.floor(Math.random() * 3) + 1}, Section ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}, Shelf ${Math.floor(Math.random() * 20) + 1}`,
      lastOrderDate: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      status: quantity < reorderLevel ? 'Low Stock' : quantity === 0 ? 'Out of Stock' : 'In Stock',
      projects: Math.random() > 0.5 ? ['Downtown Office Building', 'Highway Bridge Reconstruction'] : ['Luxury Residential Complex'],
    });
  }
  return materials;
};

const materials = generateMaterials();

// Sample purchase orders
const purchaseOrders = [
  {
    id: 'PO-2025-001',
    supplier: 'American Building Supply',
    date: '2025-03-15',
    status: 'Delivered',
    items: 8,
    total: 12500.00,
  },
  {
    id: 'PO-2025-002',
    supplier: 'National Steel Corporation',
    date: '2025-03-18',
    status: 'In Transit',
    items: 5,
    total: 28750.00,
  },
  {
    id: 'PO-2025-003',
    supplier: 'Quality Lumber Co.',
    date: '2025-03-20',
    status: 'Processing',
    items: 12,
    total: 9800.00,
  },
  {
    id: 'PO-2025-004',
    supplier: 'Electrical Systems Ltd.',
    date: '2025-03-22',
    status: 'Pending Approval',
    items: 15,
    total: 6250.00,
  },
  {
    id: 'PO-2025-005',
    supplier: 'Plumbing Wholesale Depot',
    date: '2025-03-25',
    status: 'Draft',
    items: 7,
    total: 4320.00,
  },
];

const MaterialsManagement = () => {
  const theme = useTheme();
  
  // State for material inventory
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };
  
  // Handle category filter
  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };
  
  // Handle status filter
  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };
  
  // Handle dialog open for add/edit
  const handleOpenDialog = (material = null) => {
    setCurrentMaterial(material);
    setOpenDialog(true);
  };
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentMaterial(null);
  };
  
  // Filter materials based on search and filters
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? material.category === categoryFilter : true;
    const matchesStatus = statusFilter ? material.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Calculate displayed rows based on pagination
  const displayedMaterials = filteredMaterials.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // Get purchase order status color
  const getPOStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'In Transit':
        return 'info';
      case 'Processing':
        return 'primary';
      case 'Pending Approval':
        return 'warning';
      case 'Draft':
        return 'default';
      default:
        return 'default';
    }
  };
  
  // Render material inventory tab
  const renderInventoryTab = () => (
    <>
      {/* Filters and Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              placeholder="Search materials..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={handleCategoryFilter}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {materialCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusFilter}
                label="Status"
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Material
            </Button>
            <IconButton color="primary" aria-label="filter">
              <FilterListIcon />
            </IconButton>
            <IconButton color="primary" aria-label="refresh">
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Low Stock Alert */}
      {filteredMaterials.some(m => m.status === 'Low Stock' || m.status === 'Out of Stock') && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          icon={<WarningIcon />}
          action={
            <Button color="inherit" size="small">
              View All
            </Button>
          }
        >
          {filteredMaterials.filter(m => m.status === 'Low Stock' || m.status === 'Out of Stock').length} materials are low in stock or out of stock. Consider placing new orders.
        </Alert>
      )}
      
      {/* Materials Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
          <Table stickyHeader aria-label="materials table">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedMaterials.map((material) => (
                <TableRow hover key={material.id}>
                  <TableCell>{material.code}</TableCell>
                  <TableCell>
                    <Box sx={{ fontWeight: 'medium' }}>{material.name}</Box>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                      {material.description}
                    </Typography>
                  </TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>{material.unit}</TableCell>
                  <TableCell>${material.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>${material.totalValue}</TableCell>
                  <TableCell>
                    <Chip 
                      label={material.status} 
                      color={getStatusColor(material.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpenDialog(material)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredMaterials.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
  
  // Render purchase orders tab
  const renderPurchaseOrdersTab = () => (
    <>
      {/* Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          placeholder="Search purchase orders..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            New Purchase Order
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
          >
            Print
          </Button>
        </Box>
      </Box>
      
      {/* Purchase Orders Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table aria-label="purchase orders table">
            <TableHead>
              <TableRow>
                <TableCell>PO Number</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={getPOStatusColor(order.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton size="small">
                        <AssignmentIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
  
  // Render dashboard
  const renderDashboard = () => (
    <Grid container spacing={3}>
      {/* Stats Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                Total Materials
              </Typography>
              <InventoryIcon color="primary" />
            </Box>
            <Typography variant="h4">{materials.length}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Across {materialCategories.length} categories
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                Inventory Value
              </Typography>
              <AttachMoneyIcon color="primary" />
            </Box>
            <Typography variant="h4">
              ${materials.reduce((sum, material) => sum + parseFloat(material.totalValue), 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Total value of all materials
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                Low Stock Items
              </Typography>
              <WarningIcon color="warning" />
            </Box>
            <Typography variant="h4">
              {materials.filter(m => m.status === 'Low Stock').length}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Materials below reorder level
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                Pending Orders
              </Typography>
              <LocalShippingIcon color="info" />
            </Box>
            <Typography variant="h4">
              {purchaseOrders.filter(po => ['Processing', 'In Transit', 'Pending Approval'].includes(po.status)).length}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Orders awaiting delivery
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      {/* Category Distribution */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Material Categories
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {materialCategories.slice(0, 8).map((category) => {
              const count = materials.filter(m => m.category === category).length;
              const percentage = (count / materials.length) * 100;
              return (
                <Box key={category} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ width: 120 }} noWrap>
                    {category}
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 10,
                      bgcolor: 'background.paper',
                      borderRadius: 5,
                      mr: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${percentage}%`,
                        height: '100%',
                        bgcolor: theme.palette.primary.main,
                        borderRadius: 5,
                      }}
                    />
                  </Box>
                  <Typography variant="body2">
                    {count} ({percentage.toFixed(1)}%)
                  </Typography>
                </Box>
              );
            })}
            {materialCategories.length > 8 && (
              <Typography variant="body2" color="text.secondary" align="center">
                and {materialCategories.length - 8} more categories
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
      
      {/* Recent Purchase Orders */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Recent Purchase Orders
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 300, overflow: 'auto' }}>
            {purchaseOrders.map((order) => (
              <Box key={order.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2">{order.id}</Typography>
                  <Chip 
                    label={order.status} 
                    color={getPOStatusColor(order.status)} 
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {order.supplier} • {order.date}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">
                    {order.items} items
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ${order.total.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Materials Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your construction materials inventory, track stock levels, and handle purchase orders.
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="materials management tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<DashboardIcon />} label="Dashboard" />
          <Tab icon={<InventoryIcon />} label="Inventory" />
          <Tab icon={<ShoppingCartIcon />} label="Purchase Orders" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && renderDashboard()}
      {tabValue === 1 && renderInventoryTab()}
      {tabValue === 2 && renderPurchaseOrdersTab()}
      
      {/* Add/Edit Material Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentMaterial ? 'Edit Material' : 'Add New Material'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ mb: 3 }}>
            {currentMaterial 
              ? 'Update the material information below.' 
              : 'Fill in the material details to add it to your inventory.'}
          </DialogContentText>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Material Code"
                defaultValue={currentMaterial?.code || ''}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Material Name"
                defaultValue={currentMaterial?.name || ''}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                defaultValue={currentMaterial?.description || ''}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  defaultValue={currentMaterial?.category || ''}
                  label="Category"
                >
                  {materialCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Supplier</InputLabel>
                <Select
                  defaultValue={currentMaterial?.supplier || ''}
                  label="Supplier"
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      {supplier}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                defaultValue={currentMaterial?.quantity || ''}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Unit</InputLabel>
                <Select
                  defaultValue={currentMaterial?.unit || ''}
                  label="Unit"
                >
                  {units.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Unit Price ($)"
                type="number"
                defaultValue={currentMaterial?.unitPrice || ''}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reorder Level"
                type="number"
                defaultValue={currentMaterial?.reorderLevel || ''}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                defaultValue={currentMaterial?.location || ''}
                margin="normal"
                placeholder="Warehouse, Section, Shelf"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary">
            {currentMaterial ? 'Update Material' : 'Add Material'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MaterialsManagement;
