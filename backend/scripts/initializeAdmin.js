const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const initializeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@pharmacy-dhofar.gov.om' });
    
    if (existingAdmin) {
      console.log('✓ Admin already exists');
      process.exit(0);
    }

    // Create admin with default password
    const admin = new Admin({
      email: 'admin@pharmacy-dhofar.gov.om',
      password: 'Pharmacy@2026' // Change this to a strong password
    });

    await admin.save();
    console.log('✓ Admin created successfully');
    console.log('Email:', 'admin@pharmacy-dhofar.gov.om');
    console.log('Password:', 'Pharmacy@2026');
    console.log('⚠️  IMPORTANT: Change the password on first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Error initializing admin:', error);
    process.exit(1);
  }
};

initializeAdmin();