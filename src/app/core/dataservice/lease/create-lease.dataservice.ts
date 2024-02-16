import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
    CreateLeaseAgreementDTO,
    LeaseAgreementChargesDTO,
    LeaseAgreementDurationDTO,
    LeaseAgreementPartiesDTO,
    LeaseAgreementPropertiesDTO,
} from '../../dto/lease/lease-agreement.dto';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class CreateLeaseService {
    constructor(private router: Router) {}
    leaseInformation: CreateLeaseAgreementDTO = {
        parties: undefined,
        properties: undefined,
        terms: undefined,
        charges: undefined,
        duration: undefined,
    };

    private leaseCreationComplete = new Subject<any>();

    leaseCreationComplete$ = this.leaseCreationComplete.asObservable();

    getLeaseInformation() {
        return this.leaseInformation;
    }

    saveLeaseParties(data: LeaseAgreementPartiesDTO) {
        this.leaseInformation.parties = data;
    }
    saveLeaseProperties(data: LeaseAgreementPropertiesDTO) {
        this.leaseInformation.properties = data;
    }
    saveLeaseDuration(data: LeaseAgreementDurationDTO) {
        this.leaseInformation.duration = data;
    }

    saveLeaseCharges(data: LeaseAgreementChargesDTO) {
        this.leaseInformation.charges = data;
    }

    setLeaseInformation(leaseInformation) {
        this.leaseInformation = leaseInformation;
    }

    complete() {
        this.leaseCreationComplete.next(
            this.leaseCreationComplete.next(this.leaseInformation)
        );
    }

    navigateToParties() {
        this.router.navigate(['admin/master-lease/create/parties']);
    }

    navigateToProperties() {
        this.router.navigate(['admin/master-lease/create/properties']);
    }

    navigateToDuration() {
        this.router.navigate(['admin/master-lease/create/duration']);
    }
    navigateToCharges() {
        this.router.navigate(['admin/master-lease/create/charges']);
    }

    navigateToTerms() {
        this.router.navigate(['admin/master-lease/create/terms']);
    }
}
