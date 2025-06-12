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
                    {
                        label: 'Search Module',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/admin/search'],
                    },
                ],
            },

            {
                label: 'Draft',
                items: [
                    {
                        label: 'Legislations',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/admin/draft/legislations'],
                    },
                    {
                        label: 'Delegated Legislations',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/admin/draft/delegated-legislations'],
                    },
                    {
                        label: 'International Conventions',
                        icon: 'pi pi-fw pi-file-edit',
                        routerLink: ['/admin/draft/conventions'],
                    },
                ],
            },

            {
                label: 'Published Legislations',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/legislations/current'],
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
                label: 'Published Delegated Legislations',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/delegated-legislations/current'],
                    },

                    {
                        label: 'Revoked',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/delegated-legislations/revoked'],
                    },
                ],
            },
            {
                label: 'Published International Conventions',
                items: [
                    {
                        label: 'Current',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/international-conventions'],
                    },
                ],
            },

            {
                label: 'Others',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/admin/user/profile'],
                    },
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/user/all'],
                    },
                    {
                        label: 'Feedbacks',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/admin/user/view-feedbacks'],
                    },
                ],
            },
        ];
    }
}
