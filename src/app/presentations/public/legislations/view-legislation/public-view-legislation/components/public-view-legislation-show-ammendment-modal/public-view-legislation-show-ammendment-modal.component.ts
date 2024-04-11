import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { SearchLegislationModalDto } from '../public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';

@Component({
    selector: 'app-public-view-legislation-show-ammendment-modal',
    standalone: true,
    imports: [],
    templateUrl:
        './public-view-legislation-show-ammendment-modal.component.html',
    styleUrl: './public-view-legislation-show-ammendment-modal.component.scss',
})
export class PublicViewLegislationShowAmmendmentModalComponent {
    instance: DynamicDialogComponent | undefined;
    data: AmendmentDto;

    getSectionStyles = GetSectionStylesPublic;
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
    }
}
