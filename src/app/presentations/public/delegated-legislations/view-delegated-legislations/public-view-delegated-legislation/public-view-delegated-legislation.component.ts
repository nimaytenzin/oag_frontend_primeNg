import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { PublicViewLegislationShowAmmendmentModalComponent } from '../../../legislations/view/public-view-legislation/components/public-view-legislation-show-ammendment-modal/public-view-legislation-show-ammendment-modal.component';
import { PublicViewLegislationShowDelegatedLegislationsComponent } from '../../../legislations/view/public-view-legislation/components/public-view-legislation-show-delegated-legislations/public-view-legislation-show-delegated-legislations.component';
import { PublicViewLegislationShowLegislativeHistoryComponent } from '../../../legislations/view/public-view-legislation/components/public-view-legislation-show-legislative-history/public-view-legislation-show-legislative-history.component';
import { PublicViewLegislationShowSearchResultModalComponent } from '../../../legislations/view/public-view-legislation/components/public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { ToastModule } from 'primeng/toast';
import { PublicViewDelegatedLegislationsShowParentLegislationModalComponent } from '../components/public-view-delegated-legislations-show-parent-legislation-modal/public-view-delegated-legislations-show-parent-legislation-modal.component';

@Component({
    selector: 'app-public-view-delegated-legislation',
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
        ToastModule,
    ],
    providers: [DialogService, MessageService],
    templateUrl: './public-view-delegated-legislation.component.html',
    styleUrl: './public-view-delegated-legislation.component.scss',
})
export class PublicViewDelegatedLegislationComponent {
    delegatedLegislationId: number;
    delegatedLegislation: DelegatedLegislationDto;
    legislativeHistory: LegislationDto[];
    sections: SectionDto[] = [];
    delegatedLegislations: DelegatedLegislationDto[];

    documentCopies: DocumentCopyDto[];
    private fontSizeHeadingSubject = new BehaviorSubject<number>(32);
    private fontSizeContentSubject = new BehaviorSubject<number>(20);
    private fontSizeAmmendmentNoteSubject = new BehaviorSubject<number>(18);

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
        this.route.params.subscribe((params) => {
            this.delegatedLegislationId = params['delegatedLegislationId'];
            this.getLegislationDetails();
            this.getSections();
            this.getTableOfContents();
            this.getDocumentCopies();
        });

        this.items = [
            {
                label: 'Legislative History ',
                icon: 'pi pi-fw pi-calendar',
                command: () => this.showLegislativeHistory(),
            },
            {
                label: 'Parent Legislation',
                icon: 'pi pi-fw pi-file',
                command: () => this.showParentLegislation(),
            },
        ];
    }

    getLegislationDetails() {
        this.delegatedLegislationDataService
            .PublicGetDelegatedLegislationDetails(this.delegatedLegislationId)
            .subscribe((res) => {
                this.delegatedLegislation = res;
                this.titleService.setTitle(res.title_eng);
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
            .PublicGetSectionsByDelegatedLegislation(
                this.delegatedLegislationId
            )
            .subscribe((res) => {
                this.sections = res;
            });
    }
    getTableOfContents() {
        this.sectionDataService
            .PublicGetTOCByDelegatedLegislation(this.delegatedLegislationId)
            .subscribe((res) => {
                this.tableOfContent = res;
            });
    }

    searchdelegatedLegislation() {
        console.log('Searching for ', this.searchKeywords);
        this.searchService
            .PublicSearchInDelegatedLegislation({
                keyword: this.searchKeywords,
                delegatedLegislationId: this.delegatedLegislationId,
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

    showParentLegislation() {
        if (this.delegatedLegislation.legislationId) {
            console.log('Parent legislations Exists');

            this.ref = this.dialogService.open(
                PublicViewDelegatedLegislationsShowParentLegislationModalComponent,
                {
                    data: {
                        ...this.delegatedLegislation.legislation,
                    },
                    header: 'Parent Legislation',
                    width: '50%',
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                    maximizable: true,
                }
            );
        } else {
            console.log('Parent legislations Doesnot Exists');

            this.messageService.add({
                severity: 'info',
                summary: 'No Parent Legislation',
                detail: 'Parent Legislation not added',
            });
        }
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
        // this.documentCopyDataService
        //     .GetDocumentCopiesByLegislation(this.legislationId)
        //     .subscribe((res) => {
        //         this.documentCopies = res;
        //     });
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
        // console.log(`scrolling to ${id}`);
        // let el = document.getElementById(id)!;
        // el.scrollIntoView({ behavior: 'smooth', block: 'start' });

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
            console.log(this.activeSectionId);
            console.log(`Section ${topSectionId} has passed the container.`);
            // You can now use topSectionId to perform any action you need
        }
    }

    isActive(id: number) {
        return id === Number(this.activeSectionId) ? true : false;
    }
}
