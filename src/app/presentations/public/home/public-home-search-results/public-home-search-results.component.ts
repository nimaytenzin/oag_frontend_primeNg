import {
    trigger,
    transition,
    style,
    animate,
    query,
    animateChild,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SearchService } from 'src/app/core/dataservice/search/search.dataservice';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { HighlighterPipe } from 'src/app/core/utility/text.highlighter.pipes';
import { gsap } from 'gsap';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent, ROWSPERPAGEOPTION } from 'src/app/core/constants/constants';
import { PaginatedData } from 'src/app/core/dto/utility/paginated-data.dto';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { DocumentType, SEARCHDOCUMENTYPES } from 'src/app/core/constants/enums';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

enum SEARCHSUBJECT {
    DL_TITLE = 'DelegatedLegislation_Title',
    L_TITLE = 'Legislation_Title',
    SECTION = 'Sections',
}

@Component({
    selector: 'app-public-home-search-results',
    standalone: true,
    imports: [
        ChipsModule,
        ButtonModule,
        CheckboxModule,
        FormsModule,
        DropdownModule,
        TableModule,
        DividerModule,
        CommonModule,
        HighlighterPipe,
        PaginatorModule,
    ],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('0.8s', style({ opacity: 1 })),
            ]),
            transition(':leave', [animate('0.3s', style({ opacity: 0 }))]),
        ]),
    ],
    templateUrl: './public-home-search-results.component.html',
    styleUrl: './public-home-search-results.component.scss',
})
export class PublicHomeSearchResultsComponent implements OnInit {
    searchKeywords: string[] = [];
    searchKeywordsBar: string[] = [];
    searchInTitle: boolean = true;
    isSearching: boolean = true;

    //paginations
    rowsPerPageOptions = ROWSPERPAGEOPTION;
    firstPageNumber = 0;
    rows = ROWSPERPAGEOPTION[0];
    currentPage = 1;
    searchTitle: string;

    paginatedSections: PaginatedData<SectionDto> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };

    paginatedLegislations: PaginatedData<LegislationDto> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };

    paginatedDelegatedLegislations: PaginatedData<DelegatedLegislationDto> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };

    getSectionStyles = GetSectionStylesPublic;
    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string;

    searchSubject: string;
    searchSubects = SEARCHSUBJECT;

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService,
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {
        this.titleService.setTitle('Search Results');
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.searchKeywords = params['Keyword'].split(',');
            this.searchKeywordsBar = params['Keyword'].split(',');
            this.searchDocumentType = params['In'];
            this.searchInTitle = params['Within'] === 'Title' ? true : false;
            this.search();
        });
    }

    onPageChange(event: PageEvent): void {
        this.firstPageNumber = event.first;
        this.currentPage = event.page + 1;
        this.rows = event.rows;
        this.handlePagination();
    }

    handlePagination() {
        this.isSearching = true;
        if (this.searchInTitle) {
            if (this.searchDocumentType === 'Legislations') {
                this.searchSubject = this.searchSubects.L_TITLE;
                this.searchService
                    .PublicSearchForKeywordInLegislationWithinTitle({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedLegislations = res;
                        this.isSearching = false;
                        this.searchTitle = `Results for keyword ${this.searchKeywords.join(
                            ','
                        )}`;
                    });
            } else {
                this.searchSubject = this.searchSubects.DL_TITLE;

                this.searchService
                    .PublicSearchForKeywordInDelegatedLegislationWithinTitle({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedDelegatedLegislations = res;
                        this.isSearching = false;
                        this.searchTitle =
                            'Results for keyword ' +
                            this.searchKeywords.join(',');
                    });
            }
        } else {
            this.searchSubject = this.searchSubects.SECTION;

            if (this.searchDocumentType === 'Legislations') {
                this.searchService
                    .PublicSearchForKeywordInLegislationWithinContent({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedSections = res;
                        this.isSearching = false;
                        this.searchTitle = `Results for keyword ${this.searchKeywords.join(
                            ','
                        )}`;
                    });
            } else {
                this.searchService
                    .PublicSearchForKeywordInDelegatedLegislationWithinContent({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedSections = res;
                        this.isSearching = false;
                        this.searchTitle = `Results for keyword ${this.searchKeywords.join(
                            ','
                        )}`;
                    });
            }
        }
    }

    public updateQueryParams(keyword, queryIn, queryWithin) {
        const queryParams = {
            Keyword: keyword,
            In: queryIn,
            Within: queryWithin,
        };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    search() {
        this.isSearching = true;
        this.searchKeywords = this.searchKeywordsBar;
        this.updateQueryParams(
            this.searchKeywords.join(','),
            this.searchDocumentType,
            this.searchInTitle ? 'Title' : 'Content'
        );
        if (this.searchInTitle) {
            this.paginatedSections.data = [];
            if (this.searchDocumentType === 'Legislations') {
                this.searchService
                    .PublicSearchForKeywordInLegislationWithinTitle({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedLegislations = res;
                        this.isSearching = false;
                        this.searchTitle = `Results for keyword ${this.searchKeywords.join(
                            ','
                        )}`;
                    });
            } else {
                this.searchService
                    .PublicSearchForKeywordInDelegatedLegislationWithinTitle({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        console.log(res);
                        this.paginatedDelegatedLegislations = res;
                        this.isSearching = false;
                        this.searchTitle =
                            'Results for keyword ' +
                            this.searchKeywords.join(',');
                    });
            }
        } else {
            this.paginatedLegislations.data = [];
            this.paginatedDelegatedLegislations.data = [];

            if (this.searchDocumentType === 'Legislations') {
                this.searchService
                    .PublicSearchForKeywordInLegislationWithinContent({
                        keywords: this.searchKeywords.join(','),
                        pageSize: this.rows,
                        page: this.currentPage,
                    })
                    .subscribe((res) => {
                        this.paginatedSections = res;
                        this.isSearching = false;
                        this.searchTitle = `Results for keyword ${this.searchKeywords.join(
                            ','
                        )}`;
                    });
            } else {
                this.searchService
                    .PublicSearchForKeywordInDelegatedLegislationWithinContent({
                        keywords: this.searchKeywords.join(','),
                        page: this.currentPage,
                        pageSize: this.rows,
                    })
                    .subscribe((res) => {
                        console.log(res);
                        this.paginatedSections = res;
                        this.isSearching = false;
                        this.searchTitle =
                            'Results for keyword ' +
                            this.searchKeywords.join(',');
                    });
            }
        }
    }

    toggleCheckbox(checkbox: string) {
        if (checkbox === 'Title') {
            this.searchInTitle = true;
        } else if (checkbox === 'Content') {
            this.searchInTitle = false;
        }
    }

    sanitizeHtml(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    viewLegislation(id) {
        this.router.navigate(['legislations/view/' + id]);
    }
    viewDelegatedLegislation(id) {
        this.router.navigate(['delegated-legislations/view/' + id]);
    }
}
