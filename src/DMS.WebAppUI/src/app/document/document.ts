
/* Defines the IDocument entity */
export interface IDocument {
    CreatedBy: string;
    CreatedOn: string;
    CurrentRevision: number;
    CurrentVersion: number;
    DeletedBy: string;
    DeletedOn: string;
    DocumentId: number;
    Extension: string;
    FileName: string;
    IsDeleted: boolean;
    IsShared: boolean;
    LockedBy: string;
    ModifiedBy: string;
    ModifiedOn: string;
    DocumentData: any;
    DocumentTags: string;
}

export class Document implements IDocument {
    constructor(
        public CreatedBy: string,
        public CreatedOn: string,
        public CurrentRevision: number,
        public CurrentVersion: number,
        public DeletedBy: string,
        public DeletedOn: string,
        public DocumentId: number,
        public Extension: string,
        public FileName: string,
        public IsDeleted: boolean,
        public IsShared: boolean,
        public LockedBy: string,
        public ModifiedBy: string,
        public ModifiedOn: string,
        public DocumentData: any,
        public DocumentTags: string
    ) { }

}