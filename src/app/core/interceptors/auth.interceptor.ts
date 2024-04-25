import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../dataservice/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (request.url.includes('/admin')) {
            // If the token is expired, redirect to login
            if (this.authService.isTokenExpired()) {
                this.router.navigate(['/auth/login']);
            }
        }

        const authToken = this.authService.getToken();
        const authRequest = request.clone({
            headers: request.headers.set(
                'Authorization',
                `Bearer ${authToken}`
            ),
        });
        return next.handle(authRequest);
    }
}
