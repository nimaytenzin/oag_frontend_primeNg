import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { LoginDto } from 'src/app/core/dto/users-auth/login.dto';

@Component({
    selector: 'app-public-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        DividerModule,
        CheckboxModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './public-login.component.html',
    styleUrl: './public-login.component.scss',
})
export class PublicLoginComponent {
    rememberMe: boolean = false;
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        if (!this.authService.isTokenExpired()) {
            this.router.navigate(['/admin/']);
        }
    }

    login() {
        this.router.navigate(['/admin/']);
    }
}
