import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { TabViewModule } from 'primeng/tabview';
import {
    SectionType,
    EditingModes,
    AmendmentChangeType,
} from 'src/app/core/constants/enums';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import {
    CreateSectionDto,
    SectionDto,
} from 'src/app/core/dto/legislation/section.dto';
import { UserEditModePreference } from 'src/app/core/sessionStates/user-editing-mode.selection.service';
import { AdminDetermineAmendmentModalComponent } from '../../../shared-components/admin-determine-amendment-modal/admin-determine-amendment-modal.component';
import { DetermineAmendmentAndCreateChangeDto } from 'src/app/core/dto/ammendment/ammendment.dto';

@Component({
    selector: 'app-admin-view-legislation-edit-section-modal',
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
    templateUrl: './admin-view-legislation-edit-section-modal.component.html',
    styleUrl: './admin-view-legislation-edit-section-modal.component.scss',
})
export class AdminViewLegislationEditSectionModalComponent {
    instance: DynamicDialogComponent | undefined;
    legislation: LegislationDto;
    data: SectionDto;

    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    clause_eng: string;
    clause_dzo: string;

    selectedSectionType: SectionType = SectionType.HEADING_1;
    editingMode: string;
    isDelegatedLegislation: boolean = false;

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
        private sectionService: SectionDataService,
        private messageService: MessageService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.editingMode = this.editingModePreference.getEditingMode();
        this.isDelegatedLegislation = this.data.delegatedLegislationId == null ? false : true;
        console.log(this.instance.data.isDelegatedLegislation);

        this.clause_eng = this.data.clause_eng;
        this.clause_dzo = this.data.clause_dzo;
        this.selectedSectionType =
            this.data.type === SectionType.CLAUSE
                ? SectionType.CLAUSE
                : SectionType.HEADING_1;

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

    updateSection() {
        if (this.editingMode === EditingModes.NORMAL) {
            let data: CreateSectionDto = {} as CreateSectionDto;



            if (this.isDelegatedLegislation) {
                data = {
                    clause_eng: this.clause_eng,
                    clause_dzo: this.clause_dzo,
                    type: this.selectedSectionType,
                    legislationId: null,
                    delegatedLegislationId: this.data.delegatedLegislationId,
                };
            } else {
                data = {
                    clause_eng: this.clause_eng,
                    clause_dzo: this.clause_dzo,
                    type: this.selectedSectionType,
                    legislationId: this.data.legislationId,
                    delegatedLegislationId: null,
                };
            }

            this.sectionService
                .AdminUpdateSection(this.data.id, data)
                .subscribe((res: any) => {
                    if (res) {
                        this.ref.close({
                            status: 200,
                            scollTo: res.id,
                        });
                    }
                });
        } else {
            if (this.clause_eng || this.clause_dzo) {
                const data: DetermineAmendmentAndCreateChangeDto = {
                    changeType: AmendmentChangeType.MODIFICATION,
                    clause_eng: this.clause_eng,
                    clause_dzo: this.clause_dzo,
                    type: this.selectedSectionType,
                    order: this.data.order,
                    sectionId: this.data.id,
                    legislationId: this.data.legislationId,
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
