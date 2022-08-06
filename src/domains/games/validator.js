const { z } = require("zod");

module.exports = {
  list: z.object({
    params: z.object({}).nullish(),
    query: z.object({}).nullish(),
    body: z.object({}).nullish(),
  })
};
