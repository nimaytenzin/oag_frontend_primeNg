import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AdminAddTenantComponent } from '../crud-dialog/admin-add-tenant/admin-add-tenant.component';

@Component({
    selector: 'app-admin-master-tenants',
    standalone: true,
    imports: [ButtonModule],
    providers: [DialogService],
    templateUrl: './admin-master-tenants.component.html',
    styleUrl: './admin-master-tenants.component.scss',
})
export class AdminMasterTenantsComponent {
    ref: DynamicDialogRef | undefined;
    constructor(public dialogService: DialogService, private router: Router) {}
    openAddTenantsModal() {
        this.ref = this.dialogService.open(AdminAddTenantComponent, {
            header: 'Add Tenants',
            width: '500px',
        });
    }
}
