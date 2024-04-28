import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LegislationDto } from '../../dto/legislation/legislation.dto';
import { PaginatedData } from '../../dto/utility/paginated-data.dto';
import {
    CreateSectionDto,
    InsertSectionDto,
    SectionDto,
    UpdateSectionDto,
} from '../../dto/legislation/section.dto';

@Injectable({
    providedIn: 'root',
})
export class SectionDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    GetTableOfContentByLegislation(
        legislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/section/toc/by-legislation/${legislationId}`
        );
    }

    //***************** */ PUBLIC ROUTES

    PublicGetSectionsByLegislation(
        legislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/p/legislation/sections/${legislationId}`
        );
    }

    PublicGetSectionsByDelegatedLegislation(
        delegatedLegislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/p/delegated-legislation/sections/${delegatedLegislationId}`
        );
    }
    PublicGetTOCByDelegatedLegislation(
        delegatedLegislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/p/delegated-legislation/toc/${delegatedLegislationId}`
        );
    }

    // ********************* ADMIN ROUTES
    AdminGetSectionsByLegislation(
        legislationId: number
    ): Observable<SectionDto[]> {
        return this.http.get<SectionDto[]>(
            `${this.apiUrl}/section/legislation/${legislationId}`
        );
    }

    AdminDeleteSection(sectionId: number) {
        return this.http.delete(`${this.apiUrl}/section/${sectionId}`);
    }

    AdminUpdateSection(id: number, data: UpdateSectionDto) {
        return this.http.patch(`${this.apiUrl}/section/${id}`, data);
    }

    AdminCreateNewSection(data: CreateSectionDto) {
        return this.http.post(`${this.apiUrl}/section`, data);
    }

    AdminInsertNewDraftSection(data: InsertSectionDto) {
        return this.http.post(`${this.apiUrl}/section/insert`, data);
    }
}
