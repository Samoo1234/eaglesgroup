const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a material name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    enum: [
      'lumber', 
      'concrete', 
      'masonry', 
      'metals', 
      'glass', 
      'plastics', 
      'finishes', 
      'specialties', 
      'equipment', 
      'furnishings', 
      'plumbing', 
      'hvac', 
      'electrical', 
      'communications', 
      'earthwork', 
      'exterior', 
      'utilities', 
      'other'
    ],
    required: [true, 'Please specify material category']
  },
  unit: {
    type: String,
    required: [true, 'Please add unit of measurement'],
    enum: [
      'each', 
      'linear_feet', 
      'square_feet', 
      'cubic_yards', 
      'gallons', 
      'pounds', 
      'tons', 
      'boxes', 
      'pallets', 
      'bundles', 
      'rolls', 
      'sheets', 
      'other'
    ]
  },
  costPerUnit: {
    type: Number,
    required: [true, 'Please add cost per unit']
  },
  minStockLevel: {
    type: Number,
    default: 0
  },
  currentStock: {
    type: Number,
    default: 0
  },
  location: {
    warehouse: {
      type: String,
      required: [true, 'Please specify warehouse location']
    },
    aisle: String,
    shelf: String,
    bin: String
  },
  suppliers: [{
    name: {
      type: String,
      required: [true, 'Please add supplier name']
    },
    contactPerson: String,
    phone: String,
    email: String,
    website: String,
    preferredOrder: {
      type: Boolean,
      default: false
    },
    leadTime: {
      type: Number,
      comment: 'Lead time in days'
    },
    minOrderQuantity: Number,
    notes: String
  }],
  specifications: {
    manufacturer: String,
    modelNumber: String,
    partNumber: String,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      weight: Number
    },
    color: String,
    grade: String,
    certifications: [String],
    technicalSpecs: String
  },
  images: [{
    url: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  documents: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['active', 'discontinued', 'backordered', 'seasonal'],
    default: 'active'
  },
  notes: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
MaterialSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Material', MaterialSchema);
