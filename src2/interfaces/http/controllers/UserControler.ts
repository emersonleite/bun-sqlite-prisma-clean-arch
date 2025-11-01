import { InputCreateUserDto, OutputCreateUserDto } from "../dto/CreateUserDto";
import { UserUseCases } from "../../../domain/usecases/UserUseCases";
import { Context } from "elysia";

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async createUser(
    ctx: Context
  ): Promise<OutputCreateUserDto | { message: string }> {
    const { name, email, password } = (await ctx.body) as InputCreateUserDto;

    console.log(name, email, password);

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
