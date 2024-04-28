import { LanguageType } from '../../constants/enums';

export interface DocumentCopyDto {
    id: number;

    fileUri: string;
    language: LanguageType;

    legislationId?: number;
    delegatedLegislationId?: number;
    amendmentId?: number;
}
export interface CreateDocumentCopyDto {
    file: File;
    language: string;

    legislationId?: number;
    delegatedLegisaltionId?: number;
    amendmentId?: number;
}
