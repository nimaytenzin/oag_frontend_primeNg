import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BuildingSurchargeDataService } from 'src/app/core/dataservice/building/building-surcharge.data.service';
import { BuildingDataService } from 'src/app/core/dataservice/building/building.dataservice';
import { BuildingSurchargeDTO } from 'src/app/core/dto/properties/building-surcharge.dto';

@Component({
    selector: 'app-admin-building-surcharges',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputNumberModule,
        InputTextModule,
        DropdownModule,
        CheckboxModule,
        TableModule,
    ],
    templateUrl: './admin-building-surcharges.component.html',
    styleUrl: './admin-building-surcharges.component.scss',
})
export class AdminBuildingSurchargesComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private buildingSurchargeDataService: BuildingSurchargeDataService
    ) {}
    ngOnInit(): void {
        this.createBuildingSurchargeForm = this.fb.group({
            particular: [, Validators.required],
            amount: [, Validators.required],
            buildingId: [13],
        });
        this.editBuildingSurchargeForm = this.fb.group({
            particular: [, Validators.required],
            amount: [, Validators.required],
            buildingId: [13],
        });
        this.getBuildingSurcharge();
    }
    buildingCharges: BuildingSurchargeDTO[] = [];
    createBuildingSurchargeForm!: FormGroup;
    editBuildingSurchargeForm!: FormGroup;

    showDeleteBuildingSurchargeModal = false;
    showAddSurchargeModal = false;
    showEditBuildingSurchargeModal = false;

    selectedSurcharge: BuildingSurchargeDTO;

    openAddBuildingSurchargeModal() {
        this.showAddSurchargeModal = true;
    }

    openEditBuildingSurchargeModal(surcharge: BuildingSurchargeDTO) {
        this.showEditBuildingSurchargeModal = true;
        this.editBuildingSurchargeForm.patchValue({
            ...surcharge,
        });
    }

    openDeleteBuildingSurchargeModal(surcharge: BuildingSurchargeDTO) {
        this.showDeleteBuildingSurchargeModal = true;
        this.selectedSurcharge = surcharge;
    }

    deleteBuildingSurcharge() {
        this.buildingSurchargeDataService
            .DeleteBuildingSurcharge(this.selectedSurcharge.id)
            .subscribe((res) => {
                console.log(res);
                if (res) {
                    this.getBuildingSurcharge();
                    this.showDeleteBuildingSurchargeModal = false;
                }
            });
    }

    getBuildingSurcharge() {
        this.buildingSurchargeDataService
            .GetBuildingSurchargeByBuilding(13)
            .subscribe((res) => {
                this.buildingCharges = res;
                console.log(res);
            });
    }

    createBuildingSurcharge() {
        console.log(this.createBuildingSurchargeForm.value);

        this.buildingSurchargeDataService
            .CreateBuildingSurcharge(this.createBuildingSurchargeForm.value)
            .subscribe((res) => {
                console.log(res);
                this.showAddSurchargeModal = false;
                this.getBuildingSurcharge();
            });
    }
}
