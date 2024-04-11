import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { AdminLayoutService } from '../service/admin-layout.service';
import { COMPANY_NAME } from 'src/app/core/constants/constants';

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

    constructor(public layoutService: AdminLayoutService) {}
}
