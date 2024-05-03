import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'app-public-navbar',
    standalone: true,
    imports: [
        MenubarModule,
        ButtonModule,
        CommonModule,
        SidebarModule,
        TieredMenuModule,
    ],
    templateUrl: './public-navbar.component.html',
    styleUrl: './public-navbar.component.scss',
})
export class PublicNavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    sidebarVisible: boolean = false;

    makeNavBarBlock = [
        'legislations',
        'delegated-legisaltions',
        'international-conventions',
        '/help',
    ].includes(this.router.url);

    constructor(private router: Router, private route: ActivatedRoute) {}

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

    onHomePage() {
        return this.router.url === '/';
    }
}
