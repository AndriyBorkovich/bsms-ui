import {Role} from "./enums";

export interface RegistrationRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthenticateResponse{
  username: string;
  token: string;
}
