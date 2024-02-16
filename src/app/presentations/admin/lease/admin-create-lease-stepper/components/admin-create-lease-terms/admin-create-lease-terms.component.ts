import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { BuildingRulesDataService } from 'src/app/core/dataservice/building/building-rules.dataservice';
import { CreateLeaseService } from 'src/app/core/dataservice/lease/create-lease.dataservice';
import { UnitRuleDataService } from 'src/app/core/dataservice/units/unit-rules.dataservice';
import {
    CreateLeaseAgreementDTO,
    LeaseAgreementTermsDTO,
} from 'src/app/core/dto/lease/lease-agreement.dto';

@Component({
    selector: 'app-admin-create-lease-terms',
    templateUrl: './admin-create-lease-terms.component.html',
    standalone: true,
    imports: [CardModule, RadioButtonModule, FormsModule, InputNumberModule],
    styleUrls: ['./admin-create-lease-terms.component.scss'],
})
export class AdminCreateLeaseTermsComponent implements OnInit {
    leaseInformation: CreateLeaseAgreementDTO;

    tenantSubletAuthority: boolean = false;
    tenantPrematureTermination: boolean = true;
    landlordPrematureTermination: boolean = true;
    applyLatePaymentFee: boolean = false;
    paymentDueDay: number = 1;
    rentIncreateNoticePeriod: number = 3;
    evictionNoticePeriod: number = 2;
    vacationNoticePeriod: number = 2;

    rules: LeaseAgreementTermsDTO[] = [];

    constructor(
        private createLeaseService: CreateLeaseService,
        private buildingRulesDataService: BuildingRulesDataService,
        private unitRulesDataService: UnitRuleDataService
    ) {}

    ngOnInit() {
        this.leaseInformation = this.createLeaseService.getLeaseInformation();
        // this.checkNavigation(this.leaseInformation);
        this.restoreStateIfExists(this.leaseInformation);
        console.log(this.leaseInformation);
    }

    checkNavigation(leaseInformation: CreateLeaseAgreementDTO) {
        if (!leaseInformation.parties) {
            this.createLeaseService.navigateToParties();
        } else if (!leaseInformation.properties) {
            this.createLeaseService.navigateToProperties();
        } else if (!leaseInformation.duration) {
            this.createLeaseService.navigateToDuration();
        } else if (!leaseInformation.charges) {
            this.createLeaseService.navigateToCharges();
        }
    }
    restoreStateIfExists(leaseInformation: CreateLeaseAgreementDTO) {
        const terms = this.leaseInformation.terms;
        if (terms) {
            alert('RESTORE STATE NOT IMPLEMENTED');
        }
    }

    logValues() {
        console.log({
            tenantSubletAuth: this.tenantSubletAuthority,
            landlorprecancel: this.landlordPrematureTermination,
            tenantPrecancel: this.tenantPrematureTermination,
            paymentDueData: this.paymentDueDay,
            applyLateFee: this.applyLatePaymentFee,
            evictionNoticePeriod: this.evictionNoticePeriod,
            vacationNoticePeriod: this.vacationNoticePeriod,
            rentIncreateNoticePeriod: this.rentIncreateNoticePeriod,
        });
    }

    nextPage() {}
    prevPage() {}
}
