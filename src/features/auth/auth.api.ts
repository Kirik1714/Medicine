import { BASE_URL } from "../../shared/api/config";
import type {
  LoginCredentials,
  AuthResponse,
  RegisterCredentials,
  RegisterResponse,
} from "./auth.types";

const AUTH_URL = `${BASE_URL}/auth/login`;
const REGISTER_URL = `${BASE_URL}/users/add`;

const postRequest = async <TRequest, TResponse>(
  url: string,
  body: TRequest,
  errorMessage: string
): Promise<TResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
};

export const loginUserApi = (credential: LoginCredentials): Promise<AuthResponse> => {
  return postRequest<LoginCredentials, AuthResponse>(
    AUTH_URL, 
    credential, 
    "Invalid username or password"
  );
};

export const registerUserApi = (credential: RegisterCredentials): Promise<RegisterResponse> => {
  return postRequest<RegisterCredentials, RegisterResponse>(
    REGISTER_URL, 
    credential, 
    "Registration failed"
  );
};