import {
  InputCreateUserDto,
  OutputCreateUserDto,
} from "../../application/dto/CreateUserDto";
import User from "../entities/User";

// ---> NOTA: Define a interface para o repositório de usuários.

export interface UserRepository {
  create(user: InputCreateUserDto): Promise<OutputCreateUserDto>;
  findUserByEmail(email: string): Promise<User | null>;
  getHashedPasswordByEmail(email: string): Promise<any>;
  /* findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>; */
}
