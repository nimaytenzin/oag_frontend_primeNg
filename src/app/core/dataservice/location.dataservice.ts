import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_URL } from './constants';

@Injectable({
    providedIn: 'root',
})
export class LocationDataService {
    apiUrl = API_URL;

    constructor(private http: HttpClient) {}

    GetAllDzonghags() {
        return this.http.get(`${this.apiUrl}/dzongkhag`);
    }

    GetAllThromdesByDzongkhag(dzongkhagId: number) {
        return this.http.get(`${this.apiUrl}/thromde/dzongkhag/${dzongkhagId}`);
    }
    GetAllLocalitiesByThromde(thromdeId: number) {
        return this.http.get(`${this.apiUrl}/locality/thromde/${thromdeId}`);
    }
}
