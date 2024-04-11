import { Component } from '@angular/core';
import { PublicFooterComponent } from '../../public/shared/public-footer/public-footer.component';
import { PublicNavbarComponent } from '../../public/shared/public-navbar/public-navbar.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [PublicFooterComponent, PublicNavbarComponent, RouterModule],
    templateUrl: './public-layout.component.html',
    styleUrl: './public-layout.component.scss',
})
export class PublicLayoutComponent {}
