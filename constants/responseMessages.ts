export const responseMessages = {
  codes: {
    200: 200,
    201: 201,
    401: 401,
    403: 403,
    404: 404,
    409: 409,
    422: 422,
    500: 500,
    503: 503,
  },

  server: {
    error: 'Internal server error',
  },

  memes: {
    exist: 'Meme does not exist',
    noData: 'Some field is missing: title, url or likes',
    name: {
      maxLength: "Name can't be longer that 100 characters",
      minLength: "Name can't be shorter that 3 characters",
    },
    url: {
      valid: 'Please enter a valid URL',
    },
    likes: {
      min: 'Likes amount should be greater than or equal to 0',
      max: 'Likes amount should not be greater than 99',
    },
  },
};
