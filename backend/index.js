require("dotenv").config();
console.log("PORT:", process.env.PORT);
console.log("MONGO_URL:", process.env.MONGO_URL);

const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();
const port = process.env.PORT || 5000;  // Fallback to 5000 if not defined

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
