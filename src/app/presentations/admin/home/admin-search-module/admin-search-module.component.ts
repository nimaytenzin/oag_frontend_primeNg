import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SEARCHDOCUMENTYPES } from 'src/app/core/constants/enums';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';

@Component({
    selector: 'app-admin-search-module',
    standalone: true,
    imports: [
        ChipsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        FormsModule,
        DropdownModule,
        CheckboxModule,
    ],
    templateUrl: './admin-search-module.component.html',
    styleUrl: './admin-search-module.component.scss',
})
export class AdminSearchModuleComponent {
    searchKeywords: string[];
    searchInTitle: boolean = false;
    legislations: LegislationDto[] = [];
    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string = this.documentType.LEGISLATIONS;

    searchForLegislations(): void {}
    toggleCheckbox(checkbox: string) {
        if (checkbox === 'Title') {
            this.searchInTitle = true;
        } else if (checkbox === 'Content') {
            this.searchInTitle = false;
        }
    }
}
