import { validationRules } from '@/constants/validationRules';

import { errorMessages } from './errorMessages';

export const validations = {
  name: {
    required: errorMessages.required,
    maxLength: {
      value: validationRules.nameMaxLength,
      message: errorMessages.name.maxLength,
    },
    minLength: {
      value: validationRules.nameMinLength,
      message: errorMessages.name.minLength,
    },
  },
  pictureLink: {
    required: errorMessages.required,
    pattern: {
      value: validationRules.UrlPattern,
      message: errorMessages.url.valid,
    },
  },
  likes: {
    validate: (data: string | undefined) => {
      if (!data) {
        return true;
      }

      if (Number(data) < validationRules.likesMin) {
        return errorMessages.likes.min;
      }

      if (Number(data) > validationRules.likesMax) {
        return errorMessages.likes.max;
      }

      return true;
    },
  },
};
