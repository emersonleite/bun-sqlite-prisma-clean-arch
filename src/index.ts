import { Elysia } from "elysia";
import CreateUserService from "./core/user/service/CreateUser.service";
import CreateUserController from "./adapters/controllers/CreateUser.controller";
import UserRepositoryPrismaSqlite from "../prisma/UserRepositoryPrismaSqlite";
import FetchAllUsersService from "./core/user/service/FetchAllUsers.service";
import FetchAllUsersController from "./adapters/controllers/FetchAllUsers.controller";
// import UserRepositoryMemory from "./external/memory/UserRepositoryMemory";
import FetchUserByIdService from "./core/user/service/FetchUserById.service";
import FetchUserByIdController from "./adapters/controllers/FetchUserById.controller";
import DeleteUserByIdService from "./core/user/service/DeleteUserById.service";
import DeleteUserByIdController from "./adapters/controllers/DeleteUserById.controller";
import DeleteAllUsers from "./core/user/service/DeleteAllUsers.service";
import DeleteAllUsersController from "./adapters/controllers/DeleteAllUsers";

const elysia = new Elysia();

//---  Criando repositório (memória)
// const userRepository = new UserRepositoryMemory();

//--- Criando repositório com Prismas + Sqlite
const userRepository = new UserRepositoryPrismaSqlite();

//--- CREATE USER ---
const createUserService = new CreateUserService(userRepository); // Passando repositório criado para o caso de uso
new CreateUserController(elysia, createUserService); // Passando o caso de uso para o controller

//--- FETCH ALL USERS ---
const fetchAllUsersService = new FetchAllUsersService(userRepository);
new FetchAllUsersController(elysia, fetchAllUsersService);

//--- FETCH USER BY ID ---
const fetchUserByIdService = new FetchUserByIdService(userRepository);
new FetchUserByIdController(elysia, fetchUserByIdService);

//--- DELETE USER BY ID ---
const deleteUserByIdService = new DeleteUserByIdService(userRepository);
new DeleteUserByIdController(elysia, deleteUserByIdService);

//--- DELETE USER BY NAME ---
const deleteAllUsersService = new DeleteAllUsers(userRepository);
new DeleteAllUsersController(elysia, deleteAllUsersService);

//--- LISTEN ---
elysia.listen(3001);
console.log(
  `🦊 Elysia is running at ${elysia.server?.hostname}:${elysia.server?.port}`
);
