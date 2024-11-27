import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { AdminLayoutService } from '../service/admin-layout.service';
import { COMPANY_NAME } from 'src/app/core/constants/constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { UserDto } from 'src/app/core/dto/users-auth/user.dto';

@Component({
    selector: 'app-admin-topbar',
    templateUrl: './admin-topbar.component.html',
    styleUrls: ['./admin-topbar.component.css'],
})
export class AdminTopbarComponent {
    items!: MenuItem[];
    companyName = COMPANY_NAME;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    user: any;

    constructor(
        public layoutService: AdminLayoutService,
        private router: Router,
        private authService: AuthService
    ) {
        this.user = this.authService.getDecodedTokenObject();
        console.log('TOP BAR', this.user);
    }

    logout() {
        this.router.navigate(['/auth/login']);
    }
    getFirstCharacter() {
        return this.user.fullName.charAt(0);
    }
}
