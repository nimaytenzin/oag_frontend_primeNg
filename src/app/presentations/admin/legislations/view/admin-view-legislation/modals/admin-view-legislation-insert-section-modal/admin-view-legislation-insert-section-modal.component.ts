import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SectionType } from 'src/app/core/constants/enums';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-admin-view-legislation-insert-section-modal',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        DropdownModule,
        InputTextModule,
        EditorModule,
        ButtonModule,
    ],
    templateUrl: './admin-view-legislation-insert-section-modal.component.html',
    styleUrl: './admin-view-legislation-insert-section-modal.component.scss',
})
export class AdminViewLegislationInsertSectionModalComponent {
    instance: DynamicDialogComponent | undefined;
    legislation: LegislationDto;
    data: any;

    clause_eng: string;
    clause_dzo: string;

    selectedSectionType: SectionType = SectionType.HEADING_1;
    sectionTypes = [
        { label: 'Chapter Heading', value: 'HEADING_1' },
        { label: 'Chapter Name', value: 'HEADING_2' },
        { label: 'Section Heading', value: 'SUBSECTION_H1' },
        { label: 'Content', value: 'CLAUSE' },
    ];
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
    }

    getLabelByValue(value) {
        const found = this.sectionTypes.find((item) => item.value === value);
        return found ? found.label : undefined;
    }
}
