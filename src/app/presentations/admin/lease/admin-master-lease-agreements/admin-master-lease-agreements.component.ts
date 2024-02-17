import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminCreateLeaseAgreementComponent } from '../crud-modals/admin-create-lease-agreement/admin-create-lease-agreement.component';
import { Router } from '@angular/router';
import { LandLordDataService } from 'src/app/core/dataservice/users-and-auth/landlord.dataservice';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';
import { LandLordDTO } from 'src/app/core/dto/users/landlord.dto';
import { AdminAddLandlordComponent } from '../../users/crud-dialog/admin-add-landlord/admin-add-landlord.component';
import { LeaseAgreementDTO } from 'src/app/core/dto/lease/lease-agreement.dto';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-master-lease-agreements',
    standalone: true,
    imports: [
        CheckboxModule,
        FormsModule,
        ButtonModule,
        TableModule,
        PaginatorModule,
        CommonModule,
    ],
    providers: [DialogService],
    templateUrl: './admin-master-lease-agreements.component.html',
    styleUrl: './admin-master-lease-agreements.component.scss',
})
export class AdminMasterLeaseAgreementsComponent {
    constructor(
        public dialogService: DialogService,
        private router: Router,
        private leaseAgreementDataService: LeaseAgreementDataService
    ) {}

    ref: DynamicDialogRef | undefined;
    paginatedLeaseAgreements: PaginatedData<LeaseAgreementDTO> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };
    rows = 10;

    ngOnInit(): void {
        this.getLeaseAgreements();
    }

    onPageChange(e) {
        console.log(e);
        this.leaseAgreementDataService
            .GetLeaseAgreementsPaginated({
                page: e.page,
                limit: e.rows,
            })
            .subscribe((res) => {
                this.paginatedLeaseAgreements = res;
            });
    }

    getLeaseAgreements() {
        this.leaseAgreementDataService
            .GetLeaseAgreementsPaginated({
                page: 0,
                limit: this.rows,
            })
            .subscribe((res) => {
                this.paginatedLeaseAgreements = res;
                console.log(res);
            });
    }

    computeMonthlyPayable(item: LeaseAgreementDTO) {
        let total = item.rent;
        for (let i = 0; i < item.leaseSurcharges.length; i++) {
            total += item.leaseSurcharges[i].amount;
        }

        return total;
    }

    getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
    }
}
