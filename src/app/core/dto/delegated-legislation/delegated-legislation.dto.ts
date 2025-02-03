import {
    DelegatedLegislationStatus,
    DelegatedLesiglationTypes,
    LegislationStatus,
} from '../../constants/enums';
import { AmendmentDto } from '../ammendment/ammendment.dto';
import { LegislationDto } from '../legislation/legislation.dto';

export interface DelegatedLegislationDto {
    id: number;
    title_eng: string;
    title_dzo: string;
    description_eng: string;
    description_dzo: string;
    status: LegislationStatus;
    type?: DelegatedLesiglationTypes;
    legislationId?: number;
    createdAt?: string;
    updatedAt?: string;
    legislation?: LegislationDto;
    documentYear: number;

    tabledDate?: string;
    enactmentDate?: string;
    amendmentDate?: string;
    repealDate?: string;

    delegatedLegislationGroupId: number;

    isActive: boolean;
    isPublished: boolean;
    amendments?: AmendmentDto[];
    creatorId:number;
}

export interface UpdateDelegatedLegislationDto {
    title_eng?: string;
    title_dzo?: string;
    description_eng?: string;
    description_dzo?: string;
    status?: DelegatedLegislationStatus;
    type?: DelegatedLesiglationTypes;
    documentYear?: number;

    tabledDate?: string;
    enactmentDate?: string;
    amendmentDate?: string;
    repealDate?: string;
}
