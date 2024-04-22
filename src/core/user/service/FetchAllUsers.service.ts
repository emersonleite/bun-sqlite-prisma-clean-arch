import User from "@/core/user/model/user.interface";
import UseCase from "@/core/shared/UseCase";
import UserRepository from "./UserRepository";

export default class FetchAllUsersService implements UseCase<void, User[]> {
  constructor(readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.fetchAllUsers();
  }
}
