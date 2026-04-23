const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middleware

app.use(cors());
app.use(express.json());

// MongoDB Connection

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (err) {
    console.error('✗ MongoDB Error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/patient', require('./routes/patient'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

app.get('/api', (req, res) => {
  res.send('API running');
});

// Serve frontend (production)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Start Server

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
