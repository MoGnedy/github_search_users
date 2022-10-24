import { User } from "../models/User";
import { FilterOptions, FilterParams } from "../services/UserService";

export declare type UsersData = {
  users: User[];
  endCursor?: string;
};

export interface UserRepository {
  getUsers(
    filterParams: FilterParams,
    filterOptions: FilterOptions
  ): Promise<UsersData>;
}
