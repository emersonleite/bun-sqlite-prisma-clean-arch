import bcrypt from "bcrypt";

export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(password, salt);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
