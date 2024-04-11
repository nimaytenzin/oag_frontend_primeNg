import { LanguageType } from '../../constants/enums';

export interface DocumentCopyDto {
    id: number;
    refId: number;
    fileUri: string;
    language: LanguageType;
    status: string;
    type: string;
}
export interface CreateDraftDocumentCopyDto {
    refId: number;
    file: File;
    language: string;
    status: string;
    type: string;
}
