
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