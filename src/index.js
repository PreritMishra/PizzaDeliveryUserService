const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
  console.log(`User Service is running on port ${PORT}`);
});
