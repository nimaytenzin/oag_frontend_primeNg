import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { EditingModes, LanguageType } from 'src/app/core/constants/enums';
import { DelegatedLegislationDataService } from 'src/app/core/dataservice/delegated-legislations/delegated-legislation.dataservice';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { DocumentCopyDto } from 'src/app/core/dto/storage/document-copy.dto';
import { UserEditModePreference } from 'src/app/core/sessionStates/user-editing-mode.selection.service';
import {
    GetTocStylesAdmin,
    GetTocStylesDLAdmin,
} from 'src/app/core/utility/documentStyles';
import { ParseAmendmentChangeType } from 'src/app/core/utility/parser';
import { AdminDelegatedLegislationSectionsTabComponent } from './tabs/admin-delegated-legislation-sections-tab/admin-delegated-legislation-sections-tab.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AdminDelegatedLegislationDocumentCopiesTabComponent } from './tabs/admin-delegated-legislation-document-copies-tab/admin-delegated-legislation-document-copies-tab.component';
import { AdminDraftLegislationEditModalComponent } from './components/admin-draft-legislation-edit-modal/admin-draft-legislation-edit-modal.component';

@Component({
    selector: 'app-admin-view-draft-delegated-legislation',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        DividerModule,
        TabMenuModule,
        AdminDelegatedLegislationSectionsTabComponent,
        AdminDelegatedLegislationDocumentCopiesTabComponent,
    ],
    providers: [MessageService, DialogService],
    templateUrl: './admin-view-draft-delegated-legislation.component.html',
    styleUrl: './admin-view-draft-delegated-legislation.component.scss',
})
export class AdminViewDraftDelegatedLegislationComponent {
    eventsSubject: Subject<string> = new Subject<string>(); //capture scroll event

    delegatedLegislationId: number;
    delegatedLegislation: DelegatedLegislationDto;
    delegatedLegislationDates: any[];

    sections: SectionDto[] = [];
    activeSectionId: string;

    editingModes = EditingModes;
    documentCopies: DocumentCopyDto[] = [];

    getTocStyles = GetTocStylesDLAdmin;
    tableOfContent: SectionDto[] = [];

    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;

    ref: DynamicDialogRef | undefined;

    languageType = LanguageType;
    selectedLanguage: string = LanguageType.ENG;

    selectedEditingMode: string = this.editingModes.NORMAL;

    languageTypes: any[] = [
        {
            label: 'རྫོང་ཁ',
            value: LanguageType.DZO,
        },
        {
            label: 'English',
            value: LanguageType.ENG,
        },
    ];

    speeddialItems: MenuItem[];
    parseAmendmentChangeType = ParseAmendmentChangeType;
    history: any;

    constructor(
        private messageService: MessageService,
        private userEditingModePreference: UserEditModePreference,
        private delegatedLegislationDataService: DelegatedLegislationDataService,
        private sectionDataService: SectionDataService,
        private route: ActivatedRoute,
        private dialogService: DialogService
    ) {
        this.route.params.subscribe((params) => {
            this.delegatedLegislationId = params['delegatedLegislationId'];
            this.getDelegatedLegislation();
            this.getSections();
            this.getTableOfContents();
        });
        this.items = [
            {
                label: 'Clauses',
                command: () => this.switchTab(this.items[0]),
            },
            {
                label: 'Document Copies',
                command: () => this.switchTab(this.items[1]),
            },
        ];
        this.activeItem = this.items[0];
    }

    switchTab(item: MenuItem) {
        this.activeItem = item;
    }

    switchEditingMode(editingMode: EditingModes) {
        if (editingMode === EditingModes.NORMAL) {
            this.selectedEditingMode = EditingModes.NORMAL;

            this.messageService.add({
                severity: 'info',
                summary: 'Normal Mode',
                detail: 'Switched to Normal Mode!',
            });
            this.userEditingModePreference.setEditingMode(EditingModes.NORMAL);
        }
        if (editingMode === EditingModes.AMENDMENT) {
            this.selectedEditingMode = EditingModes.AMENDMENT;
            this.messageService.add({
                severity: 'warn',
                summary: 'Caution',
                detail: 'Switched to amendment Mode! All changes will be tracked',
            });
            this.userEditingModePreference.setEditingMode(
                EditingModes.AMENDMENT
            );
        }
    }
    getDelegatedLegislation() {
        this.delegatedLegislationDataService
            .AdminGetDelegatedLegislationDetails(this.delegatedLegislationId)
            .subscribe((res) => {
                this.delegatedLegislation = res;
            });
    }

    getSections() {
        this.sectionDataService
            .AdminGetSectionsByDelegatedLegislation(this.delegatedLegislationId)
            .subscribe((res) => {
                console.log(res, 'SECTIONPOS');
                this.sections = res;
            });
    }

    getTableOfContents() {
        this.sectionDataService
            .AdminGetTOCByDelegatedLegislation(this.delegatedLegislationId)
            .subscribe((res) => {
                console.log(res, 'TOC');
                this.tableOfContent = res;
            });
    }

    isActive(id: number) {
        return id === Number(this.activeSectionId) ? true : false;
    }

    scroll(id: string) {
        this.eventsSubject.next(id);
    }

    openEditDelegatedLegislationModal() {
        this.ref = this.dialogService.open(
            AdminDraftLegislationEditModalComponent,
            {
                header: 'Edit',
                data: { ...this.delegatedLegislation },
            }
        );
    }
}
