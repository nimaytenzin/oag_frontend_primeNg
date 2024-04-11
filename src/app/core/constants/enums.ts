export enum SectionType {
    HEADING_1 = 'HEADING_1',
    HEADING_2 = 'HEADING_2',
    HEADING_3 = 'HEADING_3',
    SUBSECTION_H1 = 'SUBSECTION_H1',
    SUBSECTION_H2 = 'SUBSECTION_H2',
    CLAUSE = 'CLAUSE',
}

export enum LegislationType {
    ACT = 'ACT',
    CONVENTION = 'CONVENTION',
}
export enum LegislationStatus {
    BILL = 'BILL',
    ENACTED = 'ENACTED',
    REPEALED = 'REPEALED',
    AMMENDED = 'AMENDED',
}
export enum DelegatedLesiglationTypes {
    RULESANDREGULATION = 'RULES AND REGULATION',
    GUIDELINES = 'GUIDELINES',
    CIRCULAR = 'CIRCULAR',
    NOTIFICATIONS = 'NOTIFICATIONS',
    OTHERS = 'OTHERS',
}

export enum CommitType {
    INTERNAL = 'INTERNAL',
    ENACTMENT = 'ENACTMENT',
    AMENDMENT = 'AMENDMENT',
    REPEALED = 'REPEALED',
}

export enum AttachmentType {
    ENG = 'ENG',
    DZO = 'DZO',
    MISC = 'MISC',
}

export enum AdminSideBarItemType {
    'routerLink' = 'routerLink',
    'h1' = 'h1',
}

export enum LanguageType {
    ENG = 'ENG',
    DZO = 'DZO',
    BI = 'BILINGUAL',
}

export enum DocumentStatus {
    DRAFT = 'DRAFT',
    FINAL = 'PUBLISHED',
}
export enum DocumentType {
    LEGISLATION = 'LEGISLATION',
    DELEGATED_LEGISLATION = 'DELEGATED_LEGISLATION',
}

export enum SectionChangeType {
    CREATION = 'CREATION',
    DELETION = 'DELETION',
    MODIFICATION = 'MODIFICATION',
}

export enum AnnexureType {
    ANNEXURE = 'ANNEXURE',
    NOTES = 'NOTES',
}

export enum EditingModes {
    NORMAL = 'Normal',
    AMENDMENT = 'Amendment',
}

export enum AmendmentChangeType {
    CREATION = 'CREATION',
    DELETION = 'DELETION',
    MODIFICATION = 'MODIFICATION',
}

export enum ChangeValueAttirbutes {
    CLAUSE_ENG = 'clause_eng',
    CLAUSE_DZO = 'clause_dzo',
    ORDER = 'order',
    TYPE = 'type',
}

export enum USERROLES {
    SUPERADMIN = 'superadmin',
    ADMIN = 'admin',
}
