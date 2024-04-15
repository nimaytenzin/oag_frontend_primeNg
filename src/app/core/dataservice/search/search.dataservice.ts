import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SectionDto } from '../../dto/legislation/section.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';

export interface SearchInLegislationDto {
    keyword: string;
    legislationId: number;
}
export interface SearchInDelegatedLegislationDto {
    keyword: string;
    delegatedLegislationId: number;
}
@Injectable({
    providedIn: 'root',
})
export class SearchService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new
    SearchInLegislation(
        data: SearchInLegislationDto
    ): Observable<SectionDto[]> {
        return this.http.post<SectionDto[]>(
            `${this.apiUrl}/section/search-in-legislation`,
            data
        );
    }

    //***************** PUBLIC ROUTES
    PublicSearchInLegislation(
        data: SearchInLegislationDto
    ): Observable<SectionDto[]> {
        return this.http.post<SectionDto[]>(
            `${this.apiUrl}/section/search-in-legislation`,
            data
        );
    }
    PublicSearchInDelegatedLegislation(
        data: SearchInDelegatedLegislationDto
    ): Observable<SectionDto[]> {
        return this.http.post<SectionDto[]>(
            `${this.apiUrl}/p/delegated-legislation/search`,
            data
        );
    }

    PublicSearchForKeywordInLegislations(options: {
        keywords: string;
        searchIn: string;
        searchWithin: string;
    }): Observable<PaginatedData<SectionDto>> {
        const { keywords, searchIn, searchWithin } = options;

        let params = new HttpParams()
            .set('Keywords', keywords.toString())
            .set('In', searchIn.toString())
            .set('Within', searchWithin.toString());

        return this.http.get<PaginatedData<SectionDto>>(
            `${this.apiUrl}/p/legislations/adv/search`,
            {
                params,
            }
        );
    }
}
