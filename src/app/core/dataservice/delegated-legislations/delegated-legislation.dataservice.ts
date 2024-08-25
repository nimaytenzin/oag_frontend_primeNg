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
export class DelegatedLegislationDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new
    GetAllDelegatedLegislationByParentLegislation(
        parentLegislationId: number
    ): Observable<DelegatedLegislationDto[]> {
        return this.http.get<DelegatedLegislationDto[]>(
            `${this.apiUrl}/delegated-legislation/parentLegislation/${parentLegislationId}`
        );
    }

    //***************ADMIN ROUTES */
    AdminGetDraftDelegatedLegisaltionsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<DelegatedLegislationDto>> {
        const { page, pageSize, startsWith } = options;
        let params = new HttpParams();
        if (page) {
            params = params.set('page', page);
        }
        if (pageSize) {
            params = params.set('limit', pageSize.toString());
        }
        if (startsWith) {
            params = params.set('startsWith', startsWith);
        }

        return this.http.get<PaginatedData<DelegatedLegislationDto>>(
            `${this.apiUrl}/delegated-legislation/p/draft`,
            {
                params,
            }
        );
    }

    AdminGetDelegatedLegislationDetails(
        delegatedLegislationId: number
    ): Observable<DelegatedLegislationDto> {
        return this.http.get<DelegatedLegislationDto>(
            `${this.apiUrl}/delegated-legislation/${delegatedLegislationId}`
        );
    }
    // ************************* PUBLIC ROUTES
    PublicGetDelegatedLegislationDetails(
        delegatedLegislationId: number
    ): Observable<DelegatedLegislationDto> {
        return this.http.get<DelegatedLegislationDto>(
            `${this.apiUrl}/p/delegated-legislation/${delegatedLegislationId}`
        );
    }

    PublicGetCurrentDelegatedLegislationsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<DelegatedLegislationDto>> {
        const { page, pageSize, startsWith } = options;
        let params = new HttpParams();
        if (page) {
            params = params.set('page', page);
        }
        if (pageSize) {
            params = params.set('limit', pageSize.toString());
        }
        if (startsWith) {
            params = params.set('startsWith', startsWith);
        }

        return this.http.get<PaginatedData<DelegatedLegislationDto>>(
            `${this.apiUrl}/p/delegated-legislations/current`,
            {
                params,
            }
        );
    }

    PublicGetModifiedDelegatedLegislationsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<DelegatedLegislationDto>> {
        const { page, pageSize, startsWith } = options;
        let params = new HttpParams();
        if (page) {
            params = params.set('page', page);
        }
        if (pageSize) {
            params = params.set('limit', pageSize.toString());
        }
        if (startsWith) {
            params = params.set('startsWith', startsWith);
        }

        return this.http.get<PaginatedData<DelegatedLegislationDto>>(
            `${this.apiUrl}/p/delegated-legislations/modified`,
            {
                params,
            }
        );
    }

    PublicGetRevokedDelegatedLegislationsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<DelegatedLegislationDto>> {
        const { page, pageSize, startsWith } = options;
        let params = new HttpParams();
        if (page) {
            params = params.set('page', page);
        }
        if (pageSize) {
            params = params.set('limit', pageSize.toString());
        }
        if (startsWith) {
            params = params.set('startsWith', startsWith);
        }

        return this.http.get<PaginatedData<DelegatedLegislationDto>>(
            `${this.apiUrl}/p/delegated-legislations/revoked`,
            {
                params,
            }
        );
    }
}
