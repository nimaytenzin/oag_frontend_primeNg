import { Component } from '@angular/core';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PublicHomeSearchParameters } from '../../public-home.component';

@Component({
    selector: 'app-public-home-search-legislations-results-modal',
    standalone: true,
    imports: [],
    templateUrl:
        './public-home-search-legislations-results-modal.component.html',
    styleUrl: './public-home-search-legislations-results-modal.component.scss',
})
export class PublicHomeSearchLegislationsResultsModalComponent {
    instance: DynamicDialogComponent | undefined;

    searchParameters: PublicHomeSearchParameters;
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.searchParameters = this.instance.data;
    }
}
