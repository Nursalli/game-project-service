const { z } = require("zod");

module.exports = {
  register: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string().nullish(),
      password: z.string().min(8).max(100),
      confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords don\'t match',
      path: ['confirmPassword'],
    })
  }),

  login: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      email: z.string(),
      password: z.string(),
    })
  })
};
