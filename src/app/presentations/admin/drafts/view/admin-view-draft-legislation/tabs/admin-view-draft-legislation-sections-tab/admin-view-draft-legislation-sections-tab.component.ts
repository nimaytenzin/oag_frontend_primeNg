import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
    AmendmentChangeType,
    LanguageType,
    SectionType,
} from 'src/app/core/constants/enums';
import { SearchService } from 'src/app/core/dataservice/search/search.dataservice';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { AdminViewLegislationInsertSectionModalComponent } from 'src/app/presentations/admin/drafts/view/admin-view-draft-legislation/modals/admin-view-legislation-insert-section-modal/admin-view-legislation-insert-section-modal.component';
import { PublicViewLegislationShowSearchResultModalComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { AdminViewLegislationAddSectionModalComponent } from '../../modals/admin-view-legislation-add-section-modal/admin-view-legislation-add-section-modal.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { AdminViewLegislationEditSectionModalComponent } from '../../modals/admin-view-legislation-edit-section-modal/admin-view-legislation-edit-section-modal.component';
import { AdminViewAmendmentsModalComponent } from '../../../shared-components/admin-view-amendments-modal/admin-view-amendments-modal.component';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';

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
    @Input() events: Observable<string>;
    private eventsSubscription: Subscription;
    @Output() requestUpdateSection = new EventEmitter<string>();

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
        private searchService: SearchService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private sectionDataservice: SectionDataService,
        private viewportScroller: ViewportScroller
    ) {}
    ngOnInit(): void {
        this.eventsSubscription = this.events.subscribe((res) => {
            this.scroll(res);
        });
    }

    getChangeTypeLabel(type: string) {
        if (type === AmendmentChangeType.DELETION) {
            return 'Repealed by';
        }
        if (type === AmendmentChangeType.MODIFICATION) {
            return 'Amended by';
        }
        if (type === AmendmentChangeType.CREATION) {
            return 'Added by';
        }
        return '';
    }
    openViewAmendmentModal(item: AmendmentDto) {
        this.ref = this.dialogService.open(AdminViewAmendmentsModalComponent, {
            header: item.title_eng,
            width: '50%',
            data: item,
        });
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
        // this.activeSectionId = id;
        // let el = document.getElementById(id)!;
        // let elementPosition =
        //     el.getBoundingClientRect().top + window.pageYOffset;
        // let headerHeight = document.getElementById('nima')?.clientHeight || 0;
        // let offsetPosition = elementPosition - headerHeight;

        // window.scrollTo({
        //     top: offsetPosition,
        //     behavior: 'smooth',
        // });
        this.activeSectionId = id;
        let el = document.getElementById(id);
        if (el) {
            console.log('SCROLL TO ', 0, el.offsetTop);
            this.viewportScroller.scrollToPosition([
                0, // x-coordinate
                el.offsetTop, // y-coordinate
            ]);
        }
    }

    // CRUD
    openInsertSectionInBetween(
        topSection: SectionDto,
        bottomSection: SectionDto
    ) {
        this.ref = this.dialogService.open(
            AdminViewLegislationInsertSectionModalComponent,
            {
                header: 'Insert Section',
                maximizable: true,
                width: '60%',

                appendTo: 'body',
                data: {
                    topSection: topSection,
                    legislationId: this.legislationId,
                    bottomSection: bottomSection,
                },

                modal: true,
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 201) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Added',
                    detail: 'New Section Inserted successfully',
                });
                this.requestUpdateSection.emit('1');
            }
        });
    }

    addSectionModal() {
        this.ref = this.dialogService.open(
            AdminViewLegislationAddSectionModalComponent,
            {
                header: 'Add Section',
                maximizable: true,
                width: '60%',

                data: { legislationId: this.legislationId },
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 201) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Added',
                    detail: 'New Section Added successfully',
                });
                this.requestUpdateSection.emit('1');
            }
        });
    }

    openEditSectionModal(item: SectionDto) {
        this.ref = this.dialogService.open(
            AdminViewLegislationEditSectionModalComponent,
            {
                header: 'Edit Section',
                maximizable: true,
                width: '60%',
                data: { ...item },
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Updated',
                    detail: 'Updated successfully',
                });
                this.requestUpdateSection.emit('1');
            }
        });
    }

    openDeleteConfirmModal(item: SectionDto) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',

            accept: () => {
                this.sectionDataservice.AdminDeleteSection(item.id).subscribe({
                    next: (res) => {
                        if (res) {
                            this.messageService.add({
                                severity: 'info',
                                summary: 'Confirmed',
                                detail: 'Record deleted',
                            });
                            this.requestUpdateSection.emit('1');
                        }
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Unexpected error',
                            detail: 'Sorry la!',
                        });
                    },
                });
            },
            reject: () => {},
        });
    }
}
