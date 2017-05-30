export interface IUser {

    UserID: number;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IsActive: boolean;
}
export class User implements IUser {
    constructor(
        public UserID: number,
        public Email: string,
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

export class UpdatePassword implements IUpdatePassword {
    constructor(
       
        public oldPwd: string,
        public newPwd: string,
        public RepeatPassword: string,
        public eMail: string

    ) { }
}

export interface IUpdatePassword {
  
    oldPwd: string;
    RepeatPassword: string;
    newPwd: string;
    eMail: string;
}