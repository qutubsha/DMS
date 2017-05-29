export interface IUser {

    UserID: number;
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IsActive: boolean;
}
export class User implements IUser {
    constructor(
        public UserID: number,
        public UserName: string,
        public Password: string,
        public FirstName: string,
        public LastName: string,
        public IsActive: boolean

    ) { }
}

export interface IUserRegistration {
    UserID: number;
    UserName: string;
    Password: string;
    RepeatPassword: string;
    FirstName: string;
    LastName: string;
    Email: string;
}

export class UserRegistration implements IUserRegistration {
    constructor(
        public UserID: number,
        public UserName: string,
        public Password: string,
        public RepeatPassword: string,
        public FirstName: string,
        public LastName: string,
        public Email: string

    ) { }
}