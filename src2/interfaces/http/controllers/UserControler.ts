import {
  InputCreateUserDto,
  OutputCreateUserDto,
} from "../../../application/dto/CreateUserDto";
import { UserUseCases } from "../../../application/usecases/UserUseCases";
import { Context } from "elysia";

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async createUser(
    ctx: Context
  ): Promise<OutputCreateUserDto | { message: string }> {
    const { name, email, password } = (await ctx.body) as InputCreateUserDto;

    const user = await this.userUseCases.createUser({
      name,
      email,
      password,
    });

    if (!user) {
      ctx.set.status = 400;
      return {
        message: "User already exists.",
      };
    }

    ctx.set.status = 201;

    return { ...user };
  }
}
