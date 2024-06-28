import { Context } from "elysia";
import { AuthService } from "../../../application/services/AuthService";

export const authMiddleware = async (
  ctx: Context,
  authService: AuthService
) => {
  const authHeader = ctx.request.headers.get("authorization");

  if (!authHeader) {
    ctx.set.status = 401;
    return { message: "Authorization header missing" };
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    ctx.set.status = 401;
    return { message: "Token missing" };
  }

  try {
    await authService.verifyToken(token);
  } catch (err) {
    ctx.set.status = 401;
    console.error(err);
    return { message: "Invalid token" };
  }
};
