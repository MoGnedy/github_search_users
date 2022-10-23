import { UserRepository, UsersData } from "../repositories/UserRepository";

export declare type FilterParams = {
  language: string[];
};

export declare type FilterOptions = { limit: number; cursor?: string };

export class UserService {
  public constructor(private _userRepository: UserRepository) {}
  async getUsers(
    filterParams: FilterParams,
    filterOptions: FilterOptions
  ): Promise<UsersData> {
    return this._userRepository.getUsers(filterParams, filterOptions);
  }
}
