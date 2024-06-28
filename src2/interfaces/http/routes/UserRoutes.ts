import Elysia, { Context } from "elysia";
import { UserController } from "../controllers/UserControler";
import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository";
import { UserUseCases } from "../../../application/usecases/UserUseCases";
import { PasswordService } from "../../../application/services/PasswordService";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../../../application/services/AuthService";
import { AuthUseCases } from "../../../application/usecases/AuthUseCases";
import { authMiddleware } from "../middleware/AuthMiddleware";

const userRepository = new PrismaUserRepository();
const passwordService = new PasswordService();
const userUseCases = new UserUseCases(userRepository, passwordService);
const userControler = new UserController(userUseCases);

const authService = new AuthService();
const authUseCase = new AuthUseCases(
  userRepository,
  authService,
  passwordService
);
const authControler = new AuthController(authUseCase);

const app = new Elysia();

const userRoutes = (app: Elysia) => (
  app.post("/login", (ctx) => authControler.login(ctx)),
  app.post("/verify", (ctx) => authControler.verifyToken(ctx))
);

const protectRoutes = (app: Elysia) =>
  app.post("/users", (ctx) => userControler.createUser(ctx));

app.use(userRoutes).guard(
  {
    beforeHandle: async (ctx) =>
      await authMiddleware(ctx as Context, authService),
  },
  (app) => app.use(protectRoutes)
);

export { app };
