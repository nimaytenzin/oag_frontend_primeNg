import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
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
} from 'src/app/core/sessionStates/public.paginator.states';
import { PublicListDelegatedLegislationsModalComponent } from '../../components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-public-list-conventions',
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
    templateUrl: './public-list-conventions.component.html',
    styleUrl: './public-list-conventions.component.scss',
})
export class PublicListConventionsComponent {
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;

    ref: DynamicDialogRef | undefined;

    setSelectedAlphabet = SetPublicCurrentLegislationAlphabet;
    getSelectedAlphabet = GetPublicCurrentLegislationAlphabet;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    pageTitle = 'International Conventions';
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
            .PublicGetInternationalConventionsPaginated(queryParams)
            .subscribe((res) => {
                this.paginatedLegislations = res;
                this.updateSearchTitle();
            });
    }

    private updateSearchTitle(): void {
        this.searchTitle =
            this.selectedAlphabet === this.alphabets[0]
                ? 'International Conventions'
                : `International Conventions starting with ${this.selectedAlphabet}`;
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
