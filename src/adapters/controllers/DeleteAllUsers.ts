import Elysia from "elysia";
import deleteAllUsers from "@/core/user/service/DeleteAllUsers.service";
import { UserData } from "@/core/user/service/CreateUser.service";

export default class DeleteAllUsersController {
  constructor(readonly server: Elysia, readonly useCase: deleteAllUsers) {
    server.delete("/users/all", async ({ set, body }) => {
      try {
        const response = await useCase.execute();

        const { count } = response as { count: number };

        set.status = 201;

        set.headers["content-type"] = "application/json";

        return {
          message: `Were deleted ${count} users`,
        };
      } catch (error) {
        set.status = 404;

        set.headers["content-type"] = "application/json";

        return { message: "This user was not found" };
      }
    });
  }
}
