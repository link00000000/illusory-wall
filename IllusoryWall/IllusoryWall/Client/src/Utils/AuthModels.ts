export interface Credentials {
    username: string
    password: string
}

export enum AuthorizationLevel {
    None = 0,
    User = 1,
    Admin = 2
}
