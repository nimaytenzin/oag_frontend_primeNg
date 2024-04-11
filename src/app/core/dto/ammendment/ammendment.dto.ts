import { ChangeDto } from '../legislation/section.dto';

export interface CreateAmendmentDto {
    title_eng: string;
    title_dzo: string;
    remarks_eng: string;
    remarks_dzo: string;
    amendmentDate: string;
    legislationId?: number;
    delegatedLegislationId?: number;
}

export interface CreateSectionAmendmentDto {
    sectionId: number;
    changeType: string;
    type: string;
    clause_eng: string;
    clause_dzo: string;
    amendmentId: number;
    legislationId?: number;
    delegatedLegislationId?: number;
}

export interface AmendmentDto {
    id: number;
    title_eng: string;
    remarks_eng: string;
    title_dzo: string;
    remarks_dzo: string;
    amendmentDate: string;
    legislationId?: number;
    delegatedLegislationId?: number;
    changes: ChangeDto[];
}
