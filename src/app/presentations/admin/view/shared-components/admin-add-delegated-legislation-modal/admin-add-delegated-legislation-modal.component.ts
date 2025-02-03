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
    DelegatedLegislationStatus,
    DelegatedLesiglationTypes
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
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-admin-add-delegated-legislation-modal',
    templateUrl: './admin-add-delegated-legislation-modal.component.html',
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
    standalone: true,
    styleUrls: ['./admin-add-delegated-legislation-modal.component.scss'],
})
export class AdminAddDelegatedLegislationModalComponent {
    legislationTypes = Object.values(DelegatedLesiglationTypes);
    legislationStatuses = Object.values(DelegatedLegislationStatus);

    // draftLegislation: CreateLegislationDto = {} as CreateLegislationDto;
    draftDelegatedLegislation: DelegatedLegislationDto = {} as DelegatedLegislationDto;

    submitted: boolean = false;

    createDraftDelegatedLegislationForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private legislationDataService: LegislationDataService,
        private authService: AuthService,
        private ref: DynamicDialogRef
    ) {
        this.createDraftDelegatedLegislationForm = new FormGroup({
            title_eng: new FormControl('', [Validators.required]),
            title_dzo: new FormControl(''),
            status: new FormControl('', [Validators.required]),
            type: new FormControl(
                // { value: LegislationType.ACT, disabled: true },
                [Validators.required]
            ),
            documentYear: new FormControl(null, [Validators.required]),
        });
    }

    createNewDraftDelegatedLegislation() {
        this.submitted = true;
        if (this.createDraftDelegatedLegislationForm.invalid) {
            this.validateAllFormFields(this.createDraftDelegatedLegislationForm);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please input all the required fields',
            });
            return;
        }


        this.draftDelegatedLegislation.isActive = true;
        this.draftDelegatedLegislation.isPublished = false;
        this.draftDelegatedLegislation.documentYear = Number(
            this.createDraftDelegatedLegislationForm.controls['documentYear'].value
        );
        this.draftDelegatedLegislation.creatorId = this.authService.getDecodedTokenObject().id;
        this.draftDelegatedLegislation.title_dzo =
            this.createDraftDelegatedLegislationForm.controls['title_dzo'].value;
        this.draftDelegatedLegislation.title_eng =
            this.createDraftDelegatedLegislationForm.controls['title_eng'].value;

        this.draftDelegatedLegislation.status =
            this.createDraftDelegatedLegislationForm.controls['status'].value;
        this.draftDelegatedLegislation.type =
            this.createDraftDelegatedLegislationForm.controls['type'].value;
        this.legislationDataService
            .AdminCreateDelegatedLegislation(this.draftDelegatedLegislation)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    if (res) {
                        this.ref.close({
                            status: 201,
                            delegatedLegislationId: res.id,
                        });
                        this.messageService.add({
                            severity: 'succcess',
                            summary: 'Added',
                            detail: 'Draft Delegated Legislation has been added',
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
