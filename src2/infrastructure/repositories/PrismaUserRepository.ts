import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { prisma } from "../database/prisma/prismaClient";
import { InputCreateUserDto } from "../../application/dto/CreateUserDto";

// ---> Nota: Implementa o repositório usando Prisma.

export class PrismaUserRepository implements UserRepository {
  async create(user: InputCreateUserDto): Promise<User> {
    return await prisma.user.create({ data: user });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getHashedPasswordByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });
  }

  /* async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  } */

  /*  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  } */

  /* async update(user: User): Promise<User> {
    return await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  } */

  /* async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  } */
}
