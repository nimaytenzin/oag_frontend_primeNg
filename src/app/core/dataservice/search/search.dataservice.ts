import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SectionDto } from '../../dto/legislation/section.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { DelegatedLegislationDto } from '../../dto/delegated-legislation/delegated-legislation.dto';

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

    PublicSearchForKeywordInLegislationWithinContent(options: {
        keywords: string;
        pageSize?: number;
        page?: number;
    }): Observable<PaginatedData<SectionDto>> {
        const { keywords, page, pageSize } = options;

        let params = new HttpParams()
            .set('Keywords', keywords.toString())
            .set('limit', pageSize)
            .set('page', page);

        return this.http.get<PaginatedData<SectionDto>>(
            `${this.apiUrl}/p/legislations/adv/search-content`,
            {
                params,
            }
        );
    }
    PublicSearchForKeywordInLegislationWithinTitle(options: {
        keywords: string;
        limit: number;
    }): Observable<PaginatedData<LegislationDto>> {
        const { keywords, limit } = options;

        let params = new HttpParams()
            .set('Keywords', keywords.toString())
            .set('limit', limit);
        return this.http.get<PaginatedData<LegislationDto>>(
            `${this.apiUrl}/p/legislations/adv/search-title`,
            {
                params,
            }
        );
    }

    // Delegated legislation advanced search
    PublicSearchForKeywordInDelegatedLegislationWithinContent(options: {
        keywords: string;
        pageSize?: number;
        page?: number;
    }): Observable<PaginatedData<SectionDto>> {
        const { keywords, page, pageSize } = options;

        let params = new HttpParams()
            .set('Keywords', keywords.toString())
            .set('limit', pageSize)
            .set('page', page);

        return this.http.get<PaginatedData<SectionDto>>(
            `${this.apiUrl}/p/delegated-legislations/adv/search-content`,
            {
                params,
            }
        );
    }
    PublicSearchForKeywordInDelegatedLegislationWithinTitle(options: {
        keywords: string;
        limit: number;
    }): Observable<PaginatedData<DelegatedLegislationDto>> {
        const { keywords, limit } = options;

        let params = new HttpParams()
            .set('Keywords', keywords.toString())
            .set('limit', limit);

        return this.http.get<PaginatedData<DelegatedLegislationDto>>(
            `${this.apiUrl}/p/delegated-legislations/adv/search-title`,
            {
                params,
            }
        );
    }
}
