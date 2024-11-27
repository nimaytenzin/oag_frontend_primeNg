import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { USERROLES } from 'src/app/core/constants/enums';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { JwtDto } from 'src/app/core/dto/users-auth/jwtToken.dto';
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
    userData: JwtDto;

    constructor(private authservice: AuthService) {
        this.userData = this.authservice.getDecodedTokenObject();
    }

    updateProfile() {
        const userData = {
            fullName: this.userData.fullName,
            email: this.userData.email,
        };
    }

    openChangePasswordModal() {}
}
