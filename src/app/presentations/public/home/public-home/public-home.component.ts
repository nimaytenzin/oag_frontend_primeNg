import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PublicHomeSearchLegislationsResultsModalComponent } from './components/public-home-search-legislations-results-modal/public-home-search-legislations-results-modal.component';
import { ChipsModule } from 'primeng/chips';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

export interface PublicHomeSearchParameters {
    searchKeyword: string;
    searchDocumentType: string;
    searchIn: string;
}
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SEARCHDOCUMENTYPES } from 'src/app/core/constants/enums';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-public-home',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule,
        ChipsModule,
        MessagesModule,
        ToastModule,
    ],
    providers: [DialogService, MessageService],
    templateUrl: './public-home.component.html',
    styleUrl: './public-home.component.scss',
})
export class PublicHomeComponent {
    ref: DynamicDialogRef | undefined;

    searchKeywords: string[];
    searchInTitle: boolean = false;

    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string = this.documentType.LEGISLATIONS;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private titleService: Title
    ) {
        this.titleService.setTitle('Depository of Laws');
    }

    searchForLegislations(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'tc',
            detail: 'Message Content',
        });

        const keyWordQueryParam = this.searchKeywords.join(',');
        const inQueryParam = this.searchDocumentType;
        const withinQueryParam = this.searchInTitle ? 'Title' : 'Content';
        this.router.navigate(['search'], {
            queryParams: {
                Keyword: keyWordQueryParam,
                In: inQueryParam,
                Within: withinQueryParam,
            },
        });
        // const data: PublicHomeSearchParameters = {
        //     searchKeyword: this.searchKeyword,
        //     searchDocumentType: this.searchDocumentType,
        //     searchIn: '',
        // };
        // this.ref = this.dialogService.open(
        //     PublicHomeSearchLegislationsResultsModalComponent,
        //     {
        //         header: 'Search Results',
        //         data: data,
        //     }
        // );s
    }
    toggleCheckbox(checkbox: string) {
        if (checkbox === 'Title') {
            this.searchInTitle = true;
        } else if (checkbox === 'Content') {
            this.searchInTitle = false;
        }
    }
}
