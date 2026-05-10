

export type User = {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    user_type: string;
    description: string;
};

export type UserCredentials = {
  username: string;
  email: string;
  avatar?: string;
  password: string;

};

export type UserUpdate = {
  username: string;
  email: string;
  avatar?: string;
  password: string;
  description?: string;
  user_type: string

};

export type UserLogin = {
  username: string;
  password: string;
};