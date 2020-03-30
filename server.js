const express = require('express');
const connectDB = require('./config/db-connector');

// Routes
const { auth, posts, users } = require('./routes/api');

const app = express();

const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/users', users);

app.listen(PORT, () => console.log('started on port', PORT));
