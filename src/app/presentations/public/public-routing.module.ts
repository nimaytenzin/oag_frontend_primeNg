import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeComponent } from './home/public-home/public-home.component';
import { PublicLayoutComponent } from '../layouts/public/public-layout.component';
import { PublicListBilledLegislationsComponent } from './legislations/list/public-list-billed-legislations/public-list-billed-legislations.component';
import { PublicListRepealedLegislationsComponent } from './legislations/list/public-list-repealed-legislations/public-list-repealed-legislations.component';
import { PublicListAmmendedLegislationsComponent } from './legislations/list/public-list-ammended-legislations/public-list-ammended-legislations.component';
import { PublicListCurrentLegislationsComponent } from './legislations/list/public-list-current-legislations/public-list-current-legislations.component';
import { PublicViewLegislationComponent } from './legislations/view/public-view-legislation/public-view-legislation.component';
import { PublicListConventionsComponent } from './legislations/list/public-list-conventions/public-list-conventions.component';
import { PublicListCurrentDelegatedLegislationsComponent } from './delegated-legislations/list-delegated-legislations/public-list-current-delegated-legislations/public-list-current-delegated-legislations.component';
import { PublicListRevokedDelegatedLegislationsComponent } from './delegated-legislations/list-delegated-legislations/public-list-revoked-delegated-legislations/public-list-revoked-delegated-legislations.component';
import { PublicListModifiedDelegatedLegislationsComponent } from './delegated-legislations/list-delegated-legislations/public-list-modified-delegated-legislations/public-list-modified-delegated-legislations.component';
import { PublicGuidesTechnicalDescriptionComponent } from './guides/public-guides-technical-description/public-guides-technical-description.component';
import { PublicViewDelegatedLegislationComponent } from './delegated-legislations/view-delegated-legislations/public-view-delegated-legislation/public-view-delegated-legislation.component';
import { PublicHomeSearchResultsComponent } from './home/public-home-search-results/public-home-search-results.component';

const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: PublicHomeComponent,
                    },
                    {
                        path: 'search',
                        component: PublicHomeSearchResultsComponent,
                    },
                ],
            },

            {
                path: 'legislations',
                children: [
                    {
                        path: 'current',
                        component: PublicListCurrentLegislationsComponent,
                    },
                    {
                        path: 'ammended',
                        component: PublicListAmmendedLegislationsComponent,
                    },
                    {
                        path: 'bills',
                        component: PublicListBilledLegislationsComponent,
                    },
                    {
                        path: 'repealed',
                        component: PublicListRepealedLegislationsComponent,
                    },
                    {
                        path: 'view/:legislationId',
                        component: PublicViewLegislationComponent,
                    },
                ],
            },
            {
                path: 'international-conventions',
                component: PublicListConventionsComponent,
            },
            {
                path: 'help',
                children: [
                    {
                        path: 'technical-guide',
                        component: PublicGuidesTechnicalDescriptionComponent,
                    },
                ],
            },

            {
                path: 'delegated-legislations',
                children: [
                    {
                        path: 'current',
                        component:
                            PublicListCurrentDelegatedLegislationsComponent,
                    },
                    {
                        path: 'revoked',
                        component:
                            PublicListRevokedDelegatedLegislationsComponent,
                    },
                    {
                        path: 'modified',
                        component:
                            PublicListModifiedDelegatedLegislationsComponent,
                    },
                    {
                        path: 'view/:delegatedLegislationId',
                        component: PublicViewDelegatedLegislationComponent,
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
export class PublicRoutingModule {}
