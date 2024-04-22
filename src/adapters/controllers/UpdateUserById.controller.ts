import Elysia from "elysia";
import DeleteUserByIdService from "@/core/user/service/DeleteUserById.service";

export default class DeleteUserByIdController {
  constructor(
    readonly server: Elysia,
    readonly useCase: DeleteUserByIdService
  ) {
    server.delete("/user/:id", async ({ set, params: { id } }) => {
      try {
        set.status = 201;

        set.headers["content-type"] = "application/json";

        const response = await useCase.execute(id);

        if (response) {
          const { email, name, createdAt } = response;
          return {
            message: `User name ${name}, email: ${email}, created at: ${createdAt} was deleted`,
          };
        }
      } catch (error) {
        set.status = 404;

        set.headers["content-type"] = "application/json";

        return { message: "This user was not found" };
      }
    });
  }
}
