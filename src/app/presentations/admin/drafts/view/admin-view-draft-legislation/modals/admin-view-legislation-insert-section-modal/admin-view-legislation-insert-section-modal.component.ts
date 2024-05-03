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
import {
    AmendmentChangeType,
    EditingModes,
    SectionType,
} from 'src/app/core/constants/enums';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {
    InsertSectionDto,
    SectionDto,
} from 'src/app/core/dto/legislation/section.dto';
import { UserEditModePreference } from 'src/app/core/sessionStates/user-editing-mode.selection.service';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { AdminDetermineAmendmentModalComponent } from '../../../shared-components/admin-determine-amendment-modal/admin-determine-amendment-modal.component';
import { MessageService } from 'primeng/api';
import { DetermineAmendmentAndCreateChangeDto } from 'src/app/core/dto/ammendment/ammendment.dto';

interface Data {
    topSection: SectionDto;
    bottomSection: SectionDto;
    legislationId: number;
}

@Component({
    selector: 'app-admin-view-legislation-insert-section-modal',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        DropdownModule,
        InputTextModule,
        EditorModule,
        TabViewModule,
        ButtonModule,
    ],
    templateUrl: './admin-view-legislation-insert-section-modal.component.html',
    styleUrl: './admin-view-legislation-insert-section-modal.component.scss',
})
export class AdminViewLegislationInsertSectionModalComponent {
    instance: DynamicDialogComponent | undefined;
    legislation: LegislationDto;
    data: Data;
    editingMode: string;
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
        private sanitizer: DomSanitizer,
        private editingModePreference: UserEditModePreference,
        private sectionDataService: SectionDataService,
        private messageService: MessageService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.editingMode = this.editingModePreference.getEditingMode();
    }

    getLabelByValue(value) {
        const found = this.sectionTypes.find((item) => item.value === value);
        return found ? found.label : undefined;
    }

    insertSection() {
        console.log(this.editingMode);
        if (this.editingMode === EditingModes.NORMAL) {
            let data: InsertSectionDto = {} as InsertSectionDto;

            data = {
                clause_eng: this.clause_eng,
                clause_dzo: this.clause_dzo,
                type: this.selectedSectionType,
                legislationId: this.data.legislationId,
                delegatedLegislationId: null,
                topOrder: this.data.topSection.order,
                bottomOrder: this.data.bottomSection.order,
            };

            this.sectionDataService.AdminInsertNewDraftSection(data).subscribe({
                next: (res: any) => {
                    if (res) {
                        this.ref.close({
                            status: 201,
                            scollTo: res.id,
                        });
                    }
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            if (this.clause_eng || this.clause_dzo) {
                const data: DetermineAmendmentAndCreateChangeDto = {
                    changeType: AmendmentChangeType.INSERTION,
                    clause_eng: this.clause_eng,
                    clause_dzo: this.clause_dzo,
                    type: this.selectedSectionType,
                    order: null,
                    legislationId: this.data.legislationId,
                    topOrder: this.data.topSection.order,
                    bottomOrder: this.data.bottomSection.order,
                };

                this.ref = this.dialogService.open(
                    AdminDetermineAmendmentModalComponent,
                    {
                        data: data,
                        header: 'Select Amendment',
                        width: '40%',
                        baseZIndex: 1000,
                    }
                );
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Nothing Added',
                    detail: 'Please add the content',
                });
            }
        }
    }
}
