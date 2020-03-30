const express = require('express');
const connectDB = require('./config/db-connector');

const app = express();

const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

app.listen(PORT, () => console.log('started on port', PORT));
