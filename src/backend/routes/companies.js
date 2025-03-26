const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Models
const Company = require('../models/Company');

// Middleware
const { protect, authorize, checkCompanyAccess, checkCompanyRole } = require('../middleware/auth');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc    Get companies user has access to
// @route   GET /api/companies/my-companies
// @access  Private
router.get('/my-companies', protect, async (req, res) => {
  try {
    // Get company IDs from user's companies array
    const companyIds = req.user.companies.map(company => company.companyId);
    
    // Find companies by IDs
    const companies = await Company.find({ _id: { $in: companyIds } });
    
    // Add user's role in each company
    const companiesWithRole = companies.map(company => {
      const userCompany = req.user.companies.find(
        c => c.companyId.toString() === company._id.toString()
      );
      
      return {
        ...company.toObject(),
        userRole: userCompany.role,
        userPermissions: userCompany.permissions
      };
    });
    
    res.json(companiesWithRole);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @desc    Get company by ID
// @route   GET /api/companies/:companyId
// @access  Private
router.get('/:companyId', protect, checkCompanyAccess(), async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    res.json(company);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @desc    Create new company
// @route   POST /api/companies
// @access  Private/Admin
router.post(
  '/',
  [
    protect,
    authorize('admin'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('type', 'Type is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('contactEmail', 'Contact email is required').isEmail(),
      check('contactPhone', 'Contact phone is required').not().isEmpty(),
      check('taxId', 'Tax ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      type,
      description,
      logo,
      website,
      contactEmail,
      contactPhone,
      address,
      taxId,
      businessLicense,
      insuranceInfo,
      settings
    } = req.body;

    try {
      // Check if company with same name exists
      let company = await Company.findOne({ name });

      if (company) {
        return res.status(400).json({ msg: 'Company with this name already exists' });
      }

      // Create company
      company = new Company({
        name,
        type,
        description,
        logo,
        website,
        contactEmail,
        contactPhone,
        address,
        taxId,
        businessLicense,
        insuranceInfo,
        settings
      });

      await company.save();

      // Add company to user's companies
      req.user.companies.push({
        companyId: company._id,
        role: 'admin',
        permissions: ['all']
      });

      await req.user.save();

      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @desc    Update company
// @route   PUT /api/companies/:companyId
// @access  Private/Company Admin
router.put(
  '/:companyId',
  [
    protect,
    checkCompanyRole('companyId', 'admin')
  ],
  async (req, res) => {
    const {
      name,
      description,
      logo,
      website,
      contactEmail,
      contactPhone,
      address,
      taxId,
      businessLicense,
      insuranceInfo,
      settings
    } = req.body;

    try {
      let company = await Company.findById(req.params.companyId);

      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      // Check if new name is already taken by another company
      if (name && name !== company.name) {
        const existingCompany = await Company.findOne({ name });
        if (existingCompany && existingCompany._id.toString() !== req.params.companyId) {
          return res.status(400).json({ msg: 'Company with this name already exists' });
        }
      }

      // Update fields
      if (name) company.name = name;
      if (description) company.description = description;
      if (logo) company.logo = logo;
      if (website) company.website = website;
      if (contactEmail) company.contactEmail = contactEmail;
      if (contactPhone) company.contactPhone = contactPhone;
      if (address) company.address = address;
      if (taxId) company.taxId = taxId;
      if (businessLicense) company.businessLicense = businessLicense;
      if (insuranceInfo) company.insuranceInfo = insuranceInfo;
      if (settings) {
        // Merge settings
        company.settings = {
          ...company.settings,
          ...settings
        };
      }

      company.updatedAt = Date.now();
      await company.save();

      res.json(company);
    } catch (err) {
      console.error(err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Company not found' });
      }
      
      res.status(500).send('Server error');
    }
  }
);

// @desc    Delete company
// @route   DELETE /api/companies/:companyId
// @access  Private/Admin
router.delete('/:companyId', protect, authorize('admin'), async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    await company.remove();

    // Remove company from all users
    await User.updateMany(
      { 'companies.companyId': req.params.companyId },
      { $pull: { companies: { companyId: req.params.companyId } } }
    );

    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    
    res.status(500).send('Server error');
  }
});

// @desc    Add user to company
// @route   POST /api/companies/:companyId/users
// @access  Private/Company Admin
router.post(
  '/:companyId/users',
  [
    protect,
    checkCompanyRole('companyId', 'admin'),
    [
      check('email', 'Email is required').isEmail(),
      check('role', 'Role is required').isIn(['admin', 'manager', 'employee', 'client'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, role, permissions } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Check if user is already in company
      const isUserInCompany = user.companies.some(
        company => company.companyId.toString() === req.params.companyId
      );

      if (isUserInCompany) {
        return res.status(400).json({ msg: 'User is already in this company' });
      }

      // Add company to user's companies
      user.companies.push({
        companyId: req.params.companyId,
        role,
        permissions: permissions || []
      });

      await user.save();

      res.json({ msg: 'User added to company' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @desc    Remove user from company
// @route   DELETE /api/companies/:companyId/users/:userId
// @access  Private/Company Admin
router.delete(
  '/:companyId/users/:userId',
  protect,
  checkCompanyRole('companyId', 'admin'),
  async (req, res) => {
    try {
      // Find user
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Check if user is in company
      const companyIndex = user.companies.findIndex(
        company => company.companyId.toString() === req.params.companyId
      );

      if (companyIndex === -1) {
        return res.status(400).json({ msg: 'User is not in this company' });
      }

      // Remove company from user's companies
      user.companies.splice(companyIndex, 1);
      await user.save();

      res.json({ msg: 'User removed from company' });
    } catch (err) {
      console.error(err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      res.status(500).send('Server error');
    }
  }
);

// @desc    Update user role in company
// @route   PUT /api/companies/:companyId/users/:userId
// @access  Private/Company Admin
router.put(
  '/:companyId/users/:userId',
  [
    protect,
    checkCompanyRole('companyId', 'admin'),
    [
      check('role', 'Role is required').isIn(['admin', 'manager', 'employee', 'client'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role, permissions } = req.body;

    try {
      // Find user
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Find company in user's companies
      const companyIndex = user.companies.findIndex(
        company => company.companyId.toString() === req.params.companyId
      );

      if (companyIndex === -1) {
        return res.status(400).json({ msg: 'User is not in this company' });
      }

      // Update role and permissions
      user.companies[companyIndex].role = role;
      
      if (permissions) {
        user.companies[companyIndex].permissions = permissions;
      }

      await user.save();

      res.json({ msg: 'User role updated' });
    } catch (err) {
      console.error(err.message);
      
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
