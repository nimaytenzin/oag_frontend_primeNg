import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { LoginDto } from 'src/app/core/dto/users-auth/login.dto';

@Component({
    selector: 'app-public-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './public-login.component.html',
    styleUrl: './public-login.component.scss',
})
export class PublicLoginComponent {
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit(): void {
        if (!this.authService.isTokenExpired()) {
            this.router.navigate(['/admin/']);
        }
    }
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    login() {
        if (this.loginForm.valid) {
            const data: LoginDto = {
                email: this.loginForm.controls.email.value!,
                password: this.loginForm.controls.password.value!,
            };
            this.authService.login(data).subscribe(
                (res) => {
                    console.log(res);
                    if (res.statusCode == 200) {
                        localStorage.setItem('oag_token', res.token);
                        this.router.navigate(['/admin/']);
                    } else {
                    }
                },
                (error) => {}
            );
        } else {
        }
    }
}
