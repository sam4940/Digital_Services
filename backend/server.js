const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:3000',
  ],
  credentials: true
}));
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB Connected Successfully');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/patient', require('./routes/patient'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

// API Root
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/build');
  const indexFile = path.join(frontendPath, 'index.html');

  if (fs.existsSync(indexFile)) {
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
      res.sendFile(indexFile);
    });

    console.log('✓ Serving frontend from', frontendPath);
  } else {
    console.warn('⚠ Frontend build not found at', frontendPath);

    app.get('/', (req, res) => {
      res.send('Backend is running. Frontend build not found. Check Render build settings.');
    });
  }
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
