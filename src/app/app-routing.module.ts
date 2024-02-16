import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './presentations/layout/admin/admin-layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: () =>
                        import('./presentations/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },

                {
                    path: 'admin',
                    component: AdminLayoutComponent,
                    children: [
                        // {
                        //     path: '',
                        //     loadChildren: () =>
                        //         import(
                        //             './presentations/admin/admin-dashboard/admin-dashboard.module'
                        //         ).then((m) => m.AdminDashboardModule),
                        // },
                        {
                            path: 'master-properties',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/properties/admin-master-properties-routing.module'
                                ).then(
                                    (m) => m.AdminMasterPropertiesRoutingModule
                                ),
                        },
                        {
                            path: 'master-locations',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/locations/admin-master-locations-routing.module'
                                ).then(
                                    (m) => m.AdminMasterPropertiesRoutingModule
                                ),
                        },
                        {
                            path: 'master-users',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/users/admin-master-users-routing.module'
                                ).then((m) => m.AdmingMasterUsersRoutingModule),
                        },

                        {
                            path: 'master-lease',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/lease/admin-master-lease-agreements-routing.module'
                                ).then(
                                    (m) =>
                                        m.AdminMasterLeaseAgreementsRoutingModule
                                ),
                        },
                    ],
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
