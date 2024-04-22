import User from "@/core/user/model/user.interface";

export default interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  fetchAllUsers(): Promise<User[]>;
  fetchUserById(id: string): Promise<User | null>;
  deleteUserById(id: string): Promise<User | null>;
  updateUserById(id: string, user: User): Promise<User | null>;
}
