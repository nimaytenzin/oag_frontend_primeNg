import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import {
    DynamicDialogRef,
    DialogService,
    DynamicDialogComponent,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { TabViewModule } from 'primeng/tabview';
import {
    LegislationStatus,
    LegislationType,
} from 'src/app/core/constants/enums';
import { AmendmentsDataService } from 'src/app/core/dataservice/amendments/amendment.dataservice';
import { AuthService } from 'src/app/core/dataservice/auth/auth.service';
import {
    AmendmentDto,
    CreateAmendmentDto,
    DetermineAmendmentAndCreateChangeDto,
} from 'src/app/core/dto/ammendment/ammendment.dto';

@Component({
    selector: 'app-admin-determine-amendment-modal',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        CommonModule,
        DividerModule,
        MessagesModule,
        TabViewModule,
        FormsModule,
    ],
    templateUrl: './admin-determine-amendment-modal.component.html',
    styleUrls: ['./admin-determine-amendment-modal.component.scss'],
})
export class AdminDetermineAmendmentModalComponent implements OnInit {
    createAmendmentForm: FormGroup;
    instance: DynamicDialogComponent | undefined;
    objectKeys = Object.keys;

    legislationTypes = Object.values(LegislationType);
    legislationStatuses = Object.values(LegislationStatus);
    amendments: AmendmentDto[] = [];
    activeIndex: number = 0;
    messages: Message[] | undefined;

    data: DetermineAmendmentAndCreateChangeDto;

    selectedAmendment: AmendmentDto;

    requestChangeType: string;
    legislationId: number;

    constructor(
        private messageService: MessageService,
        private amendmentDataService: AmendmentsDataService,
        private authService: AuthService,
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private route: ActivatedRoute
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.requestChangeType = this.data.changeType;
        this.route.params.subscribe((params) => {
            this.legislationId = params['legislationId'];
        });
    }

    ngOnInit() {
        this.getAmendments();

        this.createAmendmentForm = new FormGroup({
            title_eng: new FormControl('', [Validators.required]),
            title_dzo: new FormControl(''),
            status: new FormControl('', [Validators.required]),
            documentYear: new FormControl('', [Validators.required]),
            // dates
            tabledDate: new FormControl(null),
            enactmentDate: new FormControl(null),
            commencementDate: new FormControl(null),
            repealDate: new FormControl(null),
        });
    }

    getAmendments() {
        this.amendmentDataService
            .AdminGetAmendmentsByLegisaltion(this.legislationId)
            .subscribe({
                next: (res) => {
                    this.amendments = res;
                    console.log(this.amendments);
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Couldnt Load Amendments by legislation',
                    });
                },
            });
    }

    createNewAmendment() {
        if (this.createAmendmentForm.invalid) {
            this.validateAllFormFields(this.createAmendmentForm);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please input all the required fields',
            });
            return;
        }

        const data: CreateAmendmentDto = {
            title_eng: '',
            title_dzo: '',
            isPublished: false,
            isActive: false,
            enactmentDate: '',
            commencementDate: '',
            repealDate: '',
            userId: 0,
            status: '',
            legislationId: this.legislationId,
        };

        data.title_eng = this.createAmendmentForm.controls['title_eng'].value;
        data.title_dzo = this.createAmendmentForm.controls['title_eng'].value;
        data.status = this.createAmendmentForm.controls['status'].value;

        data.isPublished = true;
        data.isActive = true;
        data.userId = this.authService.getDecodedTokenObject().id;

        this.amendmentDataService
            .AdminCreateNewAmendment(data)
            .subscribe((res) => {
                if (res.id) {
                    this.messages = [
                        {
                            severity: 'success',
                            summary: 'Amendment Added',
                            detail: 'Please select the amendment from the dropdown below',
                        },
                    ];

                    this.createAmendmentForm.reset();
                    this.getAmendments();
                    this.activeIndex = 0;
                }
            });
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

    close() {}

    createNewSectionAmendment() {
        console.log(this.selectedAmendment);
        console.log(this.data);

        const data: DetermineAmendmentAndCreateChangeDto = this.data;
        data.amendmentId = this.selectedAmendment.id;

        this.amendmentDataService
            .AdminCreateNewSectionAmendment(data)
            .subscribe((res) => {
                console.log(res);
            });
    }
}
