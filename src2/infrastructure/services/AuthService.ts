import jwt from "jsonwebtoken";

/* TODO - salvar token e expiração em env */
export class AuthService {
  constructor(private jwtSecret: string, private expiresIn: string) {}

  async genetateToken(userId: string, userName: string): Promise<string> {
    return jwt.sign({ id: userId, name: userName }, this.jwtSecret, {
      expiresIn: this.expiresIn,
    });
  }
  /* TODO - tipar any */
  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }
}
