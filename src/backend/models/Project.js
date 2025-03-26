const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true
  },
  projectManager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  team: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  estimatedEndDate: {
    type: Date,
    required: [true, 'Please add an estimated end date']
  },
  actualEndDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  type: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'infrastructure', 'renovation'],
    required: [true, 'Please specify project type']
  },
  location: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  budget: {
    estimated: {
      type: Number,
      required: [true, 'Please add an estimated budget']
    },
    actual: {
      type: Number
    }
  },
  permits: [{
    type: {
      type: String,
      required: [true, 'Please specify permit type']
    },
    number: {
      type: String,
      required: [true, 'Please add permit number']
    },
    issuedBy: {
      type: String,
      required: [true, 'Please add issuing authority']
    },
    issueDate: {
      type: Date,
      required: [true, 'Please add issue date']
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please add expiry date']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'expired'],
      default: 'pending'
    }
  }],
  milestones: [{
    name: {
      type: String,
      required: [true, 'Please add milestone name']
    },
    description: String,
    plannedDate: {
      type: Date,
      required: [true, 'Please add planned completion date']
    },
    actualDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'delayed'],
      default: 'pending'
    }
  }],
  materials: [{
    material: {
      type: mongoose.Schema.ObjectId,
      ref: 'Material'
    },
    quantity: Number,
    unit: String,
    status: {
      type: String,
      enum: ['pending', 'ordered', 'delivered', 'installed'],
      default: 'pending'
    }
  }],
  documents: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  }],
  notes: [{
    text: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
