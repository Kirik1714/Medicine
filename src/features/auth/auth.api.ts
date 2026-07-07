import { BASE_URL } from "../../shared/api/config";
import type {LoginCredentials,AuthResponse,RegisterCredentials,RegisterResponse} from "./auth.types"

const AUTH_URL = `${BASE_URL}/auth/login`;
const REGISTER_URL = `${BASE_URL}/users/add`; 

export const loginUserApi = async(credential:LoginCredentials):Promise<AuthResponse>=>{
    const response = await fetch(AUTH_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(credential)
    });
    if(!response.ok){
        throw new Error("Invalid username or password");
        
    }
    return response.json()

}

export const registerUserApi = async(credential:RegisterCredentials):Promise<RegisterResponse>=>{
    const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credential)
  });
  if (!response.ok) throw new Error("Registration failed");
  return response.json();
}