import { AmendmentChangeType } from '../../constants/enums';
import { ChangeDto } from '../legislation/section.dto';

export interface CreateAmendmentDto {
    title_eng: string;
    title_dzo: string;
    status: string;

    legislationId?: number;
    delegatedLegislationId?: number;

    isPublished: boolean;
    isActive: boolean;

    enactmentDate: string;
    commencementDate: string;
    repealDate: string;

    userId: number;
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

export interface DetermineAmendmentAndCreateChangeDto {
    changeType: AmendmentChangeType;
    amendmentId?: number;
    sectionId?: number;

    clause_eng: string;
    clause_dzo: string;
    type: string;
    order: number;

    topOrder?: number;
    bottomOrder?: number;

    legislationId?: number;
    delegatedLegislationId?: number;
}
