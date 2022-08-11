const { z } = require('zod');
const { zj } = require('zod-joda');

module.exports = {
  list: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({}).nullish(),
  }),
  paramsId: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/).transform(Number),
    }),
  }),
  playInit: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      id: z.number(),
      playedAt: zj.zonedDateTime(),
    }),
  }),
  playCom: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({
      id: z.number(),
      idHistory: z.number(),
      status: z.string(),
      metaData: z.object({
        playerChoice: z.string(),
        comChoice: z.string(),
      }),
    }),
  }),
};
