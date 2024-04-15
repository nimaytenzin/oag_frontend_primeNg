import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject } from 'rxjs';
import { LanguageType, SectionType } from 'src/app/core/constants/enums';
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
import { ToastModule } from 'primeng/toast';
import { AdminViewLegislationAddSectionModalComponent } from './modals/admin-view-legislation-add-section-modal/admin-view-legislation-add-section-modal.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { AdminViewLegislationInsertSectionModalComponent } from './modals/admin-view-legislation-insert-section-modal/admin-view-legislation-insert-section-modal.component';

@Component({
    selector: 'app-admin-view-legislation',
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
    ],
    providers: [DialogService, MessageService],
    templateUrl: './admin-view-legislation.component.html',
    styleUrl: './admin-view-legislation.component.scss',
})
export class AdminViewLegislationComponent {
    legislationId: number;
    legislation: LegislationDto;
    legislativeHistory: LegislationDto[];
    sections: SectionDto[] = [];
    delegatedLegislations: DelegatedLegislationDto[];

    documentCopies: DocumentCopyDto[];
    private fontSizeHeadingSubject = new BehaviorSubject<number>(20);
    private fontSizeContentSubject = new BehaviorSubject<number>(18);
    private fontSizeAmmendmentNoteSubject = new BehaviorSubject<number>(14);

    public fontSizeAmmendmentNotes$ =
        this.fontSizeAmmendmentNoteSubject.asObservable();
    public fontSizeHeading$ = this.fontSizeHeadingSubject.asObservable();
    public fontSizeContent$ = this.fontSizeContentSubject.asObservable();

    getSectionStyles = GetSectionStylesPublic;
    getTocStyles = GetTocStylesAdmin;
    items: MenuItem[] | undefined;
    activeItem: MenuItem | undefined;
    tableOfContent: SectionDto[] = [];

    ref: DynamicDialogRef | undefined;
    activeSectionId: string;

    languageType = LanguageType;
    selectedLanguage: string = LanguageType.ENG;
    searchKeywords: string;

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
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.messageService.add({
            severity: 'info',
            summary: 'hii',
            detail: 'Welcome',
        });
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
                label: 'Legislative History ',
                icon: 'pi pi-fw pi-calendar',
                command: () => this.showLegislativeHistory(),
            },
            {
                label: 'Delegated Legislation',
                icon: 'pi pi-fw pi-file',
                command: () => this.showDelegatedLegislations(),
            },
        ];
        this.speeddialItems = [
            {
                label: 'Chapter Heading',
                command: () => {
                    this.addSection(SectionType.HEADING_1);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Add',
                        detail: 'Data Added',
                    });
                },
            },
            {
                label: 'Chapter Name',
                command: () => {
                    this.addSection(SectionType.HEADING_2);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Add',
                        detail: 'Data Added',
                    });
                },
            },
            {
                label: 'Section Heading',
                command: () => {
                    this.addSection(SectionType.SUBSECTION_H1);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Add',
                        detail: 'Data Added',
                    });
                },
            },
            {
                label: 'Section/Clause',
                command: () => {
                    this.addSection(SectionType.CLAUSE);
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Add',
                        detail: 'Data Added',
                    });
                },
            },
        ];
    }

    getLegislationDetails() {
        this.legislationDataService
            .GetLegislationDetails(this.legislationId)
            .subscribe((res) => {
                this.legislation = res;
                this.titleService.setTitle(res.title_eng);
                this.legislativeHistoryDataService
                    .GetLegislationsSortedByLegislationGroup(
                        this.legislation.legislationGroupId
                    )
                    .subscribe((res) => {
                        this.legislativeHistory = res;
                    });
            });
    }

    public increaseFontSize(): void {
        this.fontSizeAmmendmentNoteSubject.next(
            this.fontSizeAmmendmentNoteSubject.getValue() + 1
        );
        this.fontSizeHeadingSubject.next(
            this.fontSizeHeadingSubject.getValue() + 1
        );
        this.fontSizeContentSubject.next(
            this.fontSizeContentSubject.getValue() + 1
        );
    }

    public decreaseFontSize(): void {
        this.fontSizeAmmendmentNoteSubject.next(
            this.fontSizeAmmendmentNoteSubject.getValue() - 1
        );
        this.fontSizeHeadingSubject.next(
            this.fontSizeHeadingSubject.getValue() - 1
        );
        this.fontSizeContentSubject.next(
            this.fontSizeContentSubject.getValue() - 1
        );
    }

    getSections() {
        this.sectionDataService
            .GetAllSectionsByLegislation(this.legislationId)
            .subscribe((res) => {
                this.sections = res;
            });
    }
    getTableOfContents() {
        this.sectionDataService
            .GetTableOfContentByLegislation(this.legislationId)
            .subscribe((res) => {
                this.tableOfContent = res;
            });
    }

    searchLegislation() {
        this.searchService
            .SearchInLegislation({
                keyword: this.searchKeywords,
                legislationId: this.legislationId,
            })
            .subscribe((res) => {
                this.dialogService
                    .open(PublicViewLegislationShowSearchResultModalComponent, {
                        header: 'Search Results',
                        data: {
                            searchKeyword: this.searchKeywords,
                            results: res,
                        },
                        width: '70%',
                        contentStyle: { overflow: 'auto' },
                        baseZIndex: 10000,
                        maximizable: true,
                    })
                    .onClose.subscribe((item: SectionDto) => {
                        if (item) {
                            this.activeSectionId = 'section-' + item.id;
                            this.scroll(this.getSectionId(item));
                        }
                    });
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

    getSectionId(section: SectionDto) {
        if (section?.type === SectionType.CLAUSE) {
            return `clause-${section.id}`;
        } else {
            return `section-${section.id}`;
        }
    }

    highlightSelectedSection(section: SectionDto) {
        if (section.type === SectionType.CLAUSE) {
            if ('clause-' + section.id === this.activeSectionId) {
                return ' border-left-2 surface-100';
            }
        } else {
            if ('section-' + section.id === this.activeSectionId) {
                return ' border-left-2 surface-100';
            }
        }

        return 'border-left-2 border-transparent';
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

    scroll(id: string) {
        this.activeSectionId = id;
        let el = document.getElementById(id)!;
        let elementPosition = el.getBoundingClientRect().top;
        let offsetPosition =
            elementPosition +
            window.pageYOffset -
            document.getElementById('nima').clientHeight -
            30;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    onContainerScroll(event: any) {
        const container = event.target; // Use the event target to get the container
        const sectionElements = document.getElementsByClassName('heading');

        // Assuming 'section' is the class name for your sections
        let topSectionId: string | null = null;
        let topSectionOffset = Infinity;

        for (let i = 0; i < sectionElements.length; i++) {
            const section = sectionElements[i] as HTMLElement;
            const sectionRect = section.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Calculate the offset of the section from the top of the container
            const offset = Math.abs(sectionRect.top - containerRect.top);

            // Check if the section has passed the container
            if (
                sectionRect.top < containerRect.top &&
                offset < topSectionOffset
            ) {
                topSectionId = section.id;
                topSectionOffset = offset;
            }
        }

        if (topSectionId) {
            this.activeSectionId = topSectionId.split('-')[1];

            // You can now use topSectionId to perform any action you need
        }
    }

    isActive(id: number) {
        return id === Number(this.activeSectionId) ? true : false;
    }

    //SECTIONS

    addSection(type?: SectionType) {
        this.ref = this.dialogService.open(
            AdminViewLegislationAddSectionModalComponent,
            {
                header: 'Add Section | ' + this.legislation.title_eng,
                maximizable: true,
                width: '50%',
                height: '50vh',
                data: {
                    type: type,
                    legislation: this.legislation,
                },
            }
        );
    }

    openInsertSectionInBetween(
        topSection: SectionDto,
        bottomSection: SectionDto
    ) {
        console.log('TOP SECTION', topSection);
        console.log('BOTTOM ORDER', bottomSection);
        this.ref = this.dialogService.open(
            AdminViewLegislationInsertSectionModalComponent,
            {
                header: 'Insert Section | ' + this.legislation.title_eng,
                maximizable: true,
                width: '80vw',
                height: '80vh',
                data: {
                    legislation: this.legislation,
                    topSection: topSection,
                    bottomSection: bottomSection,
                },

                modal: true,
            }
        );
    }

    save() {}
}
