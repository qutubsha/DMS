
export interface ITemplate {
   
    EmailTemplateName: string;
    EmailSubject: string;
    EmailBody: string;
   
}

export class Template implements ITemplate {

    constructor(
      
        public EmailTemplateName: string,
        public EmailSubject: string,
       public EmailBody: string,
       
    )
    { }
}