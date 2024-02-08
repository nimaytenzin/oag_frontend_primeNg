import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminAddAdminComponent } from '../crud-dialog/admin-add-admin/admin-add-admin.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-master-admins',
    standalone: true,

    imports: [ButtonModule],
    providers: [DialogService],
    templateUrl: './admin-master-admins.component.html',
    styleUrl: './admin-master-admins.component.scss',
})
export class AdminMasterAdminsComponent {
    ref: DynamicDialogRef | undefined;
    constructor(public dialogService: DialogService, private router: Router) {}
    openAddAdminModal() {
        this.ref = this.dialogService.open(AdminAddAdminComponent, {
            header: 'Add Admin',
            width: '500px',
        });
    }
}
