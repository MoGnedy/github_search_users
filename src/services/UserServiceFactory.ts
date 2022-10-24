import { Octokit } from "octokit";
import { GitHubUserRepository } from "../repositories/GitHubUserRepository";
import { UserService } from "./UserService";
import { UserServiceInterface } from "./UserServiceInterface";

export class UserServiceFactory {
  public static getGitHubUserService(): UserServiceInterface {
    const octokit = new Octokit({
      auth: process.env.GITHUB_API_TOKEN,
    });

    const gitHubUserRepository = new GitHubUserRepository(octokit);

    return new UserService(gitHubUserRepository);
  }
}
