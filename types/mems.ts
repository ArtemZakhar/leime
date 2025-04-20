import mongoose from 'mongoose';

export type MemeBase = {
  title: string;
  imageURL: string;
  likes: number;
};

export type MemeDocument = MemeBase &
  mongoose.Document & {
    _id: mongoose.Types.ObjectId;
  };

export type MemeType = MemeBase & {
  id: string;
};
