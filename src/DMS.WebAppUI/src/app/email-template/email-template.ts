
export interface ITemplate {
   
    EmailTemplateName: string;
    EmailSubject: string;
    EmailBody: string;
    IsActive: boolean;
    UpdatedBy: string;
///DateTime ? UpdatedOn { get; set; }
}

export class Template implements ITemplate {

    constructor(
      
        public EmailTemplateName: string,
        public EmailSubject: string,
        public EmailBody: string,
        public IsActive: boolean,
        public UpdatedBy: string
    )
    { }
}