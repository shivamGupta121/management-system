const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./user/routes/userRoute');
const taskRoutes = require('./task/routes/taskroute');
const config = require('./config');

mongoose.set('strictQuery', false);

const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

// User Microservice Routes
app.use('/api/users', userRoutes);

// Task Microservice Routes
app.use('/api/tasks', taskRoutes);

// Export the app instance
module.exports = app;

