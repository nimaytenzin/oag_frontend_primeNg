import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
    FileUploadEvent,
    FileUploadHandlerEvent,
    FileUploadModule,
    UploadEvent,
} from 'primeng/fileupload';
import { LanguageType } from 'src/app/core/constants/enums';
import { DocumentCopyDataService } from 'src/app/core/dataservice/storage/document-copy.service';
import { CreateDocumentCopyDto } from 'src/app/core/dto/storage/document-copy.dto';

interface AdminAddDocumentCopyModalI {
    legislationId?: number;
    delegatedLegislationId?: number;
    amendmentId?: number;
}

@Component({
    selector: 'app-admin-add-document-copy',
    standalone: true,
    imports: [FileUploadModule, DropdownModule, FormsModule],
    templateUrl: './admin-add-document-copy.component.html',
    styleUrl: './admin-add-document-copy.component.scss',
})
export class AdminAddDocumentCopyComponent {
    languageTypes = Object.values(LanguageType);
    selectedLanguage: string = this.languageTypes[0];
    data: AdminAddDocumentCopyModalI;
    instance: DynamicDialogComponent | undefined;

    constructor(
        private messageService: MessageService,
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private documentCopyDataService: DocumentCopyDataService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
    }

    onSelect(event: UploadEvent) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode',
        });
        console.log(event);
    }
    onUpload(event: FileUploadHandlerEvent) {
        console.log(event.files[0]);
        const file = event.files[0];

        let formData = new FormData();
        formData.append('file', file);

        if (this.data.legislationId) {
            formData.append(
                'legislationId',
                this.data.legislationId.toString()
            );
        }

        if (this.data.amendmentId) {
            formData.append('amendmentId', this.data.amendmentId.toString());
        }

        if (this.data.delegatedLegislationId) {
            formData.append(
                'delegatedLegislationId',
                this.data.delegatedLegislationId.toString()
            );
        }

        formData.append('language', this.selectedLanguage);

        this.documentCopyDataService
            .AdminCreateDocumentCopy(formData)
            .subscribe({
                next: (res) => {
                    if (res) {
                        this.ref.close({
                            status: 200,
                        });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Uploaded',
                            detail: 'Document Copy Uploaded',
                        });
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }
}
