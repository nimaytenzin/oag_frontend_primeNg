import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {
    LegislationType,
    LegislationStatus,
} from 'src/app/core/constants/enums';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import {
    CreateLegislationDto,
    UpdateLegislationDto,
} from 'src/app/core/dto/legislation/legislation.dto';
import { DividerModule } from 'primeng/divider';
import { PARSETOMYSQLDATE } from 'src/app/core/utility/date.helper';

@Component({
    selector: 'app-admin-view-draft-legislation-edit-legislation-modal',
    standalone: true,
    imports: [
        DropdownModule,
        CheckboxModule,
        ReactiveFormsModule,
        CalendarModule,
        CommonModule,
        InputNumberModule,
        InputTextModule,
        DividerModule,
        FormsModule,
    ],
    templateUrl:
        './admin-view-draft-legislation-edit-legislation-modal.component.html',
    styleUrl:
        './admin-view-draft-legislation-edit-legislation-modal.component.scss',
})
export class AdminViewDraftLegislationEditLegislationModalComponent {
    instance: DynamicDialogComponent | undefined;

    legislationTypes = Object.values(LegislationType);
    legislationStatuses = Object.values(LegislationStatus);

    draftLegislation: UpdateLegislationDto = {} as UpdateLegislationDto;
    submitted: boolean = false;

    updateDraftLegislationForm: FormGroup;

    constructor(
        private messageService: MessageService,
        private legislationDataService: LegislationDataService,
        private authService: AuthService,
        private ref: DynamicDialogRef,
        private dialogService: DialogService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.draftLegislation = this.instance.data;

        console.log('PASSED Legisaltion', this.draftLegislation);
        this.updateDraftLegislationForm = new FormGroup({
            title_eng: new FormControl(this.draftLegislation.title_eng, [
                Validators.required,
            ]),
            title_dzo: new FormControl(this.draftLegislation.title_dzo),
            status: new FormControl(this.draftLegislation.status, [
                Validators.required,
            ]),
            type: new FormControl(
                { value: this.draftLegislation.type, disabled: true },
                [Validators.required]
            ),
            documentYear: new FormControl(this.draftLegislation.documentYear, [
                Validators.required,
            ]),

            // dates
            tabledDate: new FormControl(this.draftLegislation.tabledDate),
            enactmentDate: new FormControl(this.draftLegislation.enactmentDate),
            commencementDate: new FormControl(
                this.draftLegislation.commencementDate
            ),
            repealDate: new FormControl(this.draftLegislation.repealDate),
        });
    }

    createNewDraftLegislation() {
        this.submitted = true;
        if (this.updateDraftLegislationForm.invalid) {
            this.validateAllFormFields(this.updateDraftLegislationForm);
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
            this.updateDraftLegislationForm.controls['documentYear'].value
        );
        this.draftLegislation.title_dzo =
            this.updateDraftLegislationForm.controls['title_dzo'].value;
        this.draftLegislation.title_eng =
            this.updateDraftLegislationForm.controls['title_eng'].value;
        this.draftLegislation.status =
            this.updateDraftLegislationForm.controls['status'].value;
        this.draftLegislation.type =
            this.updateDraftLegislationForm.controls['type'].value;

        if (this.updateDraftLegislationForm.controls['tabledDate'].value) {
            this.draftLegislation.tabledDate = PARSETOMYSQLDATE(
                this.updateDraftLegislationForm.controls['tabledDate'].value
            );
        }
        if (this.updateDraftLegislationForm.controls['enactmentDate'].value) {
            this.draftLegislation.enactmentDate = PARSETOMYSQLDATE(
                this.updateDraftLegislationForm.controls['enactmentDate'].value
            );
        }
        if (
            this.updateDraftLegislationForm.controls['commencementDate'].value
        ) {
            this.draftLegislation.commencementDate = PARSETOMYSQLDATE(
                this.updateDraftLegislationForm.controls['commencementDate']
                    .value
            );
        }
        if (this.updateDraftLegislationForm.controls['repealDate'].value) {
            this.draftLegislation.repealDate = PARSETOMYSQLDATE(
                this.updateDraftLegislationForm.controls['repealDate'].value
            );
        }

        console.log(this.draftLegislation, 'UPDATE DATA');

        this.legislationDataService
            .AdminUpdateLegislation(
                this.draftLegislation.id,
                this.draftLegislation
            )
            .subscribe({
                next: (res) => {
                    if (res) {
                        this.ref.close({
                            status: 200,
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
