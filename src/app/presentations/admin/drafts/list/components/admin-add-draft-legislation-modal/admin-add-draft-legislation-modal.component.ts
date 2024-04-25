import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormsModule,
    NgForm,
    Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import {
    LegislationStatus,
    LegislationType,
} from 'src/app/core/constants/enums';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { CreateLegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { MessageService } from 'primeng/api';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-admin-add-draft-legislation-modal',
    standalone: true,
    imports: [
        DropdownModule,
        CheckboxModule,
        ReactiveFormsModule,
        CalendarModule,
        CommonModule,
        InputNumberModule,
        InputTextModule,
        FormsModule,
    ],
    templateUrl: './admin-add-draft-legislation-modal.component.html',
    styleUrl: './admin-add-draft-legislation-modal.component.scss',
})
export class AdminAddDraftLegislationModalComponent {
    legislationTypes = Object.values(LegislationType);
    legislationStatuses = Object.values(LegislationStatus);

    draftLegislation: CreateLegislationDto = {} as CreateLegislationDto;
    submitted: boolean = false;

    createDraftLegislationForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private legislationDataService: LegislationDataService,
        private authService: AuthService,
        private ref: DynamicDialogRef
    ) {
        this.createDraftLegislationForm = new FormGroup({
            title_eng: new FormControl('', [Validators.required]),
            title_dzo: new FormControl(''),
            status: new FormControl('', [Validators.required]),
            type: new FormControl(
                { value: LegislationType.ACT, disabled: true },
                [Validators.required]
            ),
            documentYear: new FormControl(null, [Validators.required]),
        });
    }

    createNewDraftLegislation() {
        this.submitted = true;
        if (this.createDraftLegislationForm.invalid) {
            this.validateAllFormFields(this.createDraftLegislationForm);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please input all the required fields',
            });
            return;
        }

        this.draftLegislation.isPublished = false;
        this.draftLegislation.isActive = true;

        this.draftLegislation.creatorId =
            this.authService.getDecodedTokenObject().id;

        this.draftLegislation.documentYear = Number(
            this.createDraftLegislationForm.controls['documentYear'].value
        );
        this.draftLegislation.title_dzo =
            this.createDraftLegislationForm.controls['title_eng'].value;
        this.draftLegislation.title_eng =
            this.createDraftLegislationForm.controls['title_dzo'].value;
        this.draftLegislation.status =
            this.createDraftLegislationForm.controls['status'].value;
        this.draftLegislation.type =
            this.createDraftLegislationForm.controls['type'].value;

        this.legislationDataService
            .AdminCreateLegislation(this.draftLegislation)
            .subscribe({
                next: (res) => {
                    if (res) {
                        this.ref.close({
                            status: 201,
                        });
                    }
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Internal Server Error',
                        detail: 'Server Error Please contact Backend Administrator',
                    });
                },
            });
    }

    close() {
        this.ref.close();
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}
