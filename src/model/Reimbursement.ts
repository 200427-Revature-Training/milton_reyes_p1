export class Reimbursement {
    ersReimbursementname: string;
    ersPassword: string;
    reimbursementFirstName: string;
    reimbursementLastName: string;
    reimbursementEmail: string;
    ersReimbursementRoleId: number;

    constructor(
        ersReimbursementname:string,
        ersPassword: string,
        reimbursementFirstName: string,
        reimbursementLastName: string,
        reimbursementEmail: string,
        ersReimbursementRoleId: number) {
            this.ersReimbursementname = ersReimbursementname;
            this.ersPassword = ersPassword;
            this.reimbursementFirstName = reimbursementFirstName;
            this.reimbursementLastName = reimbursementLastName;
            this.reimbursementEmail = reimbursementEmail;
            this.ersReimbursementRoleId = ersReimbursementRoleId;
    }

    static from(obj: ReimbursementRow): Reimbursement {
        const reimbursement = new Reimbursement(
            obj.ers_reimbursementname,
            obj.ers_password,
            obj.reimbursement_first_name,
            obj.reimbursement_last_name,
            obj.reimbursement_email,
            obj.ers_reimbursement_role_id);
        return reimbursement;
    }
}

export interface ReimbursementRow {
    reimb_amount: number;
	reimb_submitted: Date;
	reimb_resolved timestamp NOT NULL,
	reimb_description varchar(250) NOT NULL,
	reimb_receipt varchar(100) NOT NULL UNIQUE,
	ers_reimbursement_status_id int4 NOT NULL,
	ers_reimbursement_type_id int4 NOT NULL,
	reimb_author int4 NOT NULL,
	reimb_resolver int4
}