import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { ToastModule } from 'primeng/toast';

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
        MessagesModule,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './public-login.component.html',
    styleUrl: './public-login.component.scss',
})
export class PublicLoginComponent {
    rememberMe: boolean = false;
    email: string = 'kwangyel@gmail.com';
    password: string = 'overlord123';
    messages: Message[] | undefined;

    constructor(
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Login Saved',
            detail: 'Redirecting to admins page',
        });
        // if (!this.authService.isTokenExpired()) {
        //     this.messageService.add({
        //         severity: 'success',
        //         summary: 'Login Saved',
        //         detail: 'Redirecting to admins page',
        //     });
        //     setTimeout(() => {
        //         this.router.navigate(['/admin/']);
        //     }, 1000);
        // }
    }

    login() {
        this.authService
            .login({
                email: this.email,
                password: this.password,
            })
            .subscribe({
                next: (res) => {
                    if (res.statusCode === 200) {
                        this.authService.setToken(res.token);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'User authenticated! Welcome to Depository Admin interface',
                        });
                        this.router.navigate(['/admin']);
                    }
                },
                error: (err) => {},
            });
    }
}
