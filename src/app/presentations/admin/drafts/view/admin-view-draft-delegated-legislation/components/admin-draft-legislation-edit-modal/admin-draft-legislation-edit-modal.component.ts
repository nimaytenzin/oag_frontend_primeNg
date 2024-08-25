import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-admin-draft-legislation-edit-modal',
    templateUrl: './admin-draft-legislation-edit-modal.component.html',
    styleUrls: ['./admin-draft-legislation-edit-modal.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        ButtonModule,
        InputNumberModule,
        DividerModule,
    ],
})
export class AdminDraftLegislationEditModalComponent implements OnInit {
    delegatedLegislation: DelegatedLegislationDto;

    updateDelegatedLegislationForm: FormGroup;
    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef
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
                    disabled: true,
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

    updateDelegatedLegislation() {}

    close() {
        this.ref.close();
    }
}
