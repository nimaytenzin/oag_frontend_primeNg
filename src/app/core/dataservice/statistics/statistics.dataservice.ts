import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { SectionDto } from '../../dto/legislation/section.dto';
import { PublishedLegislationStatisticsSummaryDto } from '../../dto/statistics/legislation-stats.dto';

@Injectable({
    providedIn: 'root',
})
export class StatisticsDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    GetPublishedLegislationStatisticsSummary(): Observable<PublishedLegislationStatisticsSummaryDto> {
        return this.http.get<PublishedLegislationStatisticsSummaryDto>(
            `${this.apiUrl}/statistics/p/legislations`
        );
    }
}
