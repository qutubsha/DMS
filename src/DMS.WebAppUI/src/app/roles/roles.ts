
export interface IRole {
    RoleId: number;
    RoleName: string;
    IsActive: boolean;
    CreatedOn: string;
    UpdatedOn: string;
}

export class Role implements IRole {
    constructor(
        public RoleId: number,
        public RoleName: string,
        public IsActive: boolean,
        public CreatedOn: string,
        public UpdatedOn: string
    ) { }
}

export interface IRight {
    RightId: number;
    RightName: string;
}

export class Right implements IRight {
    constructor(
        public RightId: number,
        public RightName: string
    ) { }
}