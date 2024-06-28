import { AuthUseCases } from "../../../application/usecases/AuthUseCases";
import { Context } from "elysia";

export class AuthController {
  constructor(private authUseCase: AuthUseCases) {}

  async login(ctx: Context) {
    /* TODO - criar DTO */
    const { email, password } = (await ctx.body) as {
      email: string;
      password: string;
    };

    const token = await this.authUseCase.login(email, password);
    if (token) {
      ctx.set.status = 201;
      return token;
    }
    ctx.set.status = 401;
    return { message: "Invalid credentials" };
  }

  async verifyToken(ctx: Context) {
    /* TODO - criar DTO */
    const { token } = (await ctx.body) as any;

    try {
      const decoded = await this.authUseCase.verifyToken(token);

      ctx.set.status = 201;

      return decoded;
    } catch (err) {
      console.error(err);

      ctx.set.status = 401;

      return { message: "Invalid token" };
    }
  }
}
