import UseCase from "@/core/shared/UseCase";
import User from "@/core/user/model/user.interface";
import UserRepository from "./UserRepository";

// Caso de Uso para o usuário

/* Tirar esse tipo daqui */
export type UserData = Pick<User, "email" | "name" | "password">;

export default class CreateUserService implements UseCase<UserData, void> {
  constructor(private readonly repository: UserRepository) {}

  async execute(data: UserData): Promise<void> {
    const { email, password } = data;

    const userIsAlreadyCreated = await this.repository.findByEmail(email);

    if (userIsAlreadyCreated) {
      throw new Error();
    }

    const hash = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 19,
      timeCost: 2,
    });

    await this.repository.createUser({ ...data, password: hash });
  }
}
