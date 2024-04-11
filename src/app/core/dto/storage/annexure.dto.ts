export interface AnnexureDto {
  id: number;
  refId: number;
  title_eng: string;
  title_dzo: string;
  fileUri_eng: string;
  fileUri_dzo: string;
  type: string;
}

export interface CreateAnnexureDto {
  refId: number;
  title_eng: string;
  title_dzo: string;
  file_eng: File;
  file_dzo: File;
  legislationType: string;
  annexureType: string;
}
