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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
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

    getSectionStyles = GetSectionStylesPublic;
    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string;

    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService,
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            console.log(params); // Logs the current query parameters
            // Example: Accessing a specific query parameter

            this.searchKeywords = params['Keyword'].split(',');
            this.searchDocumentType = params['In'];
            this.searchInTitle = params['Within'] === 'Title' ? true : false;

            this.search();
        });
    }

    onPageChange(event: PageEvent): void {
        this.firstPageNumber = event.first;
        this.currentPage = event.page + 1;
        this.rows = event.rows;
        // this.handlePagination();
    }

    search() {
        this.isSearching = true;
        if (this.searchInTitle) {
            alert('IMPLEMENT SEARCH IN TITLE');
        } else {
            if (this.searchDocumentType === 'Legislations') {
                this.searchService
                    .PublicSearchForKeywordInLegislations({
                        keywords: this.searchKeywords.join(','),
                        searchIn: this.searchDocumentType,
                        searchWithin: this.searchInTitle ? 'Title' : 'Content',
                    })
                    .subscribe((res) => {
                        this.paginatedSections = res;
                        this.isSearching = false;
                        this.searchTitle =
                            'Results for keyword ' +
                            this.searchKeywords.join(',');
                    });
            } else {
                alert('IMPLEMENT SEARCH IN CONTENT OF DELEGATED LEGISLATIONS');
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
}
