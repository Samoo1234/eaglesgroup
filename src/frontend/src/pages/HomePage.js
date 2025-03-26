import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Check as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Engineering as EngineeringIcon,
  Architecture as ArchitectureIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();

  // Sample featured projects
  const featuredProjects = [
    {
      id: 1,
      title: 'Downtown Office Building',
      description: 'A modern 15-story office building with sustainable design features and state-of-the-art facilities.',
      image: null,
      category: 'Commercial',
    },
    {
      id: 2,
      title: 'Luxury Residential Complex',
      description: 'High-end residential complex featuring premium amenities including a pool, fitness center, and landscaped gardens.',
      image: null,
      category: 'Residential',
    },
    {
      id: 3,
      title: 'Highway Bridge Reconstruction',
      description: 'Major infrastructure project involving the reconstruction of a critical highway bridge to improve safety and traffic flow.',
      image: null,
      category: 'Infrastructure',
    },
  ];

  // Sample consultation packages
  const consultationPackages = [
    {
      id: 1,
      title: 'Initial Consultation',
      description: 'One-hour consultation to discuss your project needs and get expert advice.',
      price: 150,
      features: [
        'One-hour session with a senior consultant',
        'Project feasibility assessment',
        'High-level budget estimation',
        'Follow-up summary report',
      ],
    },
    {
      id: 2,
      title: 'Comprehensive Analysis',
      description: 'In-depth analysis of your construction project with detailed recommendations.',
      price: 450,
      features: [
        'Three-hour consultation with project experts',
        'Detailed project scope analysis',
        'Comprehensive budget planning',
        'Risk assessment and mitigation strategies',
        'Regulatory compliance review',
      ],
      featured: true,
    },
    {
      id: 3,
      title: 'Full Project Planning',
      description: 'Complete project planning service with all documentation and guidance.',
      price: 950,
      features: [
        'Full-day consultation with our team',
        'Complete project planning documentation',
        'Detailed timeline and resource allocation',
        'Vendor and contractor recommendations',
        'Permit application assistance',
        'Follow-up support (2 weeks)',
      ],
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      company: 'ABC Construction',
      avatar: null,
      comment: "Eagles Group has consistently delivered quality work on our projects. Their attention to detail and professionalism is unmatched.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Johnson Properties',
      avatar: null,
      comment: "We've worked with many construction firms, but Eagles Group stands out for their professionalism and reliability. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'Brown & Associates',
      avatar: null,
      comment: "The consultation service provided valuable insights that saved us both time and money on our project. Worth every penny.",
      rating: 4,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 10,
          backgroundImage: 'linear-gradient(rgba(25, 118, 210, 0.8), rgba(25, 118, 210, 0.95))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Building America's Future
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                Expert construction services for commercial, residential, and infrastructure projects.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/consultation"
                  sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
                  endIcon={<ScheduleIcon />}
                >
                  Book a Consultation
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/services"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderColor: 'white', mr: 2 }}
                >
                  Our Services
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  component={RouterLink}
                  to="/dashboard"
                  endIcon={<DashboardIcon />}
                  sx={{ 
                    fontWeight: 'bold',
                    '&:hover': { 
                      bgcolor: '#e6a700' 
                    } 
                  }}
                >
                  Dashboard
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                <Typography variant="h5" component="h2" color="primary.main" gutterBottom fontWeight="bold">
                  Request a Quick Quote
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Fill out this form for a no-obligation quote on your construction project.
                </Typography>
                <Box component="form" sx={{ mt: 2 }}>
                  {/* Form would go here - simplified for this example */}
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Or call us directly at <Box component="span" fontWeight="bold">(555) 123-4567</Box>
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Overview */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/services"
            endIcon={<ArrowForwardIcon />}
          >
            View All Services
          </Button>
        </Box>
      </Container>

      {/* Featured Projects */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Featured Projects
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Explore some of our recent construction projects
          </Typography>

          <Grid container spacing={4}>
            {featuredProjects.map((project) => (
              <Grid item key={project.id} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: project.category === 'Commercial' ? 'primary.light' : 
                               project.category === 'Residential' ? 'secondary.light' : 'success.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h5" color="white" sx={{ fontWeight: 'bold' }}>
                      {project.category}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      component={RouterLink}
                      to={`/services/projects/${project.id}`}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/services/projects"
              endIcon={<ArrowForwardIcon />}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Consultation Services */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Construction Consultation Services
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Expert advice to help you plan and execute your construction project successfully
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {consultationPackages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  ...(pkg.featured && {
                    border: `2px solid ${theme.palette.secondary.main}`,
                    transform: 'scale(1.05)',
                    zIndex: 1,
                    boxShadow: theme.shadows[10],
                  }),
                }}
              >
                {pkg.featured && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 0,
                      bgcolor: 'secondary.main',
                      color: 'secondary.contrastText',
                      px: 2,
                      py: 0.5,
                      borderTopLeftRadius: 16,
                      borderBottomLeftRadius: 16,
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom align="center">
                    {pkg.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    align="center"
                    color="primary.main"
                    sx={{ my: 2, fontWeight: 'bold' }}
                  >
                    ${pkg.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph align="center">
                    {pkg.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    {pkg.features.map((feature, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={pkg.featured ? 'contained' : 'outlined'}
                    color={pkg.featured ? 'secondary' : 'primary'}
                    component={RouterLink}
                    to={`/book-consultation?package=${pkg.id}`}
                    size="large"
                  >
                    Book Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 4, bgcolor: 'primary.light', borderRadius: 2, color: 'white' }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Need a Custom Consultation Package?
          </Typography>
          <Typography variant="body1" paragraph>
            We offer tailored consultation services to meet your specific project requirements. Contact us to discuss your needs.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/contact"
            sx={{ mt: 1 }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            What Our Clients Say
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Hear from businesses and individuals who have worked with Eagles Group LLC
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item key={testimonial.id} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      <Rating value={testimonial.rating} readOnly precision={0.5} />
                    </Box>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 64, 
                          height: 64,
                          mr: 2
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" component="div">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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

export default HomePage;
