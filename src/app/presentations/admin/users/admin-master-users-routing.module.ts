import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterTenantsComponent } from './admin-master-tenants/admin-master-tenants.component';
import { AdminMasterLandlordsComponent } from './admin-master-landlords/admin-master-landlords.component';
import { AdminMasterAdminsComponent } from './admin-master-admins/admin-master-admins.component';

const routes: Routes = [
    {
        path: 'tenants',
        component: AdminMasterTenantsComponent,
    },
    {
        path: 'landlords',
        component: AdminMasterLandlordsComponent,
    },
    {
        path: 'admins',
        component: AdminMasterAdminsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdmingMasterUsersRoutingModule {}
