const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes'); // ✅ Add this
require('dotenv').config();

app.use(express.json());

// Auth routes
app.use('/auth', userRoutes); // POST /auth/register, /auth/login

// Dog routes
app.use('/dogs', dogRoutes); // POST /dogs, GET /dogs, etc.

module.exports = app;
