import Joi from "joi";

export const getUsersParamsValidationSchema = Joi.object({
  cursor: Joi.string().empty("").default("").optional(),
  limit: Joi.number().empty("").min(1).default(1).optional(),
  language: Joi.array().items(Joi.string()),
});
