import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URL } from '../../constants/constants';
import { AUTH_TOKEN_KEY } from '../../constants/api-constants';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = API_URL;
    authTokenKey = AUTH_TOKEN_KEY;

    constructor(private http: HttpClient) {}

    Login(data) {
        console.log('LOGIn');
        return this.http.post(`${this.apiUrl}/auth/login`, data);
    }

    SetAuthToken(token) {
        sessionStorage.setItem(this.authTokenKey, token);
    }

    GetToken() {
        return sessionStorage.getItem(this.authTokenKey);
    }
}
