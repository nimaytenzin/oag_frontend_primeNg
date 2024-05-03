import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-public-navbar2',
    standalone: true,
    imports: [MenubarModule],
    templateUrl: './public-navbar2.component.html',
    styleUrls: ['./public-navbar2.component.scss'],
})
export class PublicNavbar2Component implements OnInit {
    constructor() {}

    items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                routerLink: ['/'],
            },
            {
                label: 'Legislations',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Current',
                        routerLink: ['legislations/current'],
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Ammended',
                    },
                    {
                        label: 'Repealed',
                        routerLink: ['legislations/repealed'],
                    },
                    {
                        label: 'Bills',
                        routerLink: ['legislations/bills'],
                    },
                ],
            },
            {
                label: 'Delegated Legislations',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Current',
                        routerLink: ['delegated-legislations/current'],
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'Modified',
                        routerLink: ['delegated-legislations/modified'],
                    },
                    {
                        label: 'Revoked',
                        routerLink: ['delegated-legislations/revoked'],
                    },
                ],
            },
            {
                label: 'International Conventions',
                icon: 'pi pi-fw pi-file',
                routerLink: ['international-conventions'],
            },

            {
                label: 'Help',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Feedbacks',
                        icon: 'pi pi-fw pi-user-plus',
                    },
                    {
                        label: 'Technical Guide',
                        icon: 'pi pi-fw pi-user-minus',
                        routerLink: ['help/technical-guide'],
                    },
                ],
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/auth/login'],
            },
        ];
    }
}
