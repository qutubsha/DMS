
/* Defines the Equipment entity */
export interface IAccessHistory {
    HistoryId: number,
    DocumentId: number;
    PerformedOn: string;
    PerformedBy: number;
    Action: string
}

export class AccessHistory implements IAccessHistory {
    constructor(
        public HistoryId: number,
        public DocumentId: number,
        public PerformedOn: string,
        public PerformedBy: number,
        public Action: string       
    ) { }
}