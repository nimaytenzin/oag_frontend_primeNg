import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {
    DelegatedLegislationStatus,
    DelegatedLesiglationTypes,
} from 'src/app/core/constants/enums';
import { DelegatedLegislationDataService } from 'src/app/core/dataservice/delegated-legislations/delegated-legislation.dataservice';
import { DelegatedLegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/delegated-legislation-relationship.dataservice';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-admin-edit-delegated-legislation-modal',
    templateUrl: './admin-edit-delegated-legislation-modal.component.html',
    styleUrls: ['./admin-edit-delegated-legislation-modal.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        ButtonModule,
        InputNumberModule,
        DividerModule,
        DropdownModule,
    ],
})
export class AdminEditDelegatedLegislationModalComponent implements OnInit {
    delegatedLegislation: DelegatedLegislationDto;
    delegatedLegislationTypes = Object.values(DelegatedLesiglationTypes);
    delegatedLegislationStatus = Object.values(DelegatedLegislationStatus);
    updateDelegatedLegislationForm: FormGroup;
    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
        private delegatedLegislationDataService: DelegatedLegislationDataService
    ) {}

    ngOnInit() {
        this.delegatedLegislation = this.config.data;
        console.log('PASSED DL', this.delegatedLegislation);

        this.updateDelegatedLegislationForm = new FormGroup({
            title_eng: new FormControl(this.delegatedLegislation.title_eng, [
                Validators.required,
            ]),
            title_dzo: new FormControl(this.delegatedLegislation.title_dzo),
            status: new FormControl(this.delegatedLegislation.status, [
                Validators.required,
            ]),
            type: new FormControl(
                {
                    value: this.delegatedLegislation.type,
                    disabled: false,
                },
                [Validators.required]
            ),
            documentYear: new FormControl(
                this.delegatedLegislation.documentYear,
                [Validators.required]
            ),

            // dates
            tabledDate: new FormControl(this.delegatedLegislation.tabledDate),
            enactmentDate: new FormControl(
                this.delegatedLegislation.enactmentDate
            ),

            repealDate: new FormControl(this.delegatedLegislation.repealDate),
        });
    }

    updateDelegatedLegislation() {
        console.log(this.updateDelegatedLegislationForm.value);
        this.delegatedLegislationDataService
            .AdminUpdateDelegatedLegislation(
                this.delegatedLegislation.id,
                this.updateDelegatedLegislationForm.value
            )
            .subscribe((res) => {
                console.log('UPDATING DElegATEd legiSLATION', res);
            });
    }

    close() {
        this.ref.close();
    }
}
