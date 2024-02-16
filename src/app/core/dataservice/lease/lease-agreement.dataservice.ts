import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constants/constants';

@Injectable({
    providedIn: 'root',
})
export class BuildingDetailService {
    apiUrl = API_URL;

    constructor(private http: HttpClient) {}
}
