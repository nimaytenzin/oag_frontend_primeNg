import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layouts/admin/admin/admin-layout.component';
import { AdminListCurrentLegislationsComponent } from './legislations/list/admin-list-current-legislations/admin-list-current-legislations.component';
import { AdminListAmendmentsComponent } from './legislations/list/admin-list-amendments/admin-list-amendments.component';
import { AdminListBilledLegislationsComponent } from './legislations/list/admin-list-billed-legislations/admin-list-billed-legislations.component';
import { AdminListRepealedLegislationsComponent } from './legislations/list/admin-list-repealed-legislations/admin-list-repealed-legislations.component';
import { AdminListConventionsComponent } from './legislations/list/admin-list-conventions/admin-list-conventions.component';
import { AdminUserProfileComponent } from './users/admin-user-profile/admin-user-profile.component';
import { AdminUserAllComponent } from './users/admin-user-all/admin-user-all.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: AdminDashboardComponent,
            },

            {
                path: 'legislations',
                children: [
                    {
                        path: 'current',
                        component: AdminListCurrentLegislationsComponent,
                    },
                    {
                        path: 'amendments',
                        component: AdminListAmendmentsComponent,
                    },
                    {
                        path: 'bills',
                        component: AdminListBilledLegislationsComponent,
                    },
                    {
                        path: 'repealed',
                        component: AdminListRepealedLegislationsComponent,
                    },
                ],
            },
            {
                path: 'international-conventions',
                component: AdminListConventionsComponent,
            },
            {
                path: 'user',
                children: [
                    {
                        path: 'profile',
                        component: AdminUserProfileComponent,
                    },
                    {
                        path: 'all',
                        component: AdminUserAllComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
