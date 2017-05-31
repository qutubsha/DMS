export interface IUser {

    userid: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    isactive: boolean;
}
export class User implements IUser {
    constructor(
        public userid: number,
        public email: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public isactive: boolean

    ) { }
}

export interface IUserRegistration {
    userid: number;
    username: string;
    password: string;
    RepeatPassword: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class UserRegistration implements IUserRegistration {
    constructor(
        public userid: number,
        public username: string,
        public password: string,
        public RepeatPassword: string,
        public firstName: string,
        public lastName: string,
        public email: string

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

export interface IUser {

    userid: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    isactive: boolean;
}


      

    

    

        //public int LoginAttemptCount { get; set; }
        //public bool IsActive { get; set; }
        //public bool IsDeleted { get; set; }

        //public string CreatedBy { get; set; }
        //public DateTime ? CreatedOn { get; set; }

        //public string ModifiedBy { get; set; }
        //public DateTime ? ModifiedOn { get; set; }

        //public string DeletedBy { get; set; }
        //public DateTime ? DeletedOn { get; set; }

        //public DateTime ? LastLoginAttempt { get; set; }

        //public string[] Picture { get; set; }