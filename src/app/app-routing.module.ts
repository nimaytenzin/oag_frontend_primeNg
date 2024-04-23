import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './presentations/layouts/admin/admin/admin-layout.component';
import { HasRoleGuard } from './core/guards/role.gaurd';
import { UnathorizedPageComponent } from './presentations/pages/unathorized-page/unathorized-page.component';
import { USERROLES } from './core/constants/enums';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: () =>
                        import(
                            './presentations/public/public-routing.module'
                        ).then((m) => m.PublicRoutingModule),
                },
                {
                    path: 'unauthorized',
                    component: UnathorizedPageComponent,
                },

                {
                    path: 'admin',
                    loadChildren: () =>
                        import(
                            './presentations/admin/admin-routing.module'
                        ).then((m) => m.AdminRoutingModule),
                    canActivate: [HasRoleGuard], // Apply the guard here
                    data: { roles: [USERROLES.ADMIN, USERROLES.SUPERADMIN] },
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./presentations/auth/auth-routing.module').then(
                            (m) => m.AuthRoutingModule
                        ),
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
