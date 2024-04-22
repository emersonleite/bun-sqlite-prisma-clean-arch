import User from "@/core/user/model/user.interface";
import UseCase from "@/core/shared/UseCase";
import UserRepository from "./UserRepository";

export default class DeleteUserByIdService
  implements UseCase<string, User | null>
{
  constructor(readonly repository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.repository.deleteUserById(id);
  }
}
