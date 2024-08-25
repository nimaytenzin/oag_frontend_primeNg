import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import {
    LanguageType,
    AmendmentChangeType,
    SectionType,
    EditingModes,
} from 'src/app/core/constants/enums';
import { SectionDataService } from 'src/app/core/dataservice/legislations/sections.dataservice';
import { SearchService } from 'src/app/core/dataservice/search/search.dataservice';
import {
    AmendmentDto,
    DetermineAmendmentAndCreateChangeDto,
} from 'src/app/core/dto/ammendment/ammendment.dto';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { PublicViewLegislationShowSearchResultModalComponent } from 'src/app/presentations/public/legislations/view/public-view-legislation/components/public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { AdminViewLegislationAddSectionModalComponent } from '../../../admin-view-draft-legislation/modals/admin-view-legislation-add-section-modal/admin-view-legislation-add-section-modal.component';
import { AdminViewLegislationEditSectionModalComponent } from '../../../admin-view-draft-legislation/modals/admin-view-legislation-edit-section-modal/admin-view-legislation-edit-section-modal.component';
import { AdminViewLegislationInsertSectionModalComponent } from '../../../admin-view-draft-legislation/modals/admin-view-legislation-insert-section-modal/admin-view-legislation-insert-section-modal.component';
import { AdminDetermineAmendmentModalComponent } from '../../../shared-components/admin-determine-amendment-modal/admin-determine-amendment-modal.component';
import { AdminViewAmendmentsModalComponent } from '../../../shared-components/admin-view-amendments-modal/admin-view-amendments-modal.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HighlighterPipe } from 'src/app/core/utility/text.highlighter.pipes';

@Component({
    selector: 'app-admin-delegated-legislation-sections-tab',
    templateUrl: './admin-delegated-legislation-sections-tab.component.html',
    styleUrls: ['./admin-delegated-legislation-sections-tab.component.css'],
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        FormsModule,
        InputTextModule,
        HighlighterPipe,
    ],
    providers: [DialogService],
})
export class AdminDelegatedLegislationSectionsTabComponent implements OnInit {
    @Input() sections: SectionDto[];
    @Input() selectedLanguage;
    @Input({ required: true }) editingMode;
    @Input() delegatedLegislationId;
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
        const container = event.target;
        const sectionElements = document.getElementsByClassName('heading');

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
    searchLegislation() {}

    scroll(id: string) {
        let container = document.getElementById('sectionTab'); // Replace with your container class or ID

        console.log('SCROLL TO', id);
        this.activeSectionId = id;
        let el = document.getElementById(id);

        if (el && container) {
            container.scrollTo({
                top: el.offsetTop - 300,
                behavior: 'smooth',
            });
        }
    }

    getFirstAndLastSectionId(): {
        firstSectionId: string;
        lastSectionId: string;
    } {
        if (!this.sections || this.sections.length === 0) {
            return { firstSectionId: '', lastSectionId: '' };
        }

        const firstSection = this.sections[0];
        const lastSection = this.sections[this.sections.length - 1];

        const firstSectionId = this.getSectionId(firstSection);
        const lastSectionId = this.getSectionId(lastSection);

        return { firstSectionId, lastSectionId };
    }

    // Scroll to the top section
    scrollToTop() {
        const { firstSectionId } = this.getFirstAndLastSectionId();
        this.scroll(firstSectionId);
    }

    // Scroll to the bottom section
    scrollToEnd() {
        const { lastSectionId } = this.getFirstAndLastSectionId();
        this.scroll(lastSectionId);
    }

    // CRUD
    openInsertSectionInBetween(
        topSection: SectionDto,
        bottomSection: SectionDto
    ) {}

    addSectionModal() {}

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
                if (this.editingMode === EditingModes.NORMAL) {
                    this.sectionDataservice
                        .AdminDeleteSection(item.id)
                        .subscribe({
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
                } else {
                    const data: DetermineAmendmentAndCreateChangeDto = {
                        changeType: AmendmentChangeType.DELETION,
                        clause_eng: item.clause_eng,
                        clause_dzo: item.clause_dzo,
                        type: item.type,
                        order: item.order,
                        sectionId: item.id,
                        legislationId: item.legislationId,
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
                }
            },
            reject: () => {},
        });
    }
}
