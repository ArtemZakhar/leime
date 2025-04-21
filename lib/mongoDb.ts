import mongoose from 'mongoose';

import '../models/Memes';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    await mongoose.connect(uri);
  } catch (e) {
    console.log(e);
    console.log('failed to connect to DB');
  }
};
