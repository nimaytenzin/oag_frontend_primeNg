import { AmendmentChangeType } from '../../constants/enums';
import { AmendmentDto } from '../ammendment/ammendment.dto';
import { StashedSectionDto } from '../ammendment/commit.dto';
import { LegislationDto } from './legislation.dto';

export interface SectionDto {
    id: number;
    clause_eng: string;
    clause_dzo: string;
    order: number;
    type: string;
    legislationId?: number;
    delegatedLegislationId?: number;
    stash?: StashedSectionDto;
    legislation?: LegislationDto;
    changes?: ChangeDto[];
    softDelete: boolean;
}

export interface ChangeDto {
    id: number;
    changeType: AmendmentChangeType;
    amendmentId: number;
    amendment?: AmendmentDto;
    sectionId?: number;
    legislationId?: number;
    delegatedLegislationId?: number;
    changeValues: ChangeValueDto[];
}

export interface ChangeValueDto {
    attribute: string;
    newValue: string;
    oldValue: string;
}
export interface CreateSectionDto {
    clause_eng: string;
    clause_dzo?: string;
    type: string;
    legislationId?: number | null;
    delegatedLegislationId?: number | null;
}

export interface InsertSectionDto {
    topOrder: number;
    bottomOrder: number;
    clause_eng: string;
    clause_dzo?: string;
    type: string;
    legislationId?: number;
    delegatedLegislationId?: number;
}

export interface UpdateSectionDto {
    clause_eng?: string;
    clause_dzo?: string;
    type?: string;
}
