
import { ReimbursementViewRow } from '../model/ReimbursementView';
import * as reimbursementViewDao from '../dao/ReimbursementViewDao';

export function getReimbursementByStatus(status: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementByStatus(status);
}

export function getReimbursementsByType(type: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementsByType(type);
}

export function getReimbursementsByStatusAndType(status: string, type: string): Promise<ReimbursementViewRow[]> {
    return reimbursementViewDao.getReimbursementsByStatusAndType(status, type);
}
