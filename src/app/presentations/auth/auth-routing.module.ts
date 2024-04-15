import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLoginComponent } from './public-login/public-login.component';
const routes: Routes = [
    {
        path: 'login',
        component: PublicLoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
