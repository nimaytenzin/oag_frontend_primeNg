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
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import {
    BuildingType,
    NumberDropDownOptions,
} from 'src/app/core/constants/enums';
import { BuildingDataService } from 'src/app/core/dataservice/building/building.dataservice';
import { LocationDataService } from 'src/app/core/dataservice/location.dataservice';
import { BuildingDTO } from 'src/app/core/dto/properties/building.dto';

@Component({
    selector: 'app-admin-edit-building',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        ReactiveFormsModule,
        InputNumberModule,
        InputTextModule,
        CheckboxModule,
        InputTextareaModule,
        ToastModule,
        InputGroupModule,
        InputGroupAddonModule,
    ],

    templateUrl: './admin-edit-building.component.html',
    styleUrl: './admin-edit-building.component.scss',
})
export class AdminEditBuildingComponent implements OnInit {
    instance: DynamicDialogComponent | undefined;
    building: BuildingDTO;
    dzongkhags = [];
    thromdes = [];
    localities = [];
    selectedDzongkhag = this.dzongkhags[0];
    createBuildingForm!: FormGroup;
    searched = false;

    buildingTypes = Object.values(BuildingType);
    numberedDropDownOptions = NumberDropDownOptions;

    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private locationDataService: LocationDataService,
        private buildingDataService: BuildingDataService,
        private fb: FormBuilder
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        console.log(this.instance.data);

        if (this.instance && this.instance.data) {
            console.log(this.instance.data);
            this.building = this.instance.data;
        }
    }
    ngOnInit(): void {
        this.createBuildingForm = this.fb.group({
            isActive: [false, Validators.required],
            zhicharBuildingId: [''],
            zhicharQrUuid: [''],
            name: [''],
            buildingType: [BuildingType.CONTEMPORARY, Validators.required],
            regularFloorCount: [],
            basementCount: [],
            stiltCount: [],
            atticCount: [],
            jamthogCount: [],

            areaSqM: [],
            latitude: ['', Validators.required],
            longitude: ['', Validators.required],
            buildingNumber: [''],
            streetName: [''],
            quadrant: [''],
            landmark: [''],

            dzongkhagId: ['', Validators.required],
            thromdeId: ['', Validators.required],
            localityId: ['', Validators.required],
        });

        this.getDzongkhags();
        this.getLocalitiesByThromde(this.building.thromdeId);
        this.getThromdesByDzongkhag(this.building.dzongkhagId);
        this.createBuildingForm.patchValue({
            ...this.building,
        });
    }

    getZhicharBuildingInformation(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            // this.searched = true;
            // this.zhicharApiService
            //     .GetBuildDetailsByBuildingId(
            //         this.createBuildingForm.controls['zhicharBuildingId'].value
            //     )
            //     .subscribe((res: any) => {
            //         if (res) {
            //             this.createBuildingForm.patchValue({
            //                 zhicharQrUuid: res.qrUuid ? res.qrUuid : null,
            //                 address: res.address ? res.address : null,
            //                 buildingNumber: res.buildingNumber,
            //                 latitude: res.lat,
            //                 longitude: res.lng,
            //                 buildngName: res.name,
            //             });
            //         } else {
            //         }
            //     });
        }
    }

    updateBuilding() {
        this.buildingDataService
            .UpdateBuilding(this.building.id, this.createBuildingForm.value)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.building = res;
                    this.ref.close({
                        updated: true,
                    });
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    getDzongkhags() {
        this.locationDataService.GetAllDzonghags().subscribe((res: any) => {
            this.dzongkhags = res;
            console.log(res);
        });
    }

    getThromdesByDzongkhag(dzongkhagId: number) {
        this.locationDataService
            .GetAllThromdesByDzongkhag(dzongkhagId)
            .subscribe((res: any) => {
                console.log(res);
                this.thromdes = res;
            });
    }

    dzongkhagSelected(e) {
        console.log(e);
        this.getThromdesByDzongkhag(e.value);
    }
    thromdeSelected(e) {
        this.getLocalitiesByThromde(e.value);
    }
    getLocalitiesByThromde(thromdeId: number) {
        this.locationDataService
            .GetAllLocalitiesByThromde(thromdeId)
            .subscribe((res: any) => {
                this.localities = res;
            });
    }
}
