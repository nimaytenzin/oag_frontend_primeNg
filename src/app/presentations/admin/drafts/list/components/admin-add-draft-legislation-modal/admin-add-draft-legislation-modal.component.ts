import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    ReactiveFormsModule,
    FormsModule,
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

@Component({
    selector: 'app-admin-add-draft-legislation-modal',
    standalone: true,
    imports: [
        DropdownModule,
        CheckboxModule,
        ReactiveFormsModule,
        CalendarModule,
        CommonModule,
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

    createNewDraftLegislation() {
        this.submitted = true;
        this.draftLegislation.isPublished = false;
        this.draftLegislation.isActive = true;

        console.log(this.draftLegislation);
    }
}
