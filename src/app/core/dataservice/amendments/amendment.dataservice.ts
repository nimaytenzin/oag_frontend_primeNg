import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { ChangeDto, SectionDto } from '../../dto/legislation/section.dto';
import { DelegatedLegislationDto } from '../../dto/delegated-legislation/delegated-legislation.dto';
import {
    AmendmentDto,
    CreateAmendmentDto,
    DetermineAmendmentAndCreateChangeDto,
} from '../../dto/ammendment/ammendment.dto';

@Injectable({
    providedIn: 'root',
})
export class AmendmentsDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //new
    AdminGetChangesByAmendments(amendmentId: number): Observable<ChangeDto[]> {
        return this.http.get<ChangeDto[]>(
            `${this.apiUrl}/change/amendment/${amendmentId}`
        );
    }

    AdminGetAmendmentsByLegisaltion(
        legislationId: number
    ): Observable<AmendmentDto[]> {
        return this.http.get<AmendmentDto[]>(
            `${this.apiUrl}/amendment/legislation/${legislationId}`
        );
    }

    AdminCreateNewAmendment(
        data: CreateAmendmentDto
    ): Observable<AmendmentDto> {
        return this.http.post<AmendmentDto>(`${this.apiUrl}/amendment`, data);
    }

    AdminCreateNewSectionAmendment(data: DetermineAmendmentAndCreateChangeDto) {
        return this.http.post(`${this.apiUrl}/amendment/section`, data);
    }
}
