import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { USERROLES } from 'src/app/core/constants/enums';
import { UserDto } from 'src/app/core/dto/users-auth/user.dto';

@Component({
    selector: 'app-admin-user-profile',
    standalone: true,
    imports: [
        ImageModule,
        FormsModule,
        CommonModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './admin-user-profile.component.html',
    styleUrl: './admin-user-profile.component.scss',
})
export class AdminUserProfileComponent {
    userData: UserDto = {
        fullName: 'Nima Yoezer Tenzin',
        email: 'nimaytenzin@gmail.com',
        role: USERROLES.ADMIN,
    };
}
