import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
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
    SetAdminDraftConventionAlphaSelection,
    GetAdminDraftDelegatedLegislationAlphaSelection,
    GetAdminDraftConventionAlphaSelection,
} from 'src/app/core/sessionStates/public.paginator.states';
import { PublicListDelegatedLegislationsModalComponent } from 'src/app/presentations/public/legislations/components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';
import { AdminAddDraftLegislationModalComponent } from '../components/admin-add-draft-legislation-modal/admin-add-draft-legislation-modal.component';

@Component({
    selector: 'app-admin-list-draft-conventions',
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
    templateUrl: './admin-list-draft-conventions.component.html',
    styleUrl: './admin-list-draft-conventions.component.scss',
})
export class AdminListDraftConventionsComponent {
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;

    ref: DynamicDialogRef | undefined;

    setSelectedAlphabet = SetAdminDraftConventionAlphaSelection;
    getSelectedAlphabet = GetAdminDraftConventionAlphaSelection;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    pageTitle = 'Draft Conventions';
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
            .AdminGetDraftConventionsPaginated(queryParams)
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
                ? 'Draft Conventions'
                : `Draft Conventions starting with ${this.selectedAlphabet}`;
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
                    summary: 'Convention Published',
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
                data: {
                    isConvention: true,
                },
                header: 'Add Draft Convention',
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
        this.router.navigate(['admin/view/legislation/' + legislation.id]);
    }
}
