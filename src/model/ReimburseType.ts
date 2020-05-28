export class ReimburseType {
    reimburseType: string;

    constructor(reimburseType:string) {
        this.reimburseType = reimburseType;
    }

    static from(obj: ReimburseTypeRow): ReimburseType {
        const reimburseType = new ReimburseType(obj.reimb_type);
        return reimburseType;
    }
}

export interface ReimburseTypeRow {
    reimb_type: string;
}