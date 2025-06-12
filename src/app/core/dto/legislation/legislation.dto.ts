// import { LegislationStatus } from '../../constants/enums';
// import { AmendmentDto } from '../amendment.dto';
// import { UserDto } from '../create-user.dto';
// import { SectionDto } from './section.dto';

import { LegislationStatus } from '../../constants/enums';

export interface PaginatedLegislationDto {
    count: number;
    data: LegislationDto[];
    previousPage: number | null;
    firstPage: number;
    currentPage: number;
    lastPage: number;
    nextPage: number | null;
    pageSize: number;
    totalPage: number;
}

export interface CreateFeedbackDTO {
    title: string;
    text: string;
    name?: string;
    email?: string;
    contact?: string;
}
export interface FeedbackDTO {
    id:number;
    title: string;
    text: string;
    name?: string;
    email?: string;
    contact?: string;
}

export interface LegislationDto {
    id: number;
    title_eng: string;
    title_dzo: string;

    type: string;
    status: LegislationStatus;
    isPublished: boolean;
    documentYear: number;

    tabledDate?: string;
    enactmentDate?: string;
    commencementDate?: string;

    amendmentDate?: string;
    repealDate?: string;

    creatorId: number;
    // creator?: UserDto;

    // sections?: SectionDto[];
    legislationGroupId: number;

    updatedAt?: string;
    createdAt?: string;
    isActive: boolean;

    // amendments?: AmendmentDto[];
}

export interface CreateLegislationDto {
    title_eng: string;
    title_dzo: string;

    isPublished: boolean;
    type: string;
    status: string;
    creatorId: number;

    tabledDate?: string;
    enactmentDate?: string;
    commencementDate?: string;
    repealDate?: string;

    documentYear: number;

    legislationGroupId?: number;
    isActive: boolean;
}

export interface UpdateLegislationDto {
    id?: number;
    title_eng?: string;
    title_dzo?: string;

    isPublished?: boolean;
    type?: string;
    status?: string;
    creatorId?: number;

    documentYear?: number;

    tabledDate?: string;
    enactmentDate?: string;
    commencementDate?: string;
    amendmentDate?: string;
    repealDate?: string;

    legislationId?: number;
    isActive?: boolean;
}

export interface CreateLegislationRelationshipDto {
    actingLegislationId: number;
    action: string;
    affectedLegislationId: number;
    mode: string;
}
