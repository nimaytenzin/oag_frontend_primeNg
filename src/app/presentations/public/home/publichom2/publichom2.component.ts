import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-publichom2',
    standalone: true,
    imports: [
        RouterModule,
        FormsModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule,
        ChipsModule,
        MessagesModule,
        ToastModule,
        CardModule,
        TableModule,
        DividerModule,
        StyleClassModule,
    ],
    templateUrl: './publichom2.component.html',
    styleUrls: ['./publichom2.component.scss'],
})
export class Publichom2Component implements OnInit {
    searchInTitle:boolean;
    documentTypes
    searchDocumentType
    searchKeywords

    constructor() {}

    ngOnInit() {}
    searchForLegislations(){}
    toggleCheckbox(content){}
}
