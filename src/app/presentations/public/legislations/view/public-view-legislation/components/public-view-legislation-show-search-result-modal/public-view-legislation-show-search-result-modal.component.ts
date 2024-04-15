import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { SafeHtmlPipe } from 'src/app/core/utility/safeHtml.pipe';
import { HighlighterPipe } from 'src/app/core/utility/text.highlighter.pipes';

export interface SearchLegislationModalDto {
    searchKeyword: string;
    results: SectionDto[];
}

@Component({
    selector: 'app-public-view-legislation-show-search-result-modal',
    standalone: true,
    imports: [CommonModule, HighlighterPipe, SafeHtmlPipe],
    templateUrl:
        './public-view-legislation-show-search-result-modal.component.html',
    styleUrl:
        './public-view-legislation-show-search-result-modal.component.scss',
})
export class PublicViewLegislationShowSearchResultModalComponent {
    instance: DynamicDialogComponent | undefined;
    searchResults: SearchLegislationModalDto;

    getSectionStyles = GetSectionStylesPublic;
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.searchResults = this.instance.data;
    }

    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    navigateTo(item: SectionDto) {
        console.log('NAVIGATE TO SECTION ', item.id);
        this.ref.close(item);
    }
}
