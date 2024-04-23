// has-role.guard.ts
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../dataservice/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const expectedRole = route.data['roles'];
        const currentUserRole = this.authService.getDecodedTokenObject().role;
        console.log('EXPECETD', expectedRole);
        console.log('current', currentUserRole);
        console.log(expectedRole, currentUserRole);
        console.log(expectedRole.includes(currentUserRole));
        if (expectedRole.includes(currentUserRole)) {
            return true;
        } else {
            this.router.navigate(['/unauthorized']);
            return false;
        }
    }
}
