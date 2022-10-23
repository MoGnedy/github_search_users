import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { GraphqlResponseError } from "@octokit/graphql";
import { router as githubUsersRouter } from "./routes/GithubUsersRoutes";

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

app.use("/api/v1/github", githubUsersRouter);

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

  if (err instanceof GraphqlResponseError) {
    res.status(400).json({
      errors: err.errors.map((error) => ({
        key: error.type,
        message: error.message,
      })),
    });
  } else {
    res.sendStatus(500);
  }
}
