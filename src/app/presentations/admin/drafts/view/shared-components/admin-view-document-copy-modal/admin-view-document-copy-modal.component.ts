import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'app-admin-view-document-copy-modal',
    standalone: true,
    imports: [PdfViewerModule],
    templateUrl: './admin-view-document-copy-modal.component.html',
    styleUrl: './admin-view-document-copy-modal.component.scss',
})
export class AdminViewDocumentCopyModalComponent {
    instance: DynamicDialogComponent | undefined;
    data: any;
    pdfSrc: string;

    constructor(
        private messageService: MessageService,
        public ref: DynamicDialogRef,
        private dialogService: DialogService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.pdfSrc = this.data.fileUri;
    }
}
