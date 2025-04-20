import { MemeDocument } from '@/types/mems';

import mongoose, { Model } from 'mongoose';

const memesSchema = new mongoose.Schema<MemeDocument>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    imageURL: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      min: 0,
      max: 99,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  },
);

const Meme: Model<MemeDocument> =
  mongoose.models.Mem || mongoose.model<MemeDocument>('Mem', memesSchema);

export default Meme;
