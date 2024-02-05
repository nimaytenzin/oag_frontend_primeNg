import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterDzongkhagsComponent } from './admin-master-dzongkhags/admin-master-dzongkhags.component';
import { AdminMasterThromdesComponent } from './admin-master-thromdes/admin-master-thromdes.component';
import { AdminMasterLocalitiesComponent } from './admin-master-localities/admin-master-localities.component';

const routes: Routes = [
    { path: 'dzongkhags', component: AdminMasterDzongkhagsComponent },
    { path: 'thromdes', component: AdminMasterThromdesComponent },
    { path: 'localities', component: AdminMasterLocalitiesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterPropertiesRoutingModule {}
