import {
    LegislationStatus,
    LegislationType,
    SectionChangeType,
    SectionType,
} from '../../constants/enums';
import { LegislationDto } from '../legislation/legislation.dto';
import { SectionDto } from '../legislation/section.dto';

export interface CommitDraftLegislationDto {
    commitType: string;
    draftLegislationId: number;
    commitTitle: string;
    commitMessage: string;
    commitDate: string;
    legislationStatus?: string;
    userId: number;
}

export interface CommitDraftDelegatedLegislationDto {
    commitType: string;
    commitTitle: string;
    commitMessage: string;
    commitDate: string;
    legislationStatus: string;
    delegatedLegislationId?: number | null;
    userId: number;
    draftDelegatedLegislationId: number;
}

export interface CommitLegislationDto {
    commitType: string;
    legislationId: number;
    commitTitle: string;
    commitMessage: string;
    commitDate: string;
    legislationStatus?: string;
    userId: number;
}

export interface CommitDto {
    id: number;
    commitTitle: string;
    commitType: string;
    commitMessage: string;
    commitDate: string;
    user: CommitUserDto;
}

export interface CommitUserDto {
    fullName: string;
    email: string;
}

export interface StashSectionUpsertDto extends SectionDto {
    sectionId: number | null;

    changeType: SectionChangeType;
}

export interface StashedSectionDto {
    id: number;
    changeType: SectionChangeType;
    clause_eng: string;
    clause_dzo: string;
    sectionId: number;
    legislationId: number;
    type: SectionType;
    createdAt: string;
    updatedAt: string;
}

export interface StashLegislationUpsertDto extends LegislationDto {
    legislationId: number | null;
}

export interface StashedLegislationDto {
    id: number;
    title_eng: string;
    title_dzo: string;
    status: LegislationStatus;
    description_eng: string;
    description_dzo: string;
    type: LegislationType;
    createdAt: string;
    updatedAt: string;
}
