import { UserRepository, UsersData } from "../repositories/UserRepository";
import { UserServiceInterface } from "./UserServiceInterface";

export declare type FilterParams = {
  language: string[];
};

export declare type FilterOptions = { limit: number; cursor?: string };

export class UserService implements UserServiceInterface {
  public constructor(private _userRepository: UserRepository) {}
  async getUsers(
    filterParams: FilterParams,
    filterOptions: FilterOptions
  ): Promise<UsersData> {
    return this._userRepository.getUsers(filterParams, filterOptions);
  }
}
