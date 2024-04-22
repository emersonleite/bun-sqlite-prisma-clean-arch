import Elysia from "elysia";
import CreateUserService, {
  UserData,
} from "@/core/user/service/CreateUser.service";

export default class CreateUserController {
  // Aqui poderia ter sido criada uma interface para poder abstrair, também, a biblioteca de server
  constructor(readonly server: Elysia, readonly useCase: CreateUserService) {
    server.post("/users", async ({ body, set }) => {
      const { name, email, password } = body as UserData;

      try {
        await useCase.execute({ name, email, password });
        set.status = 201;
        set.headers["content-type"] = "application/json";
        return {
          message: "User created!",
        };
      } catch (error) {
        set.status = 404;
        set.headers["content-type"] = "application/json";
        throw new Error("User is registered");
      }
    });
  }
}
