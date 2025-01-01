export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    username?: string;
    image?: string;
    country?: string;
    profession?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserForLogIn {
    email: string;
    password: string;
}