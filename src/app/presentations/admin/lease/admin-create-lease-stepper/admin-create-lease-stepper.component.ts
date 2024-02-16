import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-admin-create-lease-stepper',
    standalone: true,
    imports: [RouterModule, StepsModule, ToastModule],
    providers: [MessageService],
    templateUrl: './admin-create-lease-stepper.component.html',
    styleUrl: './admin-create-lease-stepper.component.scss',
})
export class AdminCreateLeaseStepperComponent implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Lease Party',
                routerLink: 'parties',
            },
            {
                label: 'Property & Use',
                routerLink: 'properties',
            },
            {
                label: 'Duration',
                routerLink: 'duration',
            },
            {
                label: 'Charges',
                routerLink: 'charges',
            },
            {
                label: 'Terms and Condition',
                routerLink: 'terms',
            },
            {
                label: 'Finalize',
                routerLink: 'finalize',
            },
        ];
    }
}
