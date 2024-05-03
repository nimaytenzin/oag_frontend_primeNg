import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DelegatedLegislationRelationshipDataService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl;

    //ADMIN PROTECTED ROUTES

    //PUBLIC
    PublicGetRevokeHistory(legislatoinId: number) {
        return this.http.get(
            `${this.apiUrl}/p/delegated-legislation/history/${legislatoinId}`
        );
    }
}
