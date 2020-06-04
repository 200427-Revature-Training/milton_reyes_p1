export class ReimbursementView {

	amount: number;
	submitted: Date;
	resolved: Date;
	description: string;
	receipt: string;
	author: number;
	resolver: number;
	status: string;
	type: string;

	constructor(amount: number,
		submitted: Date,
		resolved: Date,
		description: string,
		receipt: string,
		author: number,
		resolver: number,
		status: string,
		type: string) {
			this.amount = amount;
            this.submitted = submitted;
            this.resolved = resolved;
            this.description = description;
			this.receipt = receipt;
			this.author = author;
			this.resolver = resolver;
			this.status = status;
			this.type = type;
    }
    
    static from(obj: ReimbursementViewRow): ReimbursementView {
        const reimbursementView = new ReimbursementView(
            obj.amount,
	        obj.submitted,
	        obj.resolved,
	        obj.description,
	        obj.receipt,
	        obj.author,
            obj.resolver,
            obj.status,
	        obj.type);
        return reimbursementView;
	}
}

export interface ReimbursementViewRow {
	amount: number;
	submitted: Date;
	resolved: Date;
	description: string;
	receipt: string;
	author: number;
	resolver: number;
	status: string;
	type: string;
}