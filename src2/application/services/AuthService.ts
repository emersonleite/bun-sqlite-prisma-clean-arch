import jwt from "jsonwebtoken";

/* TODO - salvar token e expiração em env */

export class AuthService {
  private jwtSecret = "14274320";

  async genetateToken(userId: string, userName: string): Promise<string> {
    return jwt.sign({ id: userId, name: userName }, this.jwtSecret, {
      expiresIn: "30m",
    });
  }

  async verifyToken(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }
}
