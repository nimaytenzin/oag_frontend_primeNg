import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-admin-master-invoices',
    templateUrl: './admin-master-invoices.component.html',
    standalone: true,
    imports: [CardModule, CommonModule, TableModule, TagModule],
    styleUrls: ['./admin-master-invoices.component.scss'],
})
export class AdminMasterInvoicesComponent implements OnInit {
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
    constructor() {}

    ngOnInit() {}

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
