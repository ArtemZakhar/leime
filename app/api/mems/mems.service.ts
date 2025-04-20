import Meme from '@/models/Memes';
import { MemeType } from '@/types/mems';

import { ObjectId } from 'mongodb';

export const getAllMems = async () => {
  return await Meme.find();
};

export const createNewMeme = async (meme: Omit<MemeType, 'id'>) => {
  const newMeme = await Meme.create(meme);

  await newMeme.save();

  return newMeme;
};

export const updateMeme = async (data: Partial<MemeType>) => {
  const { id, ...restData } = data;

  return await Meme.findByIdAndUpdate(new ObjectId(id), restData, {
    new: true,
  });
};
