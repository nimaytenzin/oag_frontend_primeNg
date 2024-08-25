import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import {
    ALPHABETARRAY,
    ROWSPERPAGEOPTION,
    PageEvent,
} from 'src/app/core/constants/constants';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { PaginatedData } from 'src/app/core/dto/utility/paginated-data.dto';
import {
    SetPublicCurrentLegislationAlphabet,
    GetPublicCurrentLegislationAlphabet,
    SetAdminPublishedRepealedLegialtionAlphaSelection,
    GetAdminPublishedRepealedLegislationAlphaSelection,
} from 'src/app/core/sessionStates/public.paginator.states';
import { PublicListDelegatedLegislationsModalComponent } from 'src/app/presentations/public/legislations/components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';

@Component({
    selector: 'app-admin-list-repealed-legislations',
    standalone: true,
    imports: [
        PaginatorModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        CalendarModule,
        CommonModule,
        TooltipModule,
    ],
    providers: [DialogService],
    templateUrl: './admin-list-repealed-legislations.component.html',
    styleUrl: './admin-list-repealed-legislations.component.scss',
})
export class AdminListRepealedLegislationsComponent {
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;

    ref: DynamicDialogRef | undefined;

    setSelectedAlphabet = SetAdminPublishedRepealedLegialtionAlphaSelection;
    getSelectedAlphabet = GetAdminPublishedRepealedLegislationAlphaSelection;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    pageTitle = 'Published Repealed Legislations';
    searchTitle: string;

    rowsPerPageOptions = ROWSPERPAGEOPTION;
    firstPageNumber = 0;
    rows = ROWSPERPAGEOPTION[0];
    currentPage = 1;

    date: Date[] | undefined;

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

    value: string;
    selectedCity: string;
    searchIn: string;

    constructor(
        private legislationDataService: LegislationDataService,
        public dialogService: DialogService,
        private router: Router,
        private titleService: Title
    ) {
        this.titleService.setTitle(this.pageTitle);
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.selectedAlphabet =
                this.getSelectedAlphabet() || this.alphabets[0];
            this.handlePagination();
        });
    }

    onPageChange(event: PageEvent): void {
        this.firstPageNumber = event.first;
        this.currentPage = event.page + 1;
        this.rows = event.rows;
        this.handlePagination();
    }

    loadDataByAlphabet(alpha: string): void {
        this.selectedAlphabet = alpha;
        this.setSelectedAlphabet(alpha);
        this.paginator.changePage(0);
        this.handlePagination();
    }

    viewDelegatedLegislations(item: LegislationDto): void {
        this.ref = this.dialogService.open(
            PublicListDelegatedLegislationsModalComponent,
            {
                header: item.title_eng,
                data: item,
            }
        );
    }

    private handlePagination(): void {
        const queryParams: any = {
            page: this.currentPage,
            pageSize: this.rows,
        };

        if (this.selectedAlphabet !== this.alphabets[0]) {
            queryParams.startsWith = this.selectedAlphabet;
        }

        this.legislationDataService
            .PublicGetCurrentLegislationsPaginated(queryParams)
            .subscribe((res) => {
                this.paginatedLegislations = res;
                this.updateSearchTitle();
            });
    }

    private updateSearchTitle(): void {
        this.searchTitle =
            this.selectedAlphabet === this.alphabets[0]
                ? 'Published Repealed Legislations'
                : `Published Repealed Legislations starting with ${this.selectedAlphabet}`;
    }

    // applyGlobalFilter() {
    //     this.filteredLegislations = this.paginatedLegislations.data.filter(
    //         (item) =>
    //             item.title_eng.includes(this.globalFilterValue) ||
    //             item.documentYear.toString().includes(this.globalFilterValue)
    //     );
    // }

    viewLegislation(legislation: LegislationDto) {
        this.router.navigate(['legislations/view/' + legislation.id]);
    }
}
