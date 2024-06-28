import { UserRepository } from "../../domain/repositories/UserRepository";
import { AuthService } from "../services/AuthService";
import { PasswordService } from "../services/PasswordService";

export class AuthUseCases {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private passwordService: PasswordService
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (
      user &&
      (await this.passwordService.comparePasswords(password, user.password))
    ) {
      return this.authService.genetateToken(user.id, user.name);
    }
    return null;
  }

  async verifyToken(token: string): Promise<any> {
    return this.authService.verifyToken(token);
  }
}
