import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SectionDto } from '../../dto/legislation/section.dto';

export interface SearchInLegislationDto {
    keyword: string;
    legislationId: number;
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
}
