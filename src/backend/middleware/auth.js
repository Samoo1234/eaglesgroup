const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }
  // Check if token exists in cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ msg: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user in req object
    req.user = await User.findById(decoded.user.id);

    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Check if user is active
    if (!req.user.isActive) {
      return res.status(401).json({ msg: 'User account is deactivated' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check company access
exports.checkCompanyAccess = (companyIdParam = 'companyId') => {
  return async (req, res, next) => {
    const companyId = req.params[companyIdParam] || req.body[companyIdParam];

    if (!companyId) {
      return res.status(400).json({ msg: 'Company ID is required' });
    }

    // Check if user has access to this company
    const hasAccess = req.user.companies.some(
      company => company.companyId.toString() === companyId
    );

    if (!hasAccess) {
      return res.status(403).json({ msg: 'Not authorized to access this company' });
    }

    next();
  };
};

// Check company role
exports.checkCompanyRole = (companyIdParam = 'companyId', ...roles) => {
  return async (req, res, next) => {
    const companyId = req.params[companyIdParam] || req.body[companyIdParam];

    if (!companyId) {
      return res.status(400).json({ msg: 'Company ID is required' });
    }

    // Find the company in user's companies
    const company = req.user.companies.find(
      company => company.companyId.toString() === companyId
    );

    if (!company) {
      return res.status(403).json({ msg: 'Not authorized to access this company' });
    }

    // Check if user has required role for this company
    if (!roles.includes(company.role)) {
      return res.status(403).json({
        msg: `User role ${company.role} is not authorized to perform this action in this company`
      });
    }

    next();
  };
};

// Check permission
exports.checkPermission = (companyIdParam = 'companyId', permission) => {
  return async (req, res, next) => {
    const companyId = req.params[companyIdParam] || req.body[companyIdParam];

    if (!companyId) {
      return res.status(400).json({ msg: 'Company ID is required' });
    }

    // Find the company in user's companies
    const company = req.user.companies.find(
      company => company.companyId.toString() === companyId
    );

    if (!company) {
      return res.status(403).json({ msg: 'Not authorized to access this company' });
    }

    // Admin and manager roles have all permissions
    if (company.role === 'admin' || company.role === 'manager') {
      return next();
    }

    // Check if user has the required permission
    if (!company.permissions.includes(permission)) {
      return res.status(403).json({
        msg: `User does not have the required permission: ${permission}`
      });
    }

    next();
  };
};
