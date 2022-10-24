import { NextFunction, Request, Response } from "express";
import { UserServiceInterface } from "../services/UserServiceInterface";
import { User } from "../models/User";

export declare type GetUsersResponse = {
  users: User[];
  metaData: {
    endCursor?: string;
  };
};

export class UserController {
  public constructor(private _service: UserServiceInterface) {}

  public async getUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { cursor, limit, language } = request.query;

    try {
      const { users, endCursor } = await this._service.getUsers(
        {
          language: language as string[],
        },
        {
          cursor: cursor as string | undefined,
          limit: +limit,
        }
      );

      response.json({
        users,
        metaData: {
          endCursor,
        },
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
