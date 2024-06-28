import { PrismaClient } from "@prisma/client";
import User from "@/core/user/model/user.interface";
import UserRepository from "@/core/user/service/UserRepository";

export default class UserRepositoryPrismaSqlite implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /* TODO - alterar interface para parametro de entrada */
  createUser(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  fetchAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  fetchUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  deleteUserById(id: string): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  updateUserById(id: string, user: User): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  deleteAllUsers(): Promise<any> {
    return this.prisma.user.deleteMany({});
  }
}
