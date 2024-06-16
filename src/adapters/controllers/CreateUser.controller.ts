import Elysia from "elysia";
import CreateUserService, {
  UserData,
} from "@/core/user/service/CreateUser.service";

export default class CreateUserController {
  constructor(readonly server: Elysia, readonly useCase: CreateUserService) {
    server.post("/users", async ({ body, set }) => {
      const { name, email, password } = body as UserData;

      try {
        /* EBLE */
        /* 
        Compor o controller por 3 serviços/ usecases -> 
        1. Verificação de usuário por email (ver se já existe);
        2. Criação de senha com hash;
        3. Cadastro do usuário de fato
        */
        await useCase.execute({ name, email, password });

        set.status = 201;

        set.headers["content-type"] = "application/json";

        return {
          message: `User ${name} created!`,
        };
      } catch (error) {
        /* EBLE - status para erro ? 404?  */
        set.status = 404;

        set.headers["content-type"] = "application/json";

        throw new Error("User is registered");
      }
    });
  }
}
