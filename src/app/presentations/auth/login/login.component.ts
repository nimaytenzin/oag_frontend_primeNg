import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { LayoutService } from 'src/app/presentations/layouts/admin/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) {}

    login() {
        // this.authService
        //     .Login({
        //         phoneNumber: 17263764,
        //         password: 'overlord123',
        //     })
        //     .subscribe((res: any) => {
        //         console.log(res);
        //         this.authService.SetAuthToken(res.token);
        //         this.router.navigate(['/admin']);
        //     });
        this.router.navigate(['/admin']);
    }
}
