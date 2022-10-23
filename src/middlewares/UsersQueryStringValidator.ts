import { Response, Request, NextFunction } from "express";
import { getUsersParamsValidationSchema } from "../validation/GetUsersParamsValidation";

export const usersQueryStringValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { cursor, limit } = req?.query;
  const language = req?.query.hasOwnProperty("language")
    ? (req?.query?.language as string)?.split(",")
    : undefined;

  const { value: validatedData, error } =
    getUsersParamsValidationSchema.validate(
      {
        language,
        limit,
        cursor,
      },
      {
        abortEarly: false,
        errors: {
          label: "key",
        },
      }
    );

  if (error) {
    const errors: {
      key: Array<string | number>;
      message: string | number;
    }[] = [];

    error.details.forEach((detail) => {
      errors.push({
        key: detail.path,
        message: detail.message,
      });
    });

    res.status(400).json({
      errors,
    });
  } else {
    req.query = validatedData;
    next();
  }
};
