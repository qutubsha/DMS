
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

//export interface IUser {

//    userid: number;
//    email: string;
//    password: string;
//    firstname: string;
//    lastname: string;
//    isactive: boolean;
//}


      

    

    

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