const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const dogRoutes = require('./routes/dogRoutes');
const userRoutes = require('./routes/userRoutes'); // If you have user auth too

// Mount routes
app.use('/api/dogs', dogRoutes);       // All dog routes will be under /api/dogs
app.use('/api/users', userRoutes);     // Optional: for register/login routes

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
