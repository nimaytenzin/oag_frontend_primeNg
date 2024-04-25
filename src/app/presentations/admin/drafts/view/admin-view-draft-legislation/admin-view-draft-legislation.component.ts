import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject } from 'rxjs';
import {
    EditingModes,
    LanguageType,
    SectionType,
} from 'src/app/core/constants/enums';
import { DelegatedLegislationDataService } from 'src/app/core/dataservice/delegated-legislations/delegated-legislation.dataservice';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { LegislativeHistoryDataService } from 'src/app/core/dataservice/legislative-history/legislative-history.dataservice';
import { SearchService } from 'src/app/core/dataservice/search/search.dataservice';
import { DocumentCopyDataService } from 'src/app/core/dataservice/storage/document-copy.service';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { DocumentCopyDto } from 'src/app/core/dto/storage/document-copy.dto';
import {
    GetSectionStylesPublic,
    GetTocStylesAdmin,
} from 'src/app/core/utility/documentStyles';
import { ParseAmendmentChangeType } from 'src/app/core/utility/parser';
import { PublicViewLegislationShowAmmendmentModalComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-ammendment-modal/public-view-legislation-show-ammendment-modal.component';
import { PublicViewLegislationShowDelegatedLegislationsComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-delegated-legislations/public-view-legislation-show-delegated-legislations.component';
import { PublicViewLegislationShowLegislativeHistoryComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-legislative-history/public-view-legislation-show-legislative-history.component';
import { PublicViewLegislationShowSearchResultModalComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { AdminViewLegislationAddSectionModalComponent } from './modals/admin-view-legislation-add-section-modal/admin-view-legislation-add-section-modal.component';
import { AdminViewLegislationInsertSectionModalComponent } from './modals/admin-view-legislation-insert-section-modal/admin-view-legislation-insert-section-modal.component';
import { UserEditModePreference } from 'src/app/core/sessionStates/user-editing-mode.selection.service';
import { AdminViewDraftLegislationEditLegislationModalComponent } from './components/admin-view-draft-legislation-edit-legislation-modal/admin-view-draft-legislation-edit-legislation-modal.component';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { AdminViewDraftLegislationSectionsTabComponent } from './tabs/admin-view-draft-legislation-sections-tab/admin-view-draft-legislation-sections-tab.component';

@Component({
    selector: 'app-admin-view-draft-legislation',
    standalone: true,
    imports: [
        CommonModule,
        TooltipModule,
        TabMenuModule,
        MenubarModule,
        ButtonModule,
        SelectButtonModule,
        InputTextModule,
        FormsModule,
        DropdownModule,
        SplitButtonModule,
        ToastModule,
        OverlayPanelModule,
        SelectButtonModule,
        TimelineModule,
        FieldsetModule,
        DividerModule,
        AdminViewDraftLegislationSectionsTabComponent,
    ],
    providers: [DialogService],
    templateUrl: './admin-view-draft-legislation.component.html',
    styleUrl: './admin-view-draft-legislation.component.scss',
})
export class AdminViewDraftLegislationComponent {
    legislationId: number;

    legislation: LegislationDto;
    legislativeHistory: LegislationDto[];
    sections: SectionDto[] = [];
    delegatedLegislations: DelegatedLegislationDto[];

    legislationDates: any[];

    editingModes = EditingModes;
    documentCopies: DocumentCopyDto[];

    getTocStyles = GetTocStylesAdmin;
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    tableOfContent: SectionDto[] = [];

    ref: DynamicDialogRef | undefined;
    activeSectionId: string;

    languageType = LanguageType;
    selectedLanguage: string = LanguageType.ENG;

    selectedEditingMode = this.editingModes.NORMAL;

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

    constructor(
        private route: ActivatedRoute,
        private legislationDataService: LegislationDataService,
        private sectionDataService: SectionDataService,
        private sanitizer: DomSanitizer,
        private dialogService: DialogService,
        private titleService: Title,
        private searchService: SearchService,
        private delegatedLegislationDataService: DelegatedLegislationDataService,
        private legislativeHistoryDataService: LegislativeHistoryDataService,
        private documentCopyDataService: DocumentCopyDataService,
        private messageService: MessageService,
        private userEditingModePreference: UserEditModePreference
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.legislationId = params['legislationId'];
            this.getLegislationDetails();
            this.getSections();
            this.getTableOfContents();

            this.getDocumentCopies();

            this.delegatedLegislationDataService
                .GetAllDelegatedLegislationByParentLegislation(
                    this.legislationId
                )
                .subscribe((res) => {
                    this.delegatedLegislations = res;
                });
        });

        this.items = [
            {
                label: 'Sections',
                command: () => this.showLegislativeHistory(),
            },
            {
                label: 'Document Copies',
                command: () => this.showDelegatedLegislations(),
            },
            {
                label: 'Legislation Relationships',
                command: () => this.showDelegatedLegislations(),
            },
            {
                label: 'Delegated Legislations',
                command: () => this.showDelegatedLegislations(),
            },
        ];
    }

    switchEditingMode(editingMode: EditingModes) {
        if (editingMode === EditingModes.NORMAL) {
            this.selectedEditingMode = EditingModes.NORMAL;
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

    getLegislationDetails() {
        this.legislationDataService
            .GetLegislationDetails(this.legislationId)
            .subscribe((res) => {
                this.legislation = res;
                this.titleService.setTitle(res.title_eng);

                this.legislationDates = [
                    {
                        particular: 'Tabled Date',
                        date: this.legislation.tabledDate
                            ? this.legislation.tabledDate
                            : null,
                    },
                    {
                        particular: 'Enactment Date',
                        date: this.legislation.enactmentDate
                            ? this.legislation.enactmentDate
                            : null,
                    },
                    {
                        particular: 'Commencement  Date',
                        date: this.legislation.commencementDate
                            ? this.legislation.commencementDate
                            : null,
                    },
                    {
                        particular: 'Repeal Date',
                        date: this.legislation.repealDate
                            ? this.legislation.commencementDate
                            : null,
                    },
                ];
            });
    }

    getSectionId(section: SectionDto) {
        if (section?.type === SectionType.CLAUSE) {
            return `clause-${section.id}`;
        } else {
            return `section-${section.id}`;
        }
    }

    getSections() {
        this.sectionDataService
            .GetAllSectionsByLegislation(this.legislationId)
            .subscribe((res) => {
                this.sections = res;
                console.log(this.sections, 'INSIDE PARENT');
            });
    }
    getTableOfContents() {
        this.sectionDataService
            .GetTableOfContentByLegislation(this.legislationId)
            .subscribe((res) => {
                this.tableOfContent = res;
            });
    }

    sanitizeHtml(html: string | undefined): SafeHtml {
        if (html) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        } else {
            return this.sanitizer.bypassSecurityTrustHtml('');
        }
    }

    showDelegatedLegislations() {
        this.ref = this.dialogService.open(
            PublicViewLegislationShowDelegatedLegislationsComponent,
            {
                data: {
                    delegatedLegislations: this.delegatedLegislations,
                    legislation: this.legislation,
                },
                width: '50%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
            }
        );
    }

    showLegislativeHistory() {
        this.ref = this.dialogService.open(
            PublicViewLegislationShowLegislativeHistoryComponent,
            {
                header: 'Legislative History',
                width: '50%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
            }
        );
    }

    showAmmendmentDetails(amendment: AmendmentDto) {
        this.ref = this.dialogService.open(
            PublicViewLegislationShowAmmendmentModalComponent,
            {
                header: amendment.title_eng,
                width: '50%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                data: amendment,
                maximizable: true,
            }
        );
    }

    getDocumentCopies() {
        this.documentCopyDataService
            .GetDocumentCopiesByLegislation(this.legislationId)
            .subscribe((res) => {
                this.documentCopies = res;
            });
    }

    getToolTipLabel(lang: string): string | void {
        if (lang === LanguageType.BI) {
            return 'Download copy in Bilingual';
        }
        if (lang === LanguageType.ENG) {
            return 'Download copy in English';
        }
        if (lang === LanguageType.DZO) {
            return 'Download copy in Dzongkha';
        }
    }

    parseDocumentLanguage(lang: string): string | void {
        if (lang === LanguageType.BI) {
            return 'bilingual';
        }
        if (lang === LanguageType.ENG) {
            return 'english';
        }
        if (lang === LanguageType.DZO) {
            return 'རྫོང་ཁ';
        }
    }

    getDocumentLink(path: string) {
        return this.documentCopyDataService.getDocumentUri(path);
    }

    isActive(id: number) {
        return id === Number(this.activeSectionId) ? true : false;
    }

    //SECTIONS

    save() {}

    //CRUD MODALS
    openEditLegislationModal() {
        this.ref = this.dialogService.open(
            AdminViewDraftLegislationEditLegislationModalComponent,
            {
                header: 'Edit Legislation',
                width: '40%',
                data: this.legislation,

                baseZIndex: 10000,
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Saved',
                    detail: 'Changes Saved',
                });
                this.getLegislationDetails();
            }
        });
    }
}
