import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { SEARCHDOCUMENTYPES } from 'src/app/core/constants/enums';

@Component({
    selector: 'app-admin-delegated-legislation-add-parent-modal',
    templateUrl:
        './admin-delegated-legislation-add-parent-modal.component.html',
    styleUrls: ['./admin-delegated-legislation-add-parent-modal.component.css'],
    standalone: true,
    imports: [
        DropdownModule,
        ChipsModule,
        FormsModule,
        CheckboxModule,
        ButtonModule,
    ],
})
export class AdminDelegatedLegislationAddParentModalComponent
    implements OnInit
{
    searchKeywords: string;
    searchInTitle: boolean = true;
    searchInContent: boolean = false;
    searchDocumentType: string;

    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;

    constructor() {}

    ngOnInit() {}

    searchForLegislations() {}
}
