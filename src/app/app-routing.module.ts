import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './presentations/layout/admin/admin-layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'auth',
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
                            path: 'building-inventory',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/admin-building-inventory/admin-building-inventory.module'
                                ).then((m) => m.AdminBuildingInventoryModule),
                        },
                        {
                            path: 'master-medianrents',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/admin-master-medianrent/admin-master-medianrent-routing.module'
                                ).then(
                                    (m) => m.AdminMasterMedianrentRoutingModule
                                ),
                        },

                        {
                            path: 'master-admzones',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/admin-master-administrativezones/admin-master-administrativezones.module'
                                ).then(
                                    (m) =>
                                        m.AdminMasterAdministrativezonesModule
                                ),
                        },
                        {
                            path: 'master-subadmzones',
                            loadChildren: () =>
                                import(
                                    './presentations/admin/admin-master-sub-administrativezones/admin-master-sub-administrativezones.module'
                                ).then(
                                    (m) =>
                                        m.AdminMasterSubAdministrativezonesModule
                                ),
                        },
                    ],
                },

                { path: '**', redirectTo: '/notfound' },
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
