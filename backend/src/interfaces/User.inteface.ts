import { JwtPayload } from "jsonwebtoken";

export interface UserInterface extends AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  carGroup?: unknown;
  isTester: boolean;
  isActive: boolean;
  role: string;
  hideProfile: boolean;
  avatar: string;
  allowPersonalDocuments: boolean;
  timezone: string;
  isPremium: boolean;
}

export interface AuthUser {
  email: string;
  username: string;
  password: string;
}

export interface decodedToken extends JwtPayload {
  id: number;
}
