import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { DocumentCopyDto } from 'src/app/core/dto/storage/document-copy.dto';
import { AdminAddDocumentCopyComponent } from '../../../shared-components/admin-add-document-copy/admin-add-document-copy.component';
import { LanguageType } from 'src/app/core/constants/enums';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { TableModule } from 'primeng/table';
import { AdminViewDocumentCopyModalComponent } from '../../../shared-components/admin-view-document-copy-modal/admin-view-document-copy-modal.component';
import { DocumentCopyDataService } from 'src/app/core/dataservice/storage/document-copy.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-view-draft-legislation-document-copy-tab',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule],
    templateUrl:
        './admin-view-draft-legislation-document-copy-tab.component.html',
    styleUrl: './admin-view-draft-legislation-document-copy-tab.component.scss',
})
export class AdminViewDraftLegislationDocumentCopyTabComponent {
    @Input() documentCopies!: DocumentCopyDto[];
    @Input() legislation: LegislationDto;
    @Output() requestUpdateDocumentCopies = new EventEmitter<string>();
    instance: DynamicDialogComponent | undefined;
    ref: DynamicDialogRef | undefined;
    languageType = LanguageType;

    constructor(
        private dialogService: DialogService,
        private documentCopyDataService: DocumentCopyDataService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        console.log(this.documentCopies);
        console.log(this.legislation);
        console.log('DOCUMENT COPIES');
    }

    openAddDocumentCopyModal() {
        this.ref = this.dialogService.open(AdminAddDocumentCopyComponent, {
            header: 'Add Document Copy',
            width: '60%',
            data: {
                legislationId: this.legislation.id,
            },
        });
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 200) {
                this.requestUpdateDocumentCopies.emit('1');
            }
        });
    }

    confirmDeleteDocumentCopy(event: Event, item: DocumentCopyDto) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            accept: () => {
                this.documentCopyDataService
                    .AdminDeleteDocumentCopy(item.id)
                    .subscribe({
                        next: (res) => {
                            this.requestUpdateDocumentCopies.emit('1');
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Confirmed',
                                detail: 'Record deleted',
                            });
                        },
                        error: (err) => {
                            console.log(err);
                        },
                    });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                });
            },
        });
    }

    openViewDocumentCopyModal(fileuri: string) {
        this.ref = this.dialogService.open(
            AdminViewDocumentCopyModalComponent,
            {
                header: 'View',
                width: '60%',
                data: {
                    fileUri:
                        this.documentCopyDataService.getDocumentUri(fileuri),
                },
            }
        );
    }
}
