import { UserServiceFactory } from "../services/UserServiceFactory";
import { usersQueryStringValidator } from "../middlewares/UsersQueryStringValidator";
import { UserController } from "../controllers/UserController";
import express, { NextFunction, Request, Response } from "express";

export const router = express.Router();

router.get(
  "/users",
  usersQueryStringValidator,
  async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const gitHubUserService = UserServiceFactory.getGitHubUserService();
    const githubUserController = new UserController(gitHubUserService);

    await githubUserController.getUsers(request, response, next);
  }
);
