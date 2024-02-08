import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogComponent } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-admin-add-tenant',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputTextModule,
        CheckboxModule,
        InputTextareaModule,
        ToastModule,
        InputGroupModule,
        InputGroupAddonModule,
        FileUploadModule,
    ],
    providers: [DialogService, MessageService],
    templateUrl: './admin-add-tenant.component.html',
    styleUrl: './admin-add-tenant.component.scss',
})
export class AdminAddTenantComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    bankNames = [
        'Bank of Bhutan',
        'Bhutan Development Bank',
        'Bhutan National Bank',
        'Tashi Bank',
        'Druk Punjab Bank',
    ];

    instance: DynamicDialogComponent | undefined;
    createTenantForm!: FormGroup;

    createTenant() {}

    ngOnInit(): void {
        this.createTenantForm = this.fb.group({
            firstName: ['Nima', Validators.required],
            middleName: ['Yoezer'],
            lastName: ['Tenzin'],
            phoneNumber: [17263764, Validators.required],
            cid: [10302000402],
            profileUri: ['nima'],
            signatureUri: ['nima'],
            email: ['nimaytenzin@gmail.com'],
            bankName: ['Bank of Bhutan', Validators.required],
            accountNumber: ['101273372', Validators.required],
        });
    }

    onUpload(event: UploadEvent) {
        this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded with Basic Mode',
        });
    }
}
