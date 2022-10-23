import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

export const app = express();

app.use(
  helmet({
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(errorHandler);

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  res.sendStatus(500);
}
