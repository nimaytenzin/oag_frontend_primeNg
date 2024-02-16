import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AdminAddTenantComponent } from '../crud-dialog/admin-add-tenant/admin-add-tenant.component';
import { AdminAddLandlordComponent } from '../crud-dialog/admin-add-landlord/admin-add-landlord.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';
import { TenantDTO } from 'src/app/core/dto/users/tenant.dto';
import { LandLordDTO } from 'src/app/core/dto/users/landlord.dto';
import { LandLordDataService } from 'src/app/core/dataservice/users-and-auth/landlord.dataservice';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-admin-master-landlords',
    standalone: true,
    imports: [ButtonModule, TableModule, PaginatorModule, CommonModule],
    providers: [DialogService],
    templateUrl: './admin-master-landlords.component.html',
    styleUrl: './admin-master-landlords.component.scss',
})
export class AdminMasterLandlordsComponent implements OnInit {
    constructor(
        public dialogService: DialogService,
        private router: Router,
        private landlordDataService: LandLordDataService
    ) {}

    ref: DynamicDialogRef | undefined;
    paginatedLandlords: PaginatedData<LandLordDTO> = {
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
        this.getLandlords();
    }

    openAddlandlordsModal() {
        this.ref = this.dialogService.open(AdminAddLandlordComponent, {
            header: 'Add Landlords',
            width: '500px',
        });
    }

    onPageChange(e) {
        console.log(e);
        this.landlordDataService
            .GetLandlordsPaginated({
                page: e.page,
                limit: e.rows,
            })
            .subscribe((res) => {
                this.paginatedLandlords = res;
            });
    }

    getLandlords() {
        this.landlordDataService
            .GetLandlordsPaginated({
                page: 0,
                limit: this.rows,
            })
            .subscribe((res) => {
                this.paginatedLandlords = res;
                console.log(res);

                for (const landlord of res.data) {
                    for (const building of landlord.buildings) {
                        console.log(building.BuildingOwnership);
                    }
                }
            });
    }

    getObjectKeys(obj: any): string[] {
        return Object.keys(obj);
    }
}
