import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { LanguageType } from 'src/app/core/constants/enums';
import { DocumentCopyDataService } from 'src/app/core/dataservice/storage/document-copy.service';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { DocumentCopyDto } from 'src/app/core/dto/storage/document-copy.dto';
import { AdminAddDocumentCopyComponent } from '../../../shared-components/admin-add-document-copy/admin-add-document-copy.component';
import { AdminViewDocumentCopyModalComponent } from '../../../shared-components/admin-view-document-copy-modal/admin-view-document-copy-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-admin-delegated-legislation-document-copies-tab',
    templateUrl:
        './admin-delegated-legislation-document-copies-tab.component.html',
    styleUrls: [
        './admin-delegated-legislation-document-copies-tab.component.css',
    ],
    standalone: true,
    imports: [CommonModule, ButtonModule],
    providers: [DialogService],
})
export class AdminDelegatedLegislationDocumentCopiesTabComponent {
    @Input() documentCopies!: DocumentCopyDto[];
    @Input() delegatedLegislation: DelegatedLegislationDto;
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
        console.log(this.delegatedLegislation);
        console.log('DOCUMENT COPIES');
    }

    openAddDocumentCopyModal() {}

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
