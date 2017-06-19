export interface ITagCount {
    Tag: string,
    Count : number
}

export class TagCount implements ITagCount {
    constructor(
        public Tag: string,
        public Count : number
    ) { }
}
