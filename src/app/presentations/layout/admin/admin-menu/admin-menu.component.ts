import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AdminLayoutService } from '../service/admin-layout.service';

@Component({
    selector: 'app-admin-menu',
    templateUrl: './admin-menu.component.html',
})
export class AdminMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: AdminLayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin'],
                    },
                ],
            },
            {
                label: 'Properties',
                items: [
                    {
                        label: 'Properties',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/admin/master-properties'],
                    },
                ],
            },

            {
                label: 'Users',
                items: [
                    {
                        label: 'Landlords',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/admin/master-users/landlords'],
                    },
                    {
                        label: 'Tenants',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/admin/master-users/tenants'],
                    },
                    {
                        label: 'Admins',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/admin/master-users/admins'],
                    },
                ],
            },
            {
                label: 'Transactions',
                items: [
                    {
                        label: 'Dzongkhags',
                        icon: 'pi pi-fw pi-th-large',
                        routerLink: ['/admin/master-dzongkhags'],
                    },
                    {
                        label: 'Admnistrative Zones',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/admin/master-admzones'],
                    },
                    {
                        label: 'Sub Adminstrative Zones',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/admin/master-subadmzones'],
                    },
                    {
                        label: 'Median Rents',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/admin/master-medianrents'],
                    },
                ],
            },
        ];
    }
}
