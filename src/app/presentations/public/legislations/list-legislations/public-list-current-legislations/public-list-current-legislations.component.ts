import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import {
    DialogService,
    DynamicDialogModule,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PublicListDelegatedLegislationsModalComponent } from '../../components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';
import { PaginatedData } from 'src/app/core/dto/utility/paginated-data.dto';
import {
    GetPublicCurrentLegislationAlphabet,
    SetPublicCurrentLegislationAlphabet,
} from 'src/app/core/sessionStates/public.paginator.states';
import {
    ALPHABETARRAY,
    PageEvent,
    ROWSPERPAGEOPTION,
} from 'src/app/core/constants/constants';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-public-list-active-legislations',
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
    templateUrl: './public-list-current-legislations.component.html',
    styleUrls: ['./public-list-current-legislations.component.scss'],
})
export class PublicListCurrentLegislationsComponent
    implements OnInit, AfterViewInit
{
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;

    ref: DynamicDialogRef | undefined;

    setSelectedAlphabet = SetPublicCurrentLegislationAlphabet;
    getSelectedAlphabet = GetPublicCurrentLegislationAlphabet;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    pageTitle = 'Current Legislations';
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
        this.titleService.setTitle('Current Legislations');
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
                ? 'Current Legislations'
                : `Current Legislations starting with ${this.selectedAlphabet}`;
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
