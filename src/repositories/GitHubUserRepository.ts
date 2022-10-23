import { FilterParams, FilterOptions } from "../services/UserService";
import { UserRepository, UsersData } from "./UserRepository";
import { Octokit } from "octokit";
import { User } from "../models/User";

export class GitHubUserRepository implements UserRepository {
  private readonly defaultLimit = 5;
  private readonly maxLimit = 100;

  public constructor(private _octokit: Octokit) {}
  async getUsers(
    filterParams: FilterParams,
    filterOptions: FilterOptions = {
      limit: this.defaultLimit,
    }
  ): Promise<UsersData> {
    const limit = Math.min(filterOptions.limit, this.maxLimit);

    const graphqlVariables: SearchUsersQueryVariables = {
      userQuery: filterParams.language
        ? `language:${filterParams.language}`
        : "",
      first: limit,
    };

    if (filterOptions.cursor) {
      graphqlVariables.after = filterOptions.cursor;
    }

    const res = await this._octokit.graphql<SearchUsersGraphqlResponse>(
      SearchUsersQuery,
      graphqlVariables
    );

    const users: User[] = res.search.edges.map(({ node }) => ({
      username: node.login,
      name: node.name,
      followersCount: node.followers?.totalCount || 0,
      avatarUrl: node.avatarUrl,
    }));

    return {
      users,
      endCursor: res.search.pageInfo.endCursor,
    };
  }
}

declare type SearchUsersGraphqlResponse = {
  search: {
    edges: {
      node: {
        avatarUrl: string;
        login: string;
        name: string;
        followers: {
          totalCount: number;
        };
      };
    }[];
    pageInfo: {
      endCursor: string;
    };
  };
};

declare type SearchUsersQueryVariables = {
  userQuery: string;
  first: number;
  after?: string;
};

const SearchUsersQuery = `  query SearchUsers($userQuery: String!, $first: Int!, $after: String) {
  search(query: $userQuery, type: USER, first: $first, after: $after) {
    edges {
      node {
        ... on User {
          avatarUrl
          login
          name
          followers{
            totalCount
          }
        }
      }
    }
    pageInfo{
      endCursor
    }
  }
}
`;
