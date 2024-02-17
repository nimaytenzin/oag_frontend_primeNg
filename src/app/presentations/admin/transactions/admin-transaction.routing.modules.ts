import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterTransactionsComponent } from './admin-master-transactions/admin-master-transactions.component';
import { AdminMasterInvoicesComponent } from './admin-master-invoices/admin-master-invoices.component';

const routes: Routes = [
    {
        path: '',
        component: AdminMasterTransactionsComponent,
    },
    {
        path: 'invoices',
        component: AdminMasterInvoicesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterTransactionRoutingModule {}
