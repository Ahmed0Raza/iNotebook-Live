const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes'); // Uncomment if needed

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors())
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes); // Uncomment if needed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
