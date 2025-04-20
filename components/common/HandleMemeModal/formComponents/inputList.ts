import { FormType } from '../HandleMemeModal';

export type InputListType = {
  name: keyof FormType;
  placeholder: string;
  label: string;
  type: 'text' | 'number';
  isRequired: boolean;
};

export const inputList: InputListType[] = [
  {
    name: 'name',
    placeholder: 'Enter meme name',
    label: 'Name',
    type: 'text',
    isRequired: true,
  },
  {
    name: 'pictureLink',
    placeholder: 'Enter link to you meme',
    label: 'Meme link',
    type: 'text',
    isRequired: true,
  },
  {
    name: 'likes',
    placeholder: 'Enter likes amount',
    label: 'Meme likes',
    type: 'number',
    isRequired: false,
  },
];
