import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './home/dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layouts/admin/admin/admin-layout.component';
import { AdminListCurrentLegislationsComponent } from './published/list/admin-list-current-legislations/admin-list-current-legislations.component';
import { AdminListAmendmentsComponent } from './published/list/admin-list-amendments/admin-list-amendments.component';
import { AdminListBilledLegislationsComponent } from './published/list/admin-list-billed-legislations/admin-list-billed-legislations.component';
import { AdminListRepealedLegislationsComponent } from './published/list/admin-list-repealed-legislations/admin-list-repealed-legislations.component';
import { AdminListConventionsComponent } from './published/list/admin-list-conventions/admin-list-conventions.component';
import { AdminUserProfileComponent } from './users/admin-user-profile/admin-user-profile.component';
import { AdminUserAllComponent } from './users/admin-user-all/admin-user-all.component';
import { AdminSearchModuleComponent } from './home/admin-search-module/admin-search-module.component';
import { AdminListDraftLegislationsComponent } from './drafts/list/admin-list-draft-legislations/admin-list-draft-legislations.component';
import { AdminListDraftDelegatedLegislationsComponent } from './drafts/list/admin-list-draft-delegated-legislations/admin-list-draft-delegated-legislations.component';
import { AdminListDraftConventionsComponent } from './drafts/list/admin-list-draft-conventions/admin-list-draft-conventions.component';
import { AdminListDraftAmendmentsComponent } from './drafts/list/admin-list-draft-amendments/admin-list-draft-amendments.component';
import { AdminViewDraftLegislationComponent } from './drafts/view/admin-view-draft-legislation/admin-view-draft-legislation.component';
import { AdminViewDraftDelegatedLegislationComponent } from './drafts/view/admin-view-draft-delegated-legislation/admin-view-draft-delegated-legislation.component';
import { AdminViewDraftAmendmentComponent } from './drafts/view/admin-view-draft-amendment/admin-view-draft-amendment.component';

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
                path: 'search',
                component: AdminSearchModuleComponent,
            },
            {
                path: 'draft',
                children: [
                    {
                        path: 'legislations',
                        component: AdminListDraftLegislationsComponent,
                    },
                    {
                        path: 'legislation/:legislationId',
                        component: AdminViewDraftLegislationComponent,
                    },
                    {
                        path: 'delegated-legislations',
                        component: AdminListDraftDelegatedLegislationsComponent,
                    },
                    {
                        path: 'delegated-legislation/:delegatedLegislationId',
                        component: AdminViewDraftDelegatedLegislationComponent,
                    },
                    {
                        path: 'conventions',
                        component: AdminListDraftConventionsComponent,
                    },

                    {
                        path: 'amendments',
                        component: AdminListDraftAmendmentsComponent,
                    },
                    {
                        path: 'amendment/:amendmentId',
                        component: AdminViewDraftAmendmentComponent,
                    },
                ],
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
