
export interface ITemplate {
    EmailTemplateId: number;
    TemplateName: string;
    Subject: string;
    Body: string;
    UpdatedBy: string;
    UpdatedOn: string;
    IsActive: boolean;
    Active: string;
    UserId: number;
}

export class Template implements ITemplate {

    constructor(
        public EmailTemplateId: number,
        public TemplateName: string,
       public  Subject: string,
       public Body: string,
       public UpdatedBy: string,
       public UpdatedOn: string,
       public IsActive: boolean,
       public Active: string,
       public UserId: number
    )
    { }
}