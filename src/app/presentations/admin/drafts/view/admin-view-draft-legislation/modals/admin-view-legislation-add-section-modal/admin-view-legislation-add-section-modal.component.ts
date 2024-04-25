import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';

import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SpeedDialModule } from 'primeng/speeddial';
import { SectionType } from 'src/app/core/constants/enums';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-admin-view-legislation-add-section-modal',
    standalone: true,
    imports: [
        BreadcrumbModule,
        EditorModule,
        FormsModule,
        DropdownModule,
        SpeedDialModule,
        CommonModule,
        InputTextModule,
    ],
    templateUrl: './admin-view-legislation-add-section-modal.component.html',
    styleUrl: './admin-view-legislation-add-section-modal.component.scss',
})
export class AdminViewLegislationAddSectionModalComponent {
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
