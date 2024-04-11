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
                        routerLink: ['/admin/'],
                    },
                ],
            },
            {
                label: 'Legislations',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/legislations/current'],
                    },
                    {
                        label: 'Amendments',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/legislations/amendments'],
                    },
                    {
                        label: 'Bills',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/legislations/bills'],
                    },
                    {
                        label: 'Repealed',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/legislations/repealed'],
                    },
                ],
            },
            {
                label: 'Delegated Legislations',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                    },
                    {
                        label: 'Modifications',
                        icon: 'pi pi-fw pi-file',
                    },
                    {
                        label: 'Revoked',
                        icon: 'pi pi-fw pi-file',
                    },
                ],
            },
            {
                label: 'International Conventions',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                    },
                ],
            },

            {
                label: 'Drafts',
                items: [
                    {
                        label: 'Legislations',
                        icon: 'pi pi-fw pi-file-edit',
                    },
                    {
                        label: 'Delegated Legislations',
                        icon: 'pi pi-fw pi-file-edit',
                    },
                    {
                        label: 'International Conventions',
                        icon: 'pi pi-fw pi-file-edit',
                    },
                ],
            },

            {
                label: 'Others',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user',
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-users',
                    },
                    {
                        label: 'Global Settings',
                        icon: 'pi pi-fw pi-cog',
                    },
                    {
                        label: 'Technical Documentation',
                        icon: 'pi pi-fw pi-file',
                    },
                ],
            },
        ];
    }
}
