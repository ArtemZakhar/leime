import mongoose from 'mongoose';

import '../models/Memes';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (e) {
    console.log(e);
    console.log('failed to connect to DB');
  }
};
