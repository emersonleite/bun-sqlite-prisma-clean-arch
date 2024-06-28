import { UserRepository } from "../../domain/repositories/UserRepository";
import { InputCreateUserDto, OutputCreateUserDto } from "../dto/CreateUserDto";
import { PasswordService } from "../services/PasswordService";

// ---> NOTA: contém a lógica de negócios para usuários

export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async createUser({
    email,
    name,
    password,
  }: InputCreateUserDto): Promise<OutputCreateUserDto | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      const hashPassword = await this.passwordService.hashPassword(password);
      const user = await this.userRepository.create({
        password: hashPassword,
        name,
        email,
      });

      return { email: user.email, id: user.id, name: user.name };
    }
    return null;
  }

  /*  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async comparePasswords(email: string, password: string) {
    const hashedPassword = await this.userRepository.getHashedPasswordByEmail(
      email
    );

    return this.passwordService.comparePasswords(
      password,
      hashedPassword.password
    );
  } */

  /* async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  } */

  /* async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  } */

  /* async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  } */

  /* async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  } */
}
