const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense', 'invoice', 'payment', 'tax', 'payroll'],
    required: [true, 'Please specify transaction type']
  },
  amount: {
    type: Number,
    required: [true, 'Please add amount']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  date: {
    type: Date,
    required: [true, 'Please add transaction date'],
    default: Date.now
  },
  category: {
    type: String,
    required: [true, 'Please specify transaction category']
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'check', 'cash', 'other'],
    default: 'bank_transfer'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'refunded', 'partially_paid', 'overdue'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  taxInformation: {
    taxable: {
      type: Boolean,
      default: true
    },
    taxRate: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    taxCategory: {
      type: String,
      enum: ['sales_tax', 'income_tax', 'property_tax', 'payroll_tax', 'other'],
      default: 'sales_tax'
    }
  },
  recurringTransaction: {
    isRecurring: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'],
      default: 'monthly'
    },
    endDate: {
      type: Date
    }
  },
  attachments: [{
    name: String,
    fileUrl: String,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  notes: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate tax amount before saving
FinanceSchema.pre('save', function(next) {
  if (this.taxInformation.taxable && this.taxInformation.taxRate > 0) {
    this.taxInformation.taxAmount = (this.amount * this.taxInformation.taxRate) / 100;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Finance', FinanceSchema);
