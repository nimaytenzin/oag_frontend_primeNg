import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PublicHomeSearchLegislationsResultsModalComponent } from './components/public-home-search-legislations-results-modal/public-home-search-legislations-results-modal.component';

export interface PublicHomeSearchParameters {
    searchKeyword: string;
    searchDocumentType: string;
    searchIn: string;
}

@Component({
    selector: 'app-public-home',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule,
    ],
    providers: [DialogService],
    templateUrl: './public-home.component.html',
    styleUrl: './public-home.component.scss',
})
export class PublicHomeComponent {
    ref: DynamicDialogRef | undefined;

    searchKeyword: string;
    searchIn: string = 'Title';

    documentTypes = ['Legislations', 'DelegatedLegislations'];
    searchDocumentType: string = this.documentTypes[0];

    constructor(public dialogService: DialogService) {}

    searchForLegislations(): void {
        const data: PublicHomeSearchParameters = {
            searchKeyword: this.searchKeyword,
            searchDocumentType: this.searchDocumentType,
            searchIn: this.searchIn,
        };
        this.ref = this.dialogService.open(
            PublicHomeSearchLegislationsResultsModalComponent,
            {
                header: 'Search Results',
                data: data,
            }
        );
    }
}
