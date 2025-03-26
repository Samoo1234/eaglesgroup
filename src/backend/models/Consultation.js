const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'Please add a client']
  },
  consultant: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please add a consultant']
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in hours'],
    min: [0.5, 'Minimum consultation duration is 30 minutes (0.5 hours)'],
    max: [8, 'Maximum consultation duration is 8 hours']
  },
  rate: {
    type: Number,
    required: [true, 'Please add hourly rate']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please add total amount']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'partially_paid'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'check', 'cash', 'other'],
    default: 'credit_card'
  },
  paymentId: {
    type: String
  },
  location: {
    type: String,
    enum: ['onsite', 'virtual', 'office'],
    default: 'office'
  },
  meetingLink: {
    type: String
  },
  notes: {
    type: String
  },
  documents: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  feedback: {
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    comment: String,
    submittedAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total amount before saving
ConsultationSchema.pre('save', function(next) {
  this.totalAmount = this.rate * this.duration;
  next();
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
