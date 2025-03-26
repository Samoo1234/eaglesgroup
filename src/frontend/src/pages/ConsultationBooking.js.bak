import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Card,
  CardContent,
  Alert,
  Checkbox,
  FormGroup,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addDays, isWeekend } from 'date-fns';

const ConsultationBooking = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const preselectedPackage = queryParams.get('package');

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Select Package', 'Choose Date & Time', 'Your Information', 'Payment', 'Confirmation'];

  // Form state
  const [formData, setFormData] = useState({
    packageId: preselectedPackage || '',
    consultationType: 'initial',
    consultationDate: null,
    consultationTime: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    hearAboutUs: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    agreeToTerms: false,
  });

  // Sample consultation packages
  const consultationPackages = [
    {
      id: '1',
      title: 'Initial Consultation',
      description: 'One-hour consultation to discuss your project needs and get expert advice.',
      price: 150,
      duration: '1 hour',
      features: [
        'One-hour session with a senior consultant',
        'Project feasibility assessment',
        'High-level budget estimation',
        'Follow-up summary report',
      ],
    },
    {
      id: '2',
      title: 'Comprehensive Analysis',
      description: 'In-depth analysis of your construction project with detailed recommendations.',
      price: 450,
      duration: '3 hours',
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
      id: '3',
      title: 'Full Project Planning',
      description: 'Complete project planning service with all documentation and guidance.',
      price: 950,
      duration: '8 hours',
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

  // Project type options
  const projectTypes = [
    { value: 'commercial', label: 'Commercial Building' },
    { value: 'residential', label: 'Residential Property' },
    { value: 'industrial', label: 'Industrial Facility' },
    { value: 'infrastructure', label: 'Infrastructure Project' },
    { value: 'renovation', label: 'Renovation/Remodeling' },
    { value: 'other', label: 'Other' }
  ];

  // US States
  const usStates = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ];

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle date and time changes
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      consultationDate: date,
    });
  };

  const handleTimeChange = (time) => {
    setFormData({
      ...formData,
      consultationTime: time,
    });
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to your backend here
    console.log('Form submitted:', formData);
    handleNext(); // Move to confirmation step
  };

  // Get the selected package
  const selectedPackage = consultationPackages.find(pkg => pkg.id === formData.packageId) || consultationPackages[0];

  // Render step content
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Select a Consultation Package
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Choose the consultation package that best fits your project needs.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {consultationPackages.map((pkg) => (
                <Grid item key={pkg.id} xs={12} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: formData.packageId === pkg.id ? `2px solid ${theme.palette.primary.main}` : 
                             pkg.featured ? `2px solid ${theme.palette.secondary.main}` : '1px solid rgba(0, 0, 0, 0.12)',
                      boxShadow: formData.packageId === pkg.id ? theme.shadows[8] : 
                                pkg.featured ? theme.shadows[4] : theme.shadows[1],
                      position: 'relative',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => setFormData({ ...formData, packageId: pkg.id })}
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
                    <CardContent sx={{ flexGrow: 1, pt: pkg.featured ? 4 : 2 }}>
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
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                        {pkg.duration}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {pkg.description}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box component="ul" sx={{ pl: 2 }}>
                        {pkg.features.map((feature, index) => (
                          <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant={formData.packageId === pkg.id ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => setFormData({ ...formData, packageId: pkg.id })}
                      >
                        {formData.packageId === pkg.id ? "Selected" : "Select"}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Choose Date & Time
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Select your preferred date and time for the consultation.
            </Typography>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Consultation Date"
                    value={formData.consultationDate}
                    onChange={handleDateChange}
                    minDate={addDays(new Date(), 1)}
                    shouldDisableDate={isWeekend}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Consultations are available Monday-Friday, at least 24 hours in advance.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TimePicker
                    label="Consultation Time"
                    value={formData.consultationTime}
                    onChange={handleTimeChange}
                    minutesStep={30}
                    minTime={new Date(0, 0, 0, 9)}
                    maxTime={new Date(0, 0, 0, 17, 30)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Consultation hours are from 9:00 AM to 5:30 PM Eastern Time.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Consultation Type</FormLabel>
                    <RadioGroup
                      row
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="virtual" control={<Radio />} label="Virtual Meeting" />
                      <FormControlLabel value="onsite" control={<Radio />} label="On-site Visit" />
                      <FormControlLabel value="office" control={<Radio />} label="At Our Office" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Your Information
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Please provide your contact details and project information.
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company Name (if applicable)"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Project Information
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Project Type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  {projectTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Project Description"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Please provide a brief description of your project, including its scope, timeline, and any specific requirements."
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Address Information
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  select
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {usStates.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="How did you hear about us?"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                >
                  <MenuItem value="search">Search Engine</MenuItem>
                  <MenuItem value="social">Social Media</MenuItem>
                  <MenuItem value="referral">Referral</MenuItem>
                  <MenuItem value="advertisement">Advertisement</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 3:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Payment Information
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              Please provide your payment details to secure your consultation.
            </Typography>
            
            <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {selectedPackage.title} ({selectedPackage.duration})
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" align="right">
                    ${selectedPackage.price.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" fontWeight="bold">
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" fontWeight="bold" align="right">
                    ${selectedPackage.price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    row
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
                    <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              
              {formData.paymentMethod === 'credit_card' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Cardholder Name"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry Date"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      fullWidth
                      label="CVC"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      placeholder="123"
                    />
                  </Grid>
                </>
              )}
              
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        name="agreeToTerms"
                        required
                      />
                    }
                    label="I agree to the terms and conditions, including the cancellation policy."
                  />
                </FormGroup>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Cancellations made less than 24 hours before the scheduled consultation time are subject to a 50% cancellation fee.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 4:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" gutterBottom color="primary.main">
              Thank You for Your Booking!
            </Typography>
            <Typography variant="h6" paragraph>
              Your consultation has been scheduled successfully.
            </Typography>
            
            <Alert severity="success" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              A confirmation email has been sent to {formData.email} with all the details.
            </Alert>
            
            <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid rgba(0, 0, 0, 0.12)', maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom>
                Booking Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Package:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {selectedPackage.title}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Date & Time:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {formData.consultationDate && format(formData.consultationDate, 'MMMM d, yyyy')} at {formData.consultationTime && format(formData.consultationTime, 'h:mm a')}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Type:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {formData.consultationType.replace('_', ' ')}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Booking ID:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    EGLC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            
            <Typography variant="body1" paragraph>
              If you have any questions or need to make changes to your booking, please contact us at (555) 123-4567.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Return to Home
            </Button>
          </Box>
        );
      
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/consultation-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Book a Construction Consultation
          </Typography>
          <Typography variant="h6" paragraph>
            Get expert advice and guidance for your construction project
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {/* Step Content */}
          <Box component="form" onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Box>
                {activeStep === steps.length - 2 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formData.agreeToTerms}
                  >
                    Complete Booking
                  </Button>
                ) : activeStep === steps.length - 1 ? null : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 && !formData.packageId) ||
                      (activeStep === 1 && (!formData.consultationDate || !formData.consultationTime))
                    }
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ConsultationBooking;
