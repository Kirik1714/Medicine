export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
}

export interface BaseUserProfile {
  id: number;
  username: string;
  email: string;
}

export type RegisterResponse = BaseUserProfile;

export interface AuthResponse extends BaseUserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
