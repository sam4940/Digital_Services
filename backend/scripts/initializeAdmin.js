// scripts/initializeAdmin.js

const Admin = require('../models/Admin');

const initializeAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: 'admin@pharmacy-dhofar.gov.om'
    });

    if (existingAdmin) {
      console.log('✓ Admin already exists');
      return;
    }

    // Create admin
    const admin = new Admin({
      email: 'admin@pharmacy-dhofar.gov.om',
      password: 'Pharmacy@2026'
    });

    await admin.save();

    console.log('✓ Admin created successfully');
    console.log('Email: admin@pharmacy-dhofar.gov.om');
    console.log('Password: Pharmacy@2026');

  } catch (error) {
    console.error('✗ Error initializing admin:', error.message);
  }
};

module.exports = initializeAdmin;
