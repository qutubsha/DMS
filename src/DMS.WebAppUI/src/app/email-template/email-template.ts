
export interface ITemplate {
   
    TemplateName: string;
    EmailSubject: string;
    EmailBody: string;
   
}

export class Template implements ITemplate {

    constructor(
      
        public TemplateName: string,
        public EmailSubject: string,
       public EmailBody: string,
       
    )
    { }
}