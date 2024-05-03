export interface LegislationStatisticsSummaryDto {
    current: number;
    repealed: number;
    bills: number;
    ammendments: number;
    conventions: number;
    total: number;
}

export interface DelegatedLegislationStatisticsSummaryDto {
    drafts: number;
    current: number;
    revoked: number;
    modified: number;
    total: number;
}
