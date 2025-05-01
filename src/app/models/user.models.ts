//Este archivo se utiliza para darle un tipado predeterminado a los objetos que se utilizan en el login.component.ts
export interface User {
    name: string;
    username: string;
}
  
export interface SearchUsersResponse {
    success: boolean;
    users: User[];
}
  