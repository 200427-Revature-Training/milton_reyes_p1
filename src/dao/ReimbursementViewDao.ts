import { db } from '../dao/db';
import { ReimbursementView, ReimbursementViewRow } from '../model/ReimbursementView';

export async function getReimbursementByStatus(status: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id"\
,r.reimb_amount AS "amount"\
,r.reimb_submitted AS "submitted"\
,r.reimb_resolved AS "resolved"\
,r.reimb_description AS "description"\
,r.reimb_receipt AS "receipt"\
,r.reimb_author AS "author"\
,r.reimb_resolver AS "resolver"\
,ers.reimb_status AS "status"\
,ert.reimb_type AS "type"\
FROM (SELECT * FROM ers_reimbursement) r\
,(SELECT * FROM ers_reimbursement_status ers WHERE ers.reimb_status = $1) ers\
,(SELECT * FROM ers_reimbursement_type ert) ert\
LEFT JOIN ers_reimbursement_status ON ers_reimbursement_status.id = (SELECT r.ers_reimbursement_status_id FROM ers_reimbursement r)\
LEFT JOIN ers_reimbursement_type ON ers_reimbursement_type.id = (SELECT r.ers_reimbursement_type_id FROM ers_reimbursement r)`;
    const result = await db.query<ReimbursementViewRow>(sql, [status]);
    return result.rows;
}

export async function getReimbursementsByType(type: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id"\
,r.reimb_amount AS "amount"\
,r.reimb_submitted AS "submitted"\
,r.reimb_resolved AS "resolved"\
,r.reimb_description AS "description"\
,r.reimb_receipt AS "receipt"\
,r.reimb_author AS "author"\
,r.reimb_resolver AS "resolver"\
,ers.reimb_status AS "status"\
,ert.reimb_type AS "type"\
FROM (SELECT * FROM ers_reimbursement) r\
,(SELECT * FROM ers_reimbursement_status ers) ers\
,(SELECT * FROM ers_reimbursement_type ert WHERE ert.reimb_type = $1) ert\
LEFT JOIN ers_reimbursement_status ON ers_reimbursement_status.id = (SELECT r.ers_reimbursement_status_id FROM ers_reimbursement r)\
LEFT JOIN ers_reimbursement_type ON ers_reimbursement_type.id = (SELECT r.ers_reimbursement_type_id FROM ers_reimbursement r)`;
    const result = await db.query<ReimbursementViewRow>(sql, [type]);
    return result.rows;
}

export async function getReimbursementsByStatusAndType(status: string, type: string): Promise<ReimbursementView[]> {
    const sql = `SELECT r.id AS "reimb_id"\
,r.reimb_amount AS "amount"\
,r.reimb_submitted AS "submitted"\
,r.reimb_resolved AS "resolved"\
,r.reimb_description AS "description"\
,r.reimb_receipt AS "receipt"\
,r.reimb_author AS "author"\
,r.reimb_resolver AS "resolver"\
,ers.reimb_status AS "status"\
,ert.reimb_type AS "type"\
FROM (SELECT * FROM ers_reimbursement) r\
,(SELECT * FROM ers_reimbursement_status ers WHERE ers.reimb_status = 'Pending') ers\
,(SELECT * FROM ers_reimbursement_type ert WHERE ert.reimb_type = 'LODGING') ert\
LEFT JOIN ers_reimbursement_status ON ers_reimbursement_status.id = (SELECT r.ers_reimbursement_status_id FROM ers_reimbursement r)\
LEFT JOIN ers_reimbursement_type ON ers_reimbursement_type.id = (SELECT r.ers_reimbursement_type_id FROM ers_reimbursement r)`;
    const result = await db.query<ReimbursementViewRow>(sql, [status, type]);
    return result.rows;
}
