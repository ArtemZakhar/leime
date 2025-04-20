import { responseMessages } from '@/constants/responseMessages';
import { validationRules } from '@/constants/validationRules';
import { MemeType } from '@/types/mems';

export const newMemeDataValidation = (data: Omit<MemeType, 'id'>) => {
  const { title, likes, imageURL } = data;
  const validationErrors: string[] = [];

  if (!title || likes === undefined || !imageURL) {
    validationErrors.push(responseMessages.memes.noData);
  }

  if (title.length > validationRules.nameMaxLength) {
    validationErrors.push(responseMessages.memes.name.maxLength);
  }

  if (title.length < validationRules.nameMinLength) {
    validationErrors.push(responseMessages.memes.name.minLength);
  }

  if (likes < validationRules.likesMin) {
    validationErrors.push(responseMessages.memes.likes.min);
  }

  if (likes > validationRules.likesMax) {
    validationErrors.push(responseMessages.memes.likes.max);
  }

  if (!imageURL.match(validationRules.UrlPattern)) {
    validationErrors.push(responseMessages.memes.url.valid);
  }

  return validationErrors;
};
