import UseCase from "@/core/shared/UseCase";
import UserRepository from "./UserRepository";

/* EBLE - TODO - salvar em outra pasta */
interface CountUsers {
  count: number;
}

export default class deleteAllUsers implements UseCase<void, CountUsers> {
  constructor(readonly repository: UserRepository) {}

  async execute(): Promise<CountUsers> {
    return this.repository.deleteAllUsers();
  }
}
