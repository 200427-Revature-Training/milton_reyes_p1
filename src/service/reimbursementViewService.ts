
import { ReimbursementViewRow } from '../model/ReimbursementView';
import * as reimbursementViewDao from '../dao/ReimbursementViewDao';
import { Reimbursement, ReimbursementRow } from '../model/Reimbursement';

export function getReimbursementByStatus(status: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementByStatus(status);
}

export function getReimbursementsByType(type: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementsByType(type);
}

export function getReimbursementsByStatusAndType(status: string, type: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementsByStatusAndType(status, type);
}

/* Financial Manager Views */
export function getAllReimbursements(): Promise<ReimbursementRow[]> {
    return reimbursementViewDao.getAllReimbursements();
}

export function getAllPendingReimbursements(): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getAllPendingReimbursements()
}

export function getAllPendingReimbursementsByAuthor(author:string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getAllPendingReimbursementsByAuthor(author);
}
