export interface LoginCredentials{
    username:string,
    password:string
}
export interface AuthResponse{
    id:number,
    username:string,
    email:string,
    firstName:string,
    lastName:string,
    gender:string,
    image:string,
    token:string,
}

export interface RegisterCredentials{
    username:string,
    email:string,
    password:string,
}

export interface RegisterResponse{
    id:number,
    username:number,
    email:string,
}