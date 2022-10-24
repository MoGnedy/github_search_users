import { UsersData } from "../repositories/UserRepository";
import { FilterOptions, FilterParams } from "./UserService";

export interface UserServiceInterface {
  getUsers(
    filterParams: FilterParams,
    filterOptions: FilterOptions
  ): Promise<UsersData>;
}
