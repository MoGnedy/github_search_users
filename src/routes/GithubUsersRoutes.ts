import { UserServiceFactory } from "../services/UserServiceFactory";
import { UserController } from "../controllers/UserController";
import express, { NextFunction, Request, Response } from "express";

export const router = express.Router();

router.get(
  "/users",
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
