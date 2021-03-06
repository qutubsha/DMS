﻿
export interface IUser {

    UserId: number;
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IsActive: boolean;
}
export class User implements IUser {
    constructor(
        public UserId: number,
        public Email: string,
        public Password: string,
        public FirstName: string,
        public LastName: string,
        public IsActive: boolean

    ) { }
}

export interface IUserRegistration {
    UserId: number;
    UserName: string;
    Password: string;
    RepeatPassword: string;
    FirstName: string;
    LastName: string;
    Email: string;
}
export class UserRegistration implements IUserRegistration {
    constructor(
        public UserId: number,
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

export interface IUserDetails {

    Roles:IRole[]
    UserId: number;
    FirstName: string;
    LastName: string;
    UserName: string;
    Password: string;
    Email: string;
    IsActive: boolean;
    IsDeleted: boolean;
    CreatedBy: string;


}
export class EditUserDetails implements IUserDetails {
    constructor(
        public Roles: IRole[],
        public UserId: number,
        public UserName: string,
        public Password: string,
        public RepeatPassword: string,
        public FirstName: string,
        public LastName: string,
        public Email: string,        
        public IsActive: boolean,
        public IsDeleted: boolean,
        public CreatedBy: string

    ) { }
}

export interface IRole {
    RoleId: number;
    RoleName: string;
    IsActive: boolean;
    CreatedOn: string;
    UpdatedOn: string;
   
}

export interface IUserImage {
    ImageID: number;
    Image1: any;
    ContentType: string;
    FileName: string;
    CreatedOn: string;
    ConvertedImage: string;
}

export class UserImage implements IUserImage {
    constructor(
        public ImageID: number,
        public Image1: any,
        public ContentType: string,
        public FileName: string,
        public CreatedOn: string,
        public ConvertedImage: string
    ) { }
}

export interface FileReaderEventTarget extends EventTarget {
    result: string
}
export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
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