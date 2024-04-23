import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-unathorized-page',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './unathorized-page.component.html',
    styleUrl: './unathorized-page.component.scss',
})
export class UnathorizedPageComponent {
    constructor(private router: Router) {}
    goHome() {
        this.router.navigate(['/']);
    }
}
