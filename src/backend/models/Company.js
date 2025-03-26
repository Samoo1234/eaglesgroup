const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  type: {
    type: String,
    enum: ['construction', 'concrete', 'cleaning', 'other'],
    required: true
  },
  description: {
    type: String,
    required: [true, 'Company description is required']
  },
  logo: {
    type: String,
    default: 'default-company-logo.png'
  },
  website: String,
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required']
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    }
  },
  taxId: {
    type: String,
    required: [true, 'Tax ID is required']
  },
  businessLicense: {
    number: String,
    expiryDate: Date,
    state: String
  },
  insuranceInfo: {
    provider: String,
    policyNumber: String,
    expiryDate: Date,
    coverageAmount: Number
  },
  settings: {
    theme: {
      primaryColor: {
        type: String,
        default: '#1976d2'
      },
      secondaryColor: {
        type: String,
        default: '#f50057'
      },
      logo: String
    },
    modules: {
      projects: {
        type: Boolean,
        default: true
      },
      clients: {
        type: Boolean,
        default: true
      },
      materials: {
        type: Boolean,
        default: true
      },
      finance: {
        type: Boolean,
        default: true
      },
      personnel: {
        type: Boolean,
        default: true
      },
      consultations: {
        type: Boolean,
        default: true
      }
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      inApp: {
        type: Boolean,
        default: true
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Create company slug from the name
CompanySchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  next();
});

module.exports = mongoose.model('Company', CompanySchema);
