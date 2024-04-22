import User from "@/core/user/model/user.interface";
import UserRepository from "@/core/user/service/UserRepository";

export default class UserRepositoryMemory implements UserRepository {
  private readonly usersList: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.usersList.find((user) => user.email === email) ?? null;
  }

  async createUser(user: User): Promise<User> {
    const newUser = { ...user, id: String(Math.random()) };
    this.usersList.push(newUser);
    return newUser;
  }

  async fetchAllUsers(): Promise<User[]> {
    return this.usersList;
  }

  async fetchUserById(id: string): Promise<User | null> {
    return this.usersList.filter((user) => user.id === id)[0];
  }
}
