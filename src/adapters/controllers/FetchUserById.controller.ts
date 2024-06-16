import Elysia from "elysia";
import FetchUserByIdService from "@/core/user/service/FetchUserById.service";

export default class FetchUserByIdController {
  constructor(readonly server: Elysia, readonly useCase: FetchUserByIdService) {
    server.get("/user/:id", async ({ set, params: { id } }) => {
      try {
        set.status = 201;

        set.headers["content-type"] = "application/json";

        const response = await useCase.execute(id);

        if (!response) {
          return {
            message: "User not found!",
          };
        }

        return response;
      } catch (error) {
        set.status = 404;

        set.headers["content-type"] = "application/json";
      }
    });
  }
}
