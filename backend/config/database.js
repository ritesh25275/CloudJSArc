const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log('MongoDB is already connected...');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000, // Set server selection timeout to 20 seconds
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Failed to connect to MongoDB.');
  }
};

module.exports = connectDB;
