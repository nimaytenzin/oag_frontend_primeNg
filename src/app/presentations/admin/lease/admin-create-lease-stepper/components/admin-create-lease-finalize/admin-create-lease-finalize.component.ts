import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreateLeaseService } from 'src/app/core/dataservice/lease/create-lease.dataservice';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';
import {
    CreateLeaseAgreementDTO,
    GroupedLeaseAgreementDTO,
} from 'src/app/core/dto/lease/lease-agreement.dto';
import { GETMONTHDIFF } from 'src/app/core/utility/date.helper';

@Component({
    selector: 'app-admin-create-lease-finalize',
    templateUrl: './admin-create-lease-finalize.component.html',
    standalone: true,
    imports: [CardModule, CommonModule, ButtonModule],
    styleUrls: ['./admin-create-lease-finalize.component.css'],
})
export class AdminCreateLeaseFinalizeComponent implements OnInit {
    leaseInformation: GroupedLeaseAgreementDTO;
    calculateMonthsDifference = GETMONTHDIFF;
    constructor(
        private createLeaseService: CreateLeaseService,
        private leaseAgreementDataService: LeaseAgreementDataService
    ) {}

    ngOnInit() {
        this.leaseInformation = this.createLeaseService.getLeaseInformation();
    }
    checkNavigation(leaseInfo: GroupedLeaseAgreementDTO) {
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
    createLeaseAgreement() {
        const data: CreateLeaseAgreementDTO = {
            leaseStatus: 'ACTIVE',
            tenantId: this.leaseInformation.parties.tenantId,
            landlordId: this.leaseInformation.parties.landlordId,
            witnessId: 1,
            agreementDay: this.leaseInformation.parties.agreementDay,
            agreementMonth: this.leaseInformation.parties.agreementMonth,
            agreementYear: this.leaseInformation.parties.agreementMonth,
            buildingId: this.leaseInformation.properties.buildingId,
            unitId: this.leaseInformation.properties.unitId,
            use: this.leaseInformation.properties.use,
            leaseDurationMonths:
                this.leaseInformation.duration.leaseDurationMonths,
            leaseStartDate: this.leaseInformation.duration.leaseStartDate,
            leaseEndDate: this.leaseInformation.duration.leaseEndDate,
            tenantSubletAuthority:
                this.leaseInformation.terms.tenantSubletAuthority,
            tenantPrematureTermination:
                this.leaseInformation.terms.tenantPrematureTermination,
            ownerPrematureTermination:
                this.leaseInformation.terms.ownerPrematureTermination,
            rentIncreaseNoticePeriod:
                this.leaseInformation.terms.rentIncreaseNoticePeriod,
            evictionNoticePeriod:
                this.leaseInformation.terms.evictionNoticePeriod,
            vacationNoticePeriod:
                this.leaseInformation.terms.vacationNoticePeriod,
            leaseRules: this.leaseInformation.terms.leaseRules,
            paymentDueDay: this.leaseInformation.terms.paymentDueDay,
            applyLatePaymentFee:
                this.leaseInformation.terms.applyLatePaymentFee,
            rent: this.leaseInformation.charges.rent,
            leaseSurcharges: this.leaseInformation.charges.leaseSurcharges,
            securityDepositAmount:
                this.leaseInformation.charges.securityDepositAmount,
        };
        this.leaseAgreementDataService.CreateLeaseAgreement(data).subscribe({
            next: (res) => {
                if (res) {
                    console.log(res);
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
