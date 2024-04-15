import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-public-navbar',
    standalone: true,
    imports: [MenubarModule, ButtonModule],
    templateUrl: './public-navbar.component.html',
    styleUrl: './public-navbar.component.scss',
})
export class PublicNavbarComponent implements OnInit {
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
                        label: 'FAQs',
                        icon: 'pi pi-fw pi-user-plus',
                    },
                    {
                        label: 'Technical Guide',
                        icon: 'pi pi-fw pi-user-minus',
                        routerLink: ['help/technical-guide'],
                    },
                ],
            },
        ];
    }

    // this.items = [
    //     {
    //         label: 'Home',
    //         routerLink: ['/'],
    //     },
    //     {
    //         label: 'Legislations',
    //         icon: 'pi pi-fw pi-file',
    //         items: [
    //             [
    //                 {
    //                     label: 'Current',
    //                     routerLink: ['legislations/current'],
    //                 },
    //                 {
    //                     label: 'Ammended',
    //                     routerLink: ['legislations/ammended'],
    //                 },
    //                 {
    //                     label: 'Repealed',
    //                     routerLink: ['legislations/repealed'],
    //                 },
    //                 {
    //                     label: 'Bills',
    //                     routerLink: ['legislations/billed'],
    //                 },
    //             ],
    //         ],
    //     },
    //     {
    //         label: 'Delegated Legislations',
    //         icon: 'pi pi-fw pi-file',
    //         items: [
    //             [
    //                 {
    //                     label: 'Delegated Legislations',
    //                     items: [
    //                         { label: 'Current' },
    //                         { label: 'Modified' },
    //                         { label: 'Revoked' },
    //                     ],
    //                 },
    //             ],
    //         ],
    //     },
    //     {
    //         label: 'International Conventions',
    //         icon: 'pi pi-fw pi-calendar',
    //     },
    //     {
    //         label: 'Help',
    //         icon: 'pi pi-fw pi-cog',
    //         items: [
    //             [
    //                 {
    //                     label: 'General',
    //                     items: [
    //                         { label: 'Setting 1.1' },
    //                         { label: 'Setting 1.2' },
    //                     ],
    //                 },
    //             ],
    //             [
    //                 {
    //                     label: 'Site Map',
    //                     items: [
    //                         { label: 'Setting 4.1' },
    //                         { label: 'Setting 4.2' },
    //                     ],
    //                 },
    //             ],
    //         ],
    //     },
    // ];
    // }
}
