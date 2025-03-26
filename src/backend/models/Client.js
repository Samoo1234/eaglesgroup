const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a client name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
      maxlength: [2, 'State should be a 2-letter code']
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code'],
      match: [/^\d{5}(-\d{4})?$/, 'Please add a valid US zip code']
    }
  },
  companyName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['individual', 'business', 'government'],
    default: 'individual'
  },
  taxId: {
    type: String,
    match: [/^\d{2}-\d{7}$|^\d{3}-\d{2}-\d{4}$/, 'Please add a valid EIN or SSN']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'prospect', 'former'],
    default: 'prospect'
  },
  source: {
    type: String,
    enum: ['referral', 'website', 'social_media', 'advertisement', 'direct', 'other'],
    default: 'other'
  },
  notes: {
    type: String
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  projects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  }],
  consultations: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Consultation'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', ClientSchema);
