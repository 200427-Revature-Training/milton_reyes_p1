export class ReimburseStatus {
    reimburseStatus: string;

    constructor(reimburseStatus:string) {
        this.reimburseStatus = reimburseStatus;
    }

    static from(obj: ReimburseStatusRow): ReimburseStatus {
        const reimburseStatus = new ReimburseStatus(obj.reimb_status);
        return reimburseStatus;
    }
}

export interface ReimburseStatusRow {
    reimb_status: string;
}