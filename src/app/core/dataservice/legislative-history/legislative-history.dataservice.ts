import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { SectionDto } from '../../dto/legislation/section.dto';
import { DelegatedLegislationDto } from '../../dto/delegated-legislation/delegated-legislation.dto';

@Injectable({
    providedIn: 'root',
})
export class LegislativeHistoryDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new
    GetLegislationsSortedByLegislationGroup(
        legislationGroupId: number
    ): Observable<LegislationDto[]> {
        let params = new HttpParams().set('groupId', legislationGroupId);
        return this.http.get<LegislationDto[]>(
            `${this.apiUrl}/legislation/history/sort`,
            {
                params,
            }
        );
    }
}
