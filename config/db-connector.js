const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoDB');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    const { message } = error;

    console.error('Connection to DB failed', message);

    process.exit(1);
  }
};

module.exports = connectDB;
