import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { SectionDto } from '../../dto/legislation/section.dto';

@Injectable({
    providedIn: 'root',
})
export class SectionDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new
    GetAllSectionsByLegislation(
        legislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/section/by-legislation/${legislationId}`
        );
    }

    GetTableOfContentByLegislation(
        legislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/section/toc/by-legislation/${legislationId}`
        );
    }
}
