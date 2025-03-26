import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Divider,
  Chip,
  Rating,
  useTheme,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowForward as ArrowForwardIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Engineering as EngineeringIcon,
  Architecture as ArchitectureIcon,
  Apartment as ApartmentIcon,
  Factory as FactoryIcon,
  Landscape as LandscapeIcon,
  Construction as ConstructionIcon,
} from '@mui/icons-material';

const ServiceCatalog = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample completed projects data
  const projects = [
    {
      id: 1,
      title: 'Downtown Office Building',
      description: 'A 15-story modern office building with sustainable design features and LEED certification.',
      image: '/images/projects/office-building.jpg',
      category: 'Commercial',
      location: 'San Francisco, CA',
      completionDate: 'June 2024',
      client: 'TechCorp Inc.',
      value: '$45M',
      rating: 5,
      tags: ['office', 'high-rise', 'sustainable', 'urban'],
      featured: true
    },
    {
      id: 2,
      title: 'Luxury Residential Complex',
      description: 'High-end residential complex with 45 units, featuring premium amenities and smart home technology.',
      image: '/images/projects/residential-complex.jpg',
      category: 'Residential',
      location: 'Miami, FL',
      completionDate: 'March 2024',
      client: 'Coastal Living Developers',
      value: '$38M',
      rating: 4.8,
      tags: ['residential', 'luxury', 'smart-home', 'complex'],
      featured: true
    },
    {
      id: 3,
      title: 'Highway Bridge Reconstruction',
      description: 'Major infrastructure project involving the complete reconstruction of a 6-lane highway bridge.',
      image: '/images/projects/bridge.jpg',
      category: 'Infrastructure',
      location: 'Chicago, IL',
      completionDate: 'November 2023',
      client: 'Illinois DOT',
      value: '$62M',
      rating: 4.9,
      tags: ['bridge', 'highway', 'public', 'infrastructure'],
      featured: true
    },
    {
      id: 4,
      title: 'Modern Shopping Mall',
      description: 'Contemporary shopping center with 120 retail spaces, food court, and entertainment facilities.',
      image: '/images/projects/shopping-mall.jpg',
      category: 'Commercial',
      location: 'Dallas, TX',
      completionDate: 'October 2023',
      client: 'Retail Development Group',
      value: '$58M',
      rating: 4.7,
      tags: ['retail', 'mall', 'commercial', 'entertainment']
    },
    {
      id: 5,
      title: 'Suburban Housing Development',
      description: 'Development of 85 single-family homes in a planned community with parks and community center.',
      image: '/images/projects/housing-development.jpg',
      category: 'Residential',
      location: 'Denver, CO',
      completionDate: 'August 2023',
      client: 'Mountain View Homes',
      value: '$32M',
      rating: 4.6,
      tags: ['residential', 'single-family', 'community', 'suburban']
    },
    {
      id: 6,
      title: 'Water Treatment Facility',
      description: 'State-of-the-art water treatment plant serving a community of 250,000 residents.',
      image: '/images/projects/water-treatment.jpg',
      category: 'Infrastructure',
      location: 'Portland, OR',
      completionDate: 'July 2023',
      client: 'Portland Water District',
      value: '$48M',
      rating: 4.9,
      tags: ['water', 'utility', 'public', 'infrastructure']
    },
    {
      id: 7,
      title: 'Historic Building Renovation',
      description: 'Careful restoration of a 120-year-old historic building, preserving architectural details while modernizing systems.',
      image: '/images/projects/historic-renovation.jpg',
      category: 'Renovation',
      location: 'Boston, MA',
      completionDate: 'June 2023',
      client: 'Heritage Preservation Trust',
      value: '$18M',
      rating: 5,
      tags: ['historic', 'renovation', 'preservation', 'urban']
    },
    {
      id: 8,
      title: 'Corporate Headquarters',
      description: 'New headquarters for a Fortune 500 company featuring open workspace design and cutting-edge technology.',
      image: '/images/projects/corporate-hq.jpg',
      category: 'Commercial',
      location: 'Seattle, WA',
      completionDate: 'May 2023',
      client: 'Northwest Technologies',
      value: '$75M',
      rating: 4.8,
      tags: ['office', 'corporate', 'headquarters', 'technology']
    },
    {
      id: 9,
      title: 'Luxury Condominium Tower',
      description: '35-story luxury condominium with panoramic views, featuring high-end finishes and amenities.',
      image: '/images/projects/condo-tower.jpg',
      category: 'Residential',
      location: 'New York, NY',
      completionDate: 'April 2023',
      client: 'Metropolitan Living LLC',
      value: '$120M',
      rating: 4.7,
      tags: ['residential', 'luxury', 'high-rise', 'urban']
    },
    {
      id: 10,
      title: 'Solar Farm Installation',
      description: 'Large-scale solar farm capable of generating 50MW of clean energy for the local grid.',
      image: '/images/projects/solar-farm.jpg',
      category: 'Industrial',
      location: 'Phoenix, AZ',
      completionDate: 'March 2023',
      client: 'Southwest Energy Partners',
      value: '$42M',
      rating: 4.9,
      tags: ['solar', 'energy', 'sustainable', 'industrial']
    },
    {
      id: 11,
      title: 'City Park Redevelopment',
      description: 'Complete redevelopment of a 25-acre urban park with recreational facilities, landscaping, and public art.',
      image: '/images/projects/city-park.jpg',
      category: 'Landscape',
      location: 'Atlanta, GA',
      completionDate: 'February 2023',
      client: 'Atlanta Parks Department',
      value: '$15M',
      rating: 4.8,
      tags: ['park', 'public', 'landscape', 'recreation']
    },
    {
      id: 12,
      title: 'Hospital Expansion Wing',
      description: 'New 120,000 sq ft wing for an existing hospital, featuring state-of-the-art medical facilities.',
      image: '/images/projects/hospital.jpg',
      category: 'Institutional',
      location: 'Minneapolis, MN',
      completionDate: 'January 2023',
      client: 'Midwest Healthcare System',
      value: '$88M',
      rating: 4.9,
      tags: ['healthcare', 'medical', 'institutional', 'expansion']
    }
  ];

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter projects based on tab selection and search query
  const getFilteredProjects = () => {
    let filtered = [...projects];
    
    // Filter by category based on tab
    if (tabValue === 1) {
      filtered = filtered.filter(project => project.category === 'Commercial');
    } else if (tabValue === 2) {
      filtered = filtered.filter(project => project.category === 'Residential');
    } else if (tabValue === 3) {
      filtered = filtered.filter(project => project.category === 'Infrastructure');
    } else if (tabValue === 4) {
      filtered = filtered.filter(project => project.category === 'Renovation');
    } else if (tabValue === 5) {
      filtered = filtered.filter(project => 
        !['Commercial', 'Residential', 'Infrastructure', 'Renovation'].includes(project.category)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Commercial':
        return <BusinessIcon />;
      case 'Residential':
        return <HomeIcon />;
      case 'Infrastructure':
        return <EngineeringIcon />;
      case 'Renovation':
        return <ArchitectureIcon />;
      case 'Industrial':
        return <FactoryIcon />;
      case 'Landscape':
        return <LandscapeIcon />;
      default:
        return <ConstructionIcon />;
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/services-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Our Completed Projects
          </Typography>
          <Typography variant="h5" paragraph sx={{ mb: 4, maxWidth: '800px' }}>
            Explore our portfolio of successful construction projects across various sectors
          </Typography>
        </Container>
      </Box>

      {/* Filter and Search */}
      <Container maxWidth="lg" sx={{ mt: -4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search projects by name, location, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<FilterListIcon />}
                size="large"
                sx={{ height: '56px' }}
              >
                Advanced Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Category Tabs */}
      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="project categories"
          >
            <Tab label="All Projects" />
            <Tab label="Commercial" icon={<BusinessIcon />} iconPosition="start" />
            <Tab label="Residential" icon={<HomeIcon />} iconPosition="start" />
            <Tab label="Infrastructure" icon={<EngineeringIcon />} iconPosition="start" />
            <Tab label="Renovation" icon={<ArchitectureIcon />} iconPosition="start" />
            <Tab label="Other Categories" icon={<ConstructionIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <Grid container spacing={4}>
            {filteredProjects.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                    ...(project.featured && {
                      border: `2px solid ${theme.palette.secondary.main}`,
                    }),
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%', // 16:9 aspect ratio
                      position: 'relative',
                    }}
                    image={project.image || `https://source.unsplash.com/random?construction,${project.category}`}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </Box>
                    {project.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        Featured
                      </Box>
                    )}
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {project.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={project.rating} readOnly precision={0.1} size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {project.rating.toFixed(1)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Location:</strong>
                        </Typography>
                        <Typography variant="body2">
                          {project.location}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Completed:</strong>
                        </Typography>
                        <Typography variant="body2">
                          {project.completionDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Client:</strong>
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {project.client}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Value:</strong>
                        </Typography>
                        <Typography variant="body2">
                          {project.value}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={RouterLink}
                      to={`/services/projects/${project.id}`}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No projects found matching your criteria
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filters to see more results
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setTabValue(0);
                setSearchQuery('');
              }}
              sx={{ mt: 2 }}
            >
              Reset Filters
            </Button>
          </Box>
        )}
      </Container>

      {/* Services Overview */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Our Construction Services
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Comprehensive construction solutions tailored to your specific needs
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="service-card" sx={{ height: '100%' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <BusinessIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" align="center" gutterBottom>
                    Commercial
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Office buildings, retail spaces, hotels, and other commercial construction projects with focus on functionality and efficiency.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className="service-card" sx={{ height: '100%' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <HomeIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" align="center" gutterBottom>
                    Residential
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Single-family homes, multi-family buildings, and residential complexes built with quality and comfort in mind.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className="service-card" sx={{ height: '100%' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <EngineeringIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" align="center" gutterBottom>
                    Infrastructure
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bridges, roads, utilities, and other infrastructure projects that meet the highest standards of safety and durability.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card className="service-card" sx={{ height: '100%' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  <ArchitectureIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                </Box>
                <CardContent>
                  <Typography variant="h5" component="h3" align="center" gutterBottom>
                    Renovation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Renovation and remodeling services for existing structures, preserving character while improving functionality.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Start Your Construction Project?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4 }}>
            Contact Eagles Group LLC today for a consultation or quote on your next project.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/book-consultation"
              sx={{ px: 4 }}
            >
              Book a Consultation
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={RouterLink}
              to="/contact"
              sx={{ px: 4, borderColor: 'white' }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ServiceCatalog;
