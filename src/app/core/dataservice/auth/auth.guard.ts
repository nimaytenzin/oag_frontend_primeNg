import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const decodedTokenObject = this.authService.getDecodedTokenObject();
    if (decodedTokenObject) {
      if (!this.authService.isTokenExpired()) {
        const userRole = this.authService.getRole();
        if (
          userRole === 'admin' &&
          childRoute.data['roles'].includes('admin')
        ) {
          return true;
        } else if (
          userRole === 'superadmin' &&
          childRoute.data['roles'].includes('superadmin')
        ) {
          return true;
        }
      } else {
        this.toast.error('Session Expired! Please Log in again!');
        this.router.navigate(['/login']);
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
