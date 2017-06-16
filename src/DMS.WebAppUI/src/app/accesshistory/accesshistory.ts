
/* Defines the IAccessHistory entity */
export interface IAccessHistory {
    HistoryId: number,
    DocumentId: number;
    PerformedOn: string;
    PerformedBy: number;
    PerformedByName: string;
    Action: string
}

export class AccessHistory implements IAccessHistory {
    constructor(
        public HistoryId: number,
        public DocumentId: number,
        public PerformedOn: string,
        public PerformedBy: number,
        public PerformedByName: string,
        public Action: string       
    ) { }
}