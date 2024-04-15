import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './presentations/layouts/admin/admin/admin-layout.component';

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
                    path: 'admin',
                    loadChildren: () =>
                        import(
                            './presentations/admin/admin-routing.module'
                        ).then((m) => m.AdminRoutingModule),
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
