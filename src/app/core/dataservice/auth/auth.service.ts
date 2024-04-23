import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../../dto/users-auth/jwtToken.dto';
import { LoginDto } from '../../dto/users-auth/login.dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    login(credentials: LoginDto): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login`, credentials);
    }

    getToken(): string {
        return localStorage.getItem('oag_token');
    }
    setToken(token: string) {
        return localStorage.setItem('oag_token', token);
    }

    getDecodedTokenObject(): JwtDto | null {
        const token = this.getToken();
        if (token) {
            const decoded = jwtDecode(token) as JwtDto;
            return decoded;
        }

        return null;
    }

    getRole() {
        return this.getDecodedTokenObject()?.role;
    }

    isTokenExpired(): boolean {
        if (this.getToken() === null) return true;
        const expiry = this.getDecodedTokenObject()?.exp!;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    signOut() {
        return localStorage.removeItem('oag_token');
    }
}
