import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewBuildingComponent } from './buildings/admin-view-building/admin-view-building.component';
import { AdminListBuildingsComponent } from './buildings/admin-list-buildings/admin-list-buildings.component';
import { AdminViewUnitComponent } from './units/admin-view-unit/admin-view-unit.component';
import { AdminMasterPropertiesComponent } from './admin-master-properties.component';

const routes: Routes = [
    {
        path: '',
        component: AdminMasterPropertiesComponent,
        children: [
            {
                path: '',
                component: AdminListBuildingsComponent,
            },
            {
                path: 'building/:buildingId',
                component: AdminViewBuildingComponent,
            },
            { path: 'unit/:unitId', component: AdminViewUnitComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterPropertiesRoutingModule {}
