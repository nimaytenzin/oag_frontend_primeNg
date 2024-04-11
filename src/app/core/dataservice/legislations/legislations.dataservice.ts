import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';

@Injectable({
    providedIn: 'root',
})
export class LegislationDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new

    GetLatestLegislations(number: number): Observable<LegislationDto[]> {
        return this.http.get<LegislationDto[]>(
            `${this.apiUrl}/legislation/latest/legislation?number=${number}`
        );
    }

    GetAllLegislations(
        options: {
            page?: number;
            pageSize?: number;
            startingCharacter?: string;
            effectiveYear?: number;
        } = {}
    ): Observable<LegislationDto[]> {
        const {
            page = 1,
            pageSize = 10,
            startingCharacter,
            effectiveYear,
        } = options;

        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        if (startingCharacter) {
            params = params.set('startsWith', startingCharacter);
        }

        if (effectiveYear) {
            params = params.set('publishedIn', effectiveYear.toString());
        }
        return this.http.get<LegislationDto[]>(`${this.apiUrl}/legislation`, {
            params,
        });
    }

    GetLegislationDetails(id: number): Observable<LegislationDto> {
        return this.http.get<LegislationDto>(
            `${this.apiUrl}/legislation/${id}`
        );
    }

    //  ****************************  PUBLIC ROUTES ***************************//
    PublicGetCurrentLegislationsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<LegislationDto>> {
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

        return this.http.get<PaginatedData<LegislationDto>>(
            `${this.apiUrl}/p/legislations/current`,
            {
                params,
            }
        );
    }

    PublicGetRepealedLegislationsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<LegislationDto>> {
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

        return this.http.get<PaginatedData<LegislationDto>>(
            `${this.apiUrl}/p/legislations/repealed`,
            {
                params,
            }
        );
    }

    PublicGetBillsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<LegislationDto>> {
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

        return this.http.get<PaginatedData<LegislationDto>>(
            `${this.apiUrl}/p/legislations/bill`,
            {
                params,
            }
        );
    }

    PublicGetInternationalConventionsPaginated(
        options: {
            page?: number;
            pageSize?: number;
            startsWith?: string;
        } = {}
    ): Observable<PaginatedData<LegislationDto>> {
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

        return this.http.get<PaginatedData<LegislationDto>>(
            `${this.apiUrl}/p/conventions`,
            {
                params,
            }
        );
    }
}
