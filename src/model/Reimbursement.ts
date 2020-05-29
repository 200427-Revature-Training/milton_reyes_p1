export class Reimbursement {
    reimbAmount: number;
	reimbSubmitted: Date;
	reimbResolved: Date;
	reimbDescription: string;
	reimbReceipt: string;
	ersReimbursementStatusId: number;
	ersReimbursementTypeId: number;
	reimbAuthor: number;
	reimbResolver: number;

    constructor(
        reimbAmount: number,
	    reimbSubmitted: Date,
	    reimbResolved: Date,
	    reimbDescription: string,
	    reimbReceipt: string,
	    ersReimbursementStatusId: number,
	    ersReimbursementTypeId: number,
	    reimbAuthor: number,
	    reimbResolver: number) {
            this.reimbAmount = reimbAmount;
	        this.reimbSubmitted = reimbSubmitted;
	        this.reimbResolved = reimbResolved;
	        this.reimbDescription = reimbDescription;
	        this.reimbReceipt = reimbReceipt;
	        this.ersReimbursementStatusId = ersReimbursementStatusId;
	        this.ersReimbursementTypeId = ersReimbursementTypeId;
	        this.reimbAuthor = reimbAuthor;
	        this.reimbResolver = reimbResolver;
    }

    static from(obj: ReimbursementRow): Reimbursement {
        const reimbursement = new Reimbursement(
            obj.reimb_amount,
	        obj.reimb_submitted,
	        obj.reimb_resolved,
	        obj.reimb_description,
	        obj.reimb_receipt,
	        obj.ers_reimbursement_status_id,
	        obj.ers_reimbursement_type_id,
	        obj.reimb_author,
	        obj.reimb_resolver);
        return reimbursement;
    }
}

export interface ReimbursementRow {
    reimb_amount: number;
	reimb_submitted: Date;
	reimb_resolved: Date;
	reimb_description: string;
	reimb_receipt: string;
	ers_reimbursement_status_id: number;
	ers_reimbursement_type_id: number;
	reimb_author: number;
	reimb_resolver: number;
}