const { z } = require('zod');

module.exports = {
  register: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z
      .object({
        email: z.string(),
        firstName: z.string(),
        lastName: z.string().nullish(),
        password: z.string().min(8).max(100),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      }),
  }),

  login: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      email: z.string(),
      password: z.string(),
    }),
  }),

  getMyBio: z.object({
    params: z.object({
      userId: z.string().regex(/^\d+$/).transform(Number),
    }),
    query: z.object({}).nullish(),
    body: z.object({}).nullish(),
  }),

  getUserBadgeAndPoint: z.object({
    params: z.object({
      userId: z.string().regex(/^\d+$/).transform(Number),
    }),
    query: z.object({}).nullish(),
    body: z.object({}).nullish(),
  }),

  editProfile: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      firstName: z.string(),
      lastName: z.string().nullish(),
      email: z.string(),
      bio: z.string().nullish(),
      country: z.string().max(3).nullish(),
      birthday: z.preprocess((a) => new Date(z.string().parse(a)), z.date()).nullish(),
    }),
  }),

  getMyGames: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      userId: z.number(),
    }),
  }),

  updateProfilePic: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      profilePic: z.string().nullish(),
    }),
  }),
};
