import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminAddDelegatedLegislationModalComponent } from '../../../shared-components/admin-add-delegated-legislation-modal/admin-add-delegated-legislation-modal.component';

@Component({
    selector: 'app-admin-view-draft-legislation-delegated-legislation-tab',
    standalone: true,
    imports: [ButtonModule, DividerModule],
    templateUrl:
        './admin-view-draft-legislation-delegated-legislation-tab.component.html',
    styleUrl:
        './admin-view-draft-legislation-delegated-legislation-tab.component.scss',
})
export class AdminViewDraftLegislationDelegatedLegislationTabComponent {
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService) {}

    openAddDelegatedLegislation() {
        this.ref = this.dialogService.open(
            AdminAddDelegatedLegislationModalComponent,
            {
                header: 'Add Delegated Legislation',
            }
        );
    }
}
