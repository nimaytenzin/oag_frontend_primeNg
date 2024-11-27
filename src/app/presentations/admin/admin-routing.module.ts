import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './home/dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layouts/admin/admin/admin-layout.component';
import { AdminListCurrentLegislationsComponent } from './list/published/legislations/admin-list-current-legislations/admin-list-current-legislations.component';
import { AdminListAmendmentsComponent } from './list/published/legislations/admin-list-amendments/admin-list-amendments.component';
import { AdminListBilledLegislationsComponent } from './list/published/legislations/admin-list-billed-legislations/admin-list-billed-legislations.component';
import { AdminListRepealedLegislationsComponent } from './list/published/legislations/admin-list-repealed-legislations/admin-list-repealed-legislations.component';
import { AdminListConventionsComponent } from './list/published/legislations/admin-list-conventions/admin-list-conventions.component';
import { AdminUserProfileComponent } from './users/admin-user-profile/admin-user-profile.component';
import { AdminUserAllComponent } from './users/admin-user-all/admin-user-all.component';
import { AdminSearchModuleComponent } from './home/admin-search-module/admin-search-module.component';
import { AdminListDraftLegislationsComponent } from './list/drafts/list/admin-list-draft-legislations/admin-list-draft-legislations.component';
import { AdminListDraftDelegatedLegislationsComponent } from './list/drafts/list/admin-list-draft-delegated-legislations/admin-list-draft-delegated-legislations.component';
import { AdminListDraftConventionsComponent } from './list/drafts/list/admin-list-draft-conventions/admin-list-draft-conventions.component';
import { AdminListDraftAmendmentsComponent } from './list/drafts/list/admin-list-draft-amendments/admin-list-draft-amendments.component';
import { AdminViewDelegatedLegislationComponent } from './view/admin-view-delegated-legislation/admin-view-delegated-legislation.component';
import { AdminViewDraftAmendmentComponent } from './view/admin-view-draft-amendment/admin-view-draft-amendment.component';
import { AdminListCurrentDelegatedLegislationsComponent } from './list/published/delegated legislations/admin-list-current-delegated-legislations/admin-list-current-delegated-legislations.component';
import { AdminListRevokedDelegatedLegislationsComponent } from './list/published/delegated legislations/admin-list-revoked-delegated-legislations/admin-list-revoked-delegated-legislations.component';
import { AdminViewLegislationComponent } from './view/admin-view-legislation/admin-view-legislation.component';

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
                        path: 'delegated-legislations',
                        component: AdminListDraftDelegatedLegislationsComponent,
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
                path: 'view',
                children: [
                    {
                        path: 'legislation/:legislationId',
                        component: AdminViewLegislationComponent,
                    },
                    {
                        path: 'delegated-legislation/:delegatedLegislationId',
                        component: AdminViewDelegatedLegislationComponent,
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
                path: 'delegated-legislations',
                children: [
                    {
                        path: 'current',
                        component:
                            AdminListCurrentDelegatedLegislationsComponent,
                    },

                    {
                        path: 'revoked',
                        component:
                            AdminListRevokedDelegatedLegislationsComponent,
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
