import Elysia from "elysia";
import FetchAllUsersService from "@/core/user/service/FetchAllUsers.service";

export default class FetchAllUsersController {
  constructor(readonly server: Elysia, readonly useCase: FetchAllUsersService) {
    server.get("/users/all", async ({ set }) => {
      try {
        set.status = 201;

        set.headers["content-type"] = "application/json";

        return await useCase.execute();
      } catch (error) {
        set.status = 404;

        set.headers["content-type"] = "application/json";
      }
    });
  }
}
