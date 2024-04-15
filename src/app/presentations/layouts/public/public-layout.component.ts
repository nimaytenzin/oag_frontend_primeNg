import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PublicFooterComponent } from './public-footer/public-footer.component';
import { PublicNavbarComponent } from './public-navbar/public-navbar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [
        PublicFooterComponent,
        PublicNavbarComponent,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './public-layout.component.html',
    styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {
    constructor(private router: Router) {}

    isLoginPage(): boolean {
        return this.router.url === 'auth/login';
    }
}
