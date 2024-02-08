import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AdminAddTenantComponent } from '../crud-dialog/admin-add-tenant/admin-add-tenant.component';
import { AdminAddLandlordComponent } from '../crud-dialog/admin-add-landlord/admin-add-landlord.component';

@Component({
    selector: 'app-admin-master-landlords',
    standalone: true,
    imports: [ButtonModule],
    providers: [DialogService],
    templateUrl: './admin-master-landlords.component.html',
    styleUrl: './admin-master-landlords.component.scss',
})
export class AdminMasterLandlordsComponent {
    ref: DynamicDialogRef | undefined;
    constructor(public dialogService: DialogService, private router: Router) {}
    openAddTenantsModal() {
        this.ref = this.dialogService.open(AdminAddLandlordComponent, {
            header: 'Add Landlords',
            width: '500px',
        });
    }
}
