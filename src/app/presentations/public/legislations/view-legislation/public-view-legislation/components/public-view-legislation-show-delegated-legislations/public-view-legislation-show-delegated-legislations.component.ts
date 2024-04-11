import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { SearchLegislationModalDto } from '../public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';

@Component({
    selector: 'app-public-view-legislation-show-delegated-legislations',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl:
        './public-view-legislation-show-delegated-legislations.component.html',
    styleUrl:
        './public-view-legislation-show-delegated-legislations.component.scss',
})
export class PublicViewLegislationShowDelegatedLegislationsComponent {
    instance: DynamicDialogComponent | undefined;
    delegatedLegislations: DelegatedLegislationDto[];
    legislation: LegislationDto;

    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.delegatedLegislations = this.instance.data.delegatedLegislations;
        this.legislation = this.instance.data.legislation;
    }

    viewDelegatedLegislation() {}
}
