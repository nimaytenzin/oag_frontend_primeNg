import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
    CreateLegislationDto,
    CreateLegislationRelationshipDto,
    LegislationDto,
    UpdateLegislationDto,
} from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import { AmendmentDto } from '../../dto/ammendment/ammendment.dto';

@Injectable({
    providedIn: 'root',
})
export class LegislationRelationshipDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //ADMIN PROTECTED ROUTES
    AdminCreateNewLegislationRelationship(
        data: CreateLegislationRelationshipDto
    ) {
        return this.http.post(`${this.apiUrl}/legislation-relationship`, data);
    }

    AdminGetRepealHistiry(legislatoinId: number) {
        return this.http.get(
            `${this.apiUrl}/legislation/history/${legislatoinId}`
        );
    }

    AdminGetAmendmentsByLegislation(
        legislationId: number
    ): Observable<AmendmentDto[]> {
        return this.http.get<AmendmentDto[]>(
            `${this.apiUrl}/amendment/legislation/${legislationId}`
        );
    }

    //PUBLIC
    PublicGetRepealHistory(legislatoinId: number) {
        return this.http.get(
            `${this.apiUrl}/p/legislation/history/${legislatoinId}`
        );
    }
}
