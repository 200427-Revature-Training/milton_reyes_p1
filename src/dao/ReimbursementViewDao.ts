import { db } from '../dao/db';
import { ReimbursementView, ReimbursementViewRow } from '../model/ReimbursementView';

export async function getReimbursementByStatus(status: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id" \
,r.reimb_amount AS "amount" \
,r.reimb_submitted AS "submitted" \
,r.reimb_resolved AS "resolved" \
,r.reimb_description AS "description" \
,r.reimb_receipt AS "receipt" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver" \
,ers_reimbursement_type.reimb_type \
,ers_reimbursement_status.reimb_status \
FROM (SELECT * FROM ers_reimbursement) r \
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id \
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id \
WHERE ers_reimbursement_status.reimb_status = $1`;
    const result = await db.query<ReimbursementViewRow>(sql, [status]);
    return result.rows;
}

export async function getReimbursementsByType(type: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id" \
,r.reimb_amount AS "amount" \
,r.reimb_submitted AS "submitted" \
,r.reimb_resolved AS "resolved" \
,r.reimb_description AS "description" \
,r.reimb_receipt AS "receipt" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver" \
,ers_reimbursement_type.reimb_type \
,ers_reimbursement_status.reimb_status \
FROM (SELECT * FROM ers_reimbursement) r \
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id \
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id \
WHERE ers_reimbursement_type.reimb_type = $1`;
    const result = await db.query<ReimbursementViewRow>(sql, [type]);
    return result.rows;
}

export async function getReimbursementsByStatusAndType(status: string, type: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id" \
,r.reimb_amount AS "amount" \
,r.reimb_submitted AS "submitted" \
,r.reimb_resolved AS "resolved" \
,r.reimb_description AS "description" \
,r.reimb_receipt AS "receipt" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_author) AS "author" \
,(SELECT ers_users.ers_username FROM ers_users WHERE ers_users.id = r.reimb_resolver) AS "resolver" \
,ers_reimbursement_type.reimb_type \
,ers_reimbursement_status.reimb_status \
FROM (SELECT * FROM ers_reimbursement) r \
LEFT JOIN ers_reimbursement_type ON r.ers_reimbursement_type_id  = ers_reimbursement_type.id \
LEFT JOIN ers_reimbursement_status ON r.ers_reimbursement_status_id  = ers_reimbursement_status.id \
WHERE ers_reimbursement_status.reimb_status = 'Pending' and ers_reimbursement_type.reimb_type = 'FOOD'`;
    const result = await db.query<ReimbursementViewRow>(sql, [status, type]);
    return result.rows;
}
