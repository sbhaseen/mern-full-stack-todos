const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth'));

module.exports = app;
