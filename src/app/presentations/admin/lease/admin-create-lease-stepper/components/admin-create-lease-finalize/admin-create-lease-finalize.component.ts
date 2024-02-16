import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CreateLeaseService } from 'src/app/core/dataservice/lease/create-lease.dataservice';
import { CreateLeaseAgreementDTO } from 'src/app/core/dto/lease/lease-agreement.dto';
import { GETMONTHDIFF } from 'src/app/core/utility/date.helper';

@Component({
    selector: 'app-admin-create-lease-finalize',
    templateUrl: './admin-create-lease-finalize.component.html',
    standalone: true,
    imports: [CardModule, CommonModule],
    styleUrls: ['./admin-create-lease-finalize.component.css'],
})
export class AdminCreateLeaseFinalizeComponent implements OnInit {
    leaseInformation: CreateLeaseAgreementDTO;
    calculateMonthsDifference = GETMONTHDIFF;
    constructor(private createLeaseService: CreateLeaseService) {}

    ngOnInit() {
        this.leaseInformation = this.createLeaseService.getLeaseInformation();
    }
    checkNavigation(leaseInfo: CreateLeaseAgreementDTO) {
        if (!leaseInfo.parties) {
            this.createLeaseService.navigateToParties();
        } else if (!leaseInfo.properties) {
            this.createLeaseService.navigateToProperties();
        } else if (!leaseInfo.duration) {
            this.createLeaseService.navigateToDuration();
        } else if (!leaseInfo.charges) {
            this.createLeaseService.navigateToCharges();
        } else if (!leaseInfo.terms) {
            this.createLeaseService.navigateToTerms();
        }
    }

    prevPage() {}
    createLease() {}
}
