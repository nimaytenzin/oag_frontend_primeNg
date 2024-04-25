import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { InputText, InputTextModule } from 'primeng/inputtext';
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
import { PublicListDelegatedLegislationsModalComponent } from 'src/app/presentations/public/legislations/components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AdminAddDraftLegislationModalComponent } from '../components/admin-add-draft-legislation-modal/admin-add-draft-legislation-modal.component';
import { TagModule } from 'primeng/tag';
import { ChipsModule } from 'primeng/chips';

@Component({
    selector: 'app-admin-list-draft-legislations',
    standalone: true,
    imports: [
        PaginatorModule,
        ButtonModule,
        TableModule,
        CommonModule,
        InputTextModule,
        ConfirmDialogModule,
        ToastModule,
        ChipsModule,
        TagModule,
    ],
    providers: [DialogService, ConfirmationService, MessageService],
    templateUrl: './admin-list-draft-legislations.component.html',
    styleUrl: './admin-list-draft-legislations.component.scss',
})
export class AdminListDraftLegislationsComponent {
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;

    ref: DynamicDialogRef | undefined;

    setSelectedAlphabet = SetPublicCurrentLegislationAlphabet;
    getSelectedAlphabet = GetPublicCurrentLegislationAlphabet;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    pageTitle = 'Draft Legislations';
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
        private titleService: Title,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
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

    openAddNewDraftLegislationModal() {}

    private handlePagination(): void {
        const queryParams: any = {
            page: this.currentPage,
            pageSize: this.rows,
        };

        if (this.selectedAlphabet !== this.alphabets[0]) {
            queryParams.startsWith = this.selectedAlphabet;
        }

        this.legislationDataService
            .AdminGetDraftLegisaltionsPaginated(queryParams)
            .subscribe({
                next: (res) => {
                    this.paginatedLegislations = res;
                    this.updateSearchTitle();
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    private updateSearchTitle(): void {
        this.searchTitle =
            this.selectedAlphabet === this.alphabets[0]
                ? 'Draft  Legislations'
                : `Draft Legislations starting with ${this.selectedAlphabet}`;
    }

    confirmPublishDraftLegislation(event: Event, item: LegislationDto) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to publish?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Legislation Published',
                    detail: item.title_eng,
                });
            },
            reject: () => {},
        });
    }

    openAddDraftLegislataionModal() {
        this.ref = this.dialogService.open(
            AdminAddDraftLegislationModalComponent,
            {
                header: 'Add Draft Legislation',
                width: '40%',

                baseZIndex: 10000,
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 201) {
                this.handlePagination();
            }
        });
    }

    // applyGlobalFilter() {
    //     this.filteredLegislations = this.paginatedLegislations.data.filter(
    //         (item) =>
    //             item.title_eng.includes(this.globalFilterValue) ||
    //             item.documentYear.toString().includes(this.globalFilterValue)
    //     );
    // }

    viewDraftLegislation(legislation: LegislationDto) {
        this.router.navigate(['admin/draft/legislation/' + legislation.id]);
    }
}
