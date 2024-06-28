export type InputCreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export type OutputCreateUserDto = {
  name: string;
  email: string;
  id: string;
};
