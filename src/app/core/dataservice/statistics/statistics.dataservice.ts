import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { SectionDto } from '../../dto/legislation/section.dto';
import {
    DelegatedLegislationStatisticsSummaryDto,
    LegislationStatisticsSummaryDto,
} from '../../dto/statistics/legislation-stats.dto';
@Injectable({
    providedIn: 'root',
})
export class StatisticsDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    GetLegislationStatisticsSummary(): Observable<LegislationStatisticsSummaryDto> {
        return this.http.get<LegislationStatisticsSummaryDto>(
            `${this.apiUrl}/statistics/p/legislations`
        );
    }

    GetDelegatedLegislationStatisticsSummary(): Observable<DelegatedLegislationStatisticsSummaryDto> {
        return this.http.get<DelegatedLegislationStatisticsSummaryDto>(
            `${this.apiUrl}/statistics/p/delegated-legislations`
        );
    }
}
