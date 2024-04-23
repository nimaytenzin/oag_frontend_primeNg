export interface PublishedLegislationStatisticsSummaryDto {
    current: number;
    repealed: number;
    bills: number;
    ammendments: number;
    conventions: number;
}

export interface PublishedDelegatedLegislationStatisticsSummaryDto {
    current: number;
    revoked: number;
    modified: number;
}
