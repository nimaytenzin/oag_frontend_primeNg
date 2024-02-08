import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminAddUnitComponent } from '../crud-modals/admin-add-unit/admin-add-unit.component';
import { AdminEditUnitComponent } from '../crud-modals/admin-edit-unit/admin-edit-unit.component';
import { UnitDataService } from 'src/app/core/dataservice/units/unit.dataservice';
import { TableModule } from 'primeng/table';
import { UnitDTO } from 'src/app/core/dto/units/unit.dto';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin-list-units',
    standalone: true,
    imports: [ButtonModule, TableModule, RouterModule],
    providers: [DialogService],
    templateUrl: './admin-list-units.component.html',
    styleUrl: './admin-list-units.component.scss',
})
export class AdminListUnitsComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
    units: UnitDTO[];
    constructor(
        public dialogService: DialogService,
        private unitDataService: UnitDataService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.unitDataService.GetAllUnitsByBuilding(13).subscribe((res) => {
            console.log(res);
            this.units = res;
        });
    }
    openAddUnitModal() {
        this.ref = this.dialogService.open(AdminAddUnitComponent, {
            header: 'Add Unit',

            width: '500px',
        });
    }
    openEditUnitModal() {
        this.ref = this.dialogService.open(AdminEditUnitComponent, {
            header: 'Edit Unit',
            width: '500px',
        });
    }

    viewUnit(unit: UnitDTO) {
        console.log(
            '/admin/master-properties/building/:buildingId/:unitId',
            13,
            'unit',
            1
        );
        this.router.navigate(['/admin/master-properties/building/13/unit/1']);
    }
}
