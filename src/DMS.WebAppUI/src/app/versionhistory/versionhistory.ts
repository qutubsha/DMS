
/* Defines the IAccessHistory entity */
export interface IVersionHistory {
    DocumentId: number;
    VersionId: number;
    RevisionId: number;
    FileName: string;
    Extension: number;
    What: string;
    Why: string;
}

export class VersionHistory implements IVersionHistory {
    constructor(
        public DocumentId: number,
        public VersionId: number,
        public RevisionId: number,
        public FileName: string,
        public Extension: number,
        public What: string,
        public Why: string     
    ) { }
}