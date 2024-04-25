import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject } from 'rxjs';
import { LanguageType, SectionType } from 'src/app/core/constants/enums';
import { SearchService } from 'src/app/core/dataservice/search/search.dataservice';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { AdminViewLegislationInsertSectionModalComponent } from 'src/app/presentations/admin/drafts/view/admin-view-draft-legislation/modals/admin-view-legislation-insert-section-modal/admin-view-legislation-insert-section-modal.component';
import { PublicViewLegislationShowSearchResultModalComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { AdminViewLegislationAddSectionModalComponent } from '../../modals/admin-view-legislation-add-section-modal/admin-view-legislation-add-section-modal.component';

@Component({
    selector: 'app-admin-view-draft-legislation-sections-tab',
    standalone: true,
    imports: [ButtonModule, CommonModule, FormsModule, InputTextModule],
    providers: [DialogService],
    templateUrl: './admin-view-draft-legislation-sections-tab.component.html',
    styleUrl: './admin-view-draft-legislation-sections-tab.component.scss',
})
export class AdminViewDraftLegislationSectionsTabComponent implements OnInit {
    @Input() sections: SectionDto[];
    @Input() selectedLanguage;
    @Input() legislationId;

    searchKeywords: string;

    private fontSizeHeadingSubject = new BehaviorSubject<number>(20);
    private fontSizeContentSubject = new BehaviorSubject<number>(18);
    private fontSizeAmmendmentNoteSubject = new BehaviorSubject<number>(14);

    public fontSizeAmmendmentNotes$ =
        this.fontSizeAmmendmentNoteSubject.asObservable();
    public fontSizeHeading$ = this.fontSizeHeadingSubject.asObservable();
    public fontSizeContent$ = this.fontSizeContentSubject.asObservable();

    getSectionStyles = GetSectionStylesPublic;
    activeSectionId: string;
    languageType = LanguageType;
    instance: DynamicDialogComponent | undefined;
    ref: DynamicDialogRef | undefined;
    constructor(
        private sanitizer: DomSanitizer,
        private dialogService: DialogService,
        private searchService: SearchService
    ) {}
    ngOnInit(): void {
        console.log('INSIDE SECTIO TAB');
        console.log(this.sections);
    }

    addSection() {
        this.ref = this.dialogService.open(
            AdminViewLegislationAddSectionModalComponent,
            {
                header: 'Add Section',
                maximizable: true,
                width: '80%',
                height: '80%',
            }
        );
    }
    sanitizeHtml(html: string | undefined): SafeHtml {
        if (html) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        } else {
            return this.sanitizer.bypassSecurityTrustHtml('');
        }
    }
    getSectionId(section: SectionDto) {
        if (section?.type === SectionType.CLAUSE) {
            return `clause-${section.id}`;
        } else {
            return `section-${section.id}`;
        }
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

    openInsertSectionInBetween(
        topSection: SectionDto,
        bottomSection: SectionDto
    ) {
        console.log('TOP SECTION', topSection);
        console.log('BOTTOM ORDER', bottomSection);
        this.ref = this.dialogService.open(
            AdminViewLegislationInsertSectionModalComponent,
            {
                header: 'Insert Section',
                maximizable: true,
                width: '80%',
                height: '80%',
                appendTo: 'body',
                data: {
                    topSection: topSection,
                    bottomSection: bottomSection,
                },

                modal: true,
            }
        );
    }

    // styles

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

    //fontsize
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

    //search
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

    scroll(id: string) {
        this.activeSectionId = id;
        let el = document.getElementById(id)!;
        let elementPosition = el.getBoundingClientRect().top;
        let offsetPosition =
            elementPosition +
            window.pageYOffset -
            document.getElementById('nima').clientHeight -
            80;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
}
