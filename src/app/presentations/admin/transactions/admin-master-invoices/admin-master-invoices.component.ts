import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { invoiceDataService } from 'src/app/core/dataservice/payments/invoice.dataservice';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';
import { InvoiceDTO } from 'src/app/core/dto/payments/invoice/invoice.dto';

@Component({
    selector: 'app-admin-master-invoices',
    templateUrl: './admin-master-invoices.component.html',
    standalone: true,
    imports: [CardModule, CommonModule, TableModule, TagModule],
    styleUrls: ['./admin-master-invoices.component.scss'],
})
export class AdminMasterInvoicesComponent implements OnInit {
    rows = 10;
    paginatedInvoices: PaginatedData<InvoiceDTO> = {
        firstPage: 0,
        currentPage: 0,
        previousPage: 0,
        nextPage: 0,
        lastPage: 0,
        limit: 0,
        count: 0,
        data: [],
    };
    invoices = [
        {
            id: 100231232,
            items: [
                {
                    particular: 'House Rent for May 2024',
                    amount: 10000,
                },
                {
                    particular: 'Cleaning Charges for May 2024',
                    amount: 200,
                },
            ],
            total: 10200,
            status: 'PENDING',
        },
        {
            id: 782783832,
            items: [
                {
                    particular: 'House Rent for May 2024',
                    amount: 10000,
                },
                {
                    particular: 'Cleaning Charges for May 2024',
                    amount: 200,
                },
            ],
            total: 10200,
            status: 'TRANSFERRED',
        },
    ];
    constructor(private invoiceDataService: invoiceDataService) {}

    ngOnInit() {
        this.getInvoices();
        console.log(this.paginatedInvoices);
    }

    getInvoices() {
        this.invoiceDataService
            .GetAllInvoicesPaginated({
                page: 0,
                limit: this.rows,
            })
            .subscribe((res) => {
                this.paginatedInvoices = res;
                console.log(res);
            });
    }

    viewLeaseAgreement() {
        alert('IMPLETN SHOW LEASE AGREEMENT MODAL');
    }
    getSeverity(status: string) {
        switch (status) {
            case 'TRANSFERRED':
                return 'success';
            case 'PAID':
                return 'warning';
            case 'PENDING':
                return 'danger';
            default:
                return 'danger';
        }
    }
}
