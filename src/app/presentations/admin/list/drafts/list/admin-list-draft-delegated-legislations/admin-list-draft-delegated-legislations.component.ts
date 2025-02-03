import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import {
    ALPHABETARRAY,
    PageEvent,
    ROWSPERPAGEOPTION,
} from 'src/app/core/constants/constants';
import { DelegatedLegislationDataService } from 'src/app/core/dataservice/delegated-legislations/delegated-legislation.dataservice';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { PaginatedData } from 'src/app/core/dto/utility/paginated-data.dto';
import {
    GetAdminDraftDelegatedLegislationAlphaSelection,
    GetPublicCurrentLegislationAlphabet,
    SetAdminDraftDelegatedLegisaltionAlphaSelection,
    SetPublicCurrentLegislationAlphabet,
} from 'src/app/core/sessionStates/public.paginator.states';
import { PublicListDelegatedLegislationsModalComponent } from 'src/app/presentations/public/legislations/components/public-list-delegated-legislations-modal/public-list-delegated-legislations-modal.component';
import { AdminAddDraftLegislationModalComponent } from '../components/admin-add-draft-legislation-modal/admin-add-draft-legislation-modal.component';
import { Router } from '@angular/router';
import { AdminAddDelegatedLegislationModalComponent } from 'src/app/presentations/admin/view/shared-components/admin-add-delegated-legislation-modal/admin-add-delegated-legislation-modal.component';

@Component({
    selector: 'app-admin-list-draft-delegated-legislations',
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
    templateUrl: './admin-list-draft-delegated-legislations.component.html',
    styleUrl: './admin-list-draft-delegated-legislations.component.scss',
})
export class AdminListDraftDelegatedLegislationsComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    @ViewChild('clt1') clt1: Table;
    ref: DynamicDialogRef | undefined;

    rowsPerPageOptions = ROWSPERPAGEOPTION;
    firstPageNumber = 0;
    rows = ROWSPERPAGEOPTION[0];
    currentPage = 0;

    alphabets = ALPHABETARRAY;
    selectedAlphabet: string;

    setSelectedAlphabet = SetAdminDraftDelegatedLegisaltionAlphaSelection;
    getSelectedAlphabet = GetAdminDraftDelegatedLegislationAlphaSelection;

    paginatedDelegatedLegisaltion: PaginatedData<DelegatedLegislationDto> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };

    pageTitle = 'Draft Delegated Legislations';
    searchTitle: string;

    constructor(
        private delegatedLegislationDataService: DelegatedLegislationDataService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.selectedAlphabet = this.getSelectedAlphabet() || this.alphabets[0];
        this.handlePagination();
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

        this.delegatedLegislationDataService
            .AdminGetDraftDelegatedLegisaltionsPaginated(queryParams)
            .subscribe({
                next: (res) => {
                    this.paginatedDelegatedLegisaltion = res;
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
            AdminAddDelegatedLegislationModalComponent,
            {
                header: 'Add Draft Delegated Legislation ',
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

    viewDraftDelegatedLegisaltion(item: DelegatedLegislationDto) {
        this.router.navigate(['admin/view/delegated-legislation/' + item.id]);
    }
}
