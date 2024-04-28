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
import { EditingModes, SectionType } from 'src/app/core/constants/enums';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { UserEditModePreference } from 'src/app/core/sessionStates/user-editing-mode.selection.service';
import { CreateSectionDto } from 'src/app/core/dto/legislation/section.dto';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { TabViewModule } from 'primeng/tabview';

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
        TabViewModule,
    ],
    templateUrl: './admin-view-legislation-add-section-modal.component.html',
    styleUrl: './admin-view-legislation-add-section-modal.component.scss',
})
export class AdminViewLegislationAddSectionModalComponent {
    instance: DynamicDialogComponent | undefined;
    legislation: LegislationDto;
    data: any;

    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    clause_eng: string;
    clause_dzo: string;

    selectedSectionType: SectionType = SectionType.HEADING_1;
    editingMode: string;

    sectionTypes = [
        { label: 'Chapter Heading', value: 'HEADING_1' },
        { label: 'Chapter Name', value: 'HEADING_2' },
        { label: 'Section Heading', value: 'SUBSECTION_H1' },
        { label: 'Content', value: 'CLAUSE' },
    ];
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer,
        private editingModePreference: UserEditModePreference,
        private sectionService: SectionDataService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.editingMode = this.editingModePreference.getEditingMode();

        this.items = [
            { label: 'English', icon: 'pi pi-fw pi-home' },
            { label: 'Dzongkha', icon: 'pi pi-fw pi-calendar' },
        ];

        this.activeItem = this.items[0];
    }

    getLabelByValue(value) {
        const found = this.sectionTypes.find((item) => item.value === value);
        return found ? found.label : undefined;
    }

    activateMenu() {
        console.log(this.items);
        this.activeItem = this.items['activeItem'];
    }

    addNewSection() {
        console.log('EDITING MODE', this.editingMode);
        if (this.editingMode === EditingModes.NORMAL) {
            let data: CreateSectionDto = {} as CreateSectionDto;

            data = {
                clause_eng: this.clause_eng,
                clause_dzo: this.clause_dzo,
                type: this.selectedSectionType,
                legislationId: this.data.legislationId,
                delegatedLegislationId: null,
            };

            this.sectionService
                .AdminCreateNewSection(data)
                .subscribe((res: any) => {
                    if (res) {
                        this.ref.close({
                            status: 201,
                            scollTo: res.id,
                        });
                    }
                });
        } else {
        }
    }
}
