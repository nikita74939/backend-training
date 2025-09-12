export interface ILoginResponse{
    token: string;
    admin: IAdminResponse;
}

export interface IAdminResponse {
    id: number;
    username: string;
    email: string;
    name: string;
}
