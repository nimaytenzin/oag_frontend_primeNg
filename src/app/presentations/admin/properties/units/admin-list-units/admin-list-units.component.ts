import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminAddUnitComponent } from '../crud-modals/admin-add-unit/admin-add-unit.component';
import { AdminEditUnitComponent } from '../crud-modals/admin-edit-unit/admin-edit-unit.component';

@Component({
    selector: 'app-admin-list-units',
    standalone: true,
    imports: [ButtonModule],
    providers: [DialogService],
    templateUrl: './admin-list-units.component.html',
    styleUrl: './admin-list-units.component.scss',
})
export class AdminListUnitsComponent {
    ref: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService) {}
    openAddUnitModal() {
        this.ref = this.dialogService.open(AdminAddUnitComponent, {
            header: 'Add Unit',

            width: '50vw',
        });
    }
    openEditUnitModal() {
        this.ref = this.dialogService.open(AdminEditUnitComponent, {
            header: 'Edit Unit',
            width: '50vw',
        });
    }
}
