const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbconnect'); 
const userRoutes = require('./Routes/userRoutes'); 
const paymentRoutes = require('./Routes/userRoutes');
const managerRoutes = require('./Routes/managerRoutes');
// Import user routes
const app = express();

dotenv.config();

// ✅ CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

// Use user routes
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
// app.use('/api/manager', managerRoutes);

app.get('/', (req, res) => {
  console.log('✅ GET / called');
  res.send('🎉 Backend is working and MongoDB is connected!');
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


