import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {
    BuildingType,
    NumberDropDownOptions,
} from 'src/app/core/constants/enums';
import { BuildingDataService } from 'src/app/core/dataservice/building.dataservice';
import { ZhicharApiService } from 'src/app/core/dataservice/externalApi/zhichar.api.service';
import { LocationDataService } from 'src/app/core/dataservice/location.dataservice';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-admin-add-building',
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
    providers: [DialogService, MessageService],
    templateUrl: './admin-add-building.component.html',
    styleUrl: './admin-add-building.component.scss',
})
export class AdminAddBuildingComponent {
    constructor(
        private zhicharApiService: ZhicharApiService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private locationDataService: LocationDataService,
        private buildingDataService: BuildingDataService,
        public ref: DynamicDialogRef,
        private dialogService: DialogService
    ) {}

    instance: DynamicDialogComponent | undefined;

    dzongkhags = [];
    thromdes = [];
    localities = [];
    selectedDzongkhag = this.dzongkhags[0];
    createBuildingForm!: FormGroup;
    searched = false;

    buildingTypes = Object.values(BuildingType);
    numberedDropDownOptions = NumberDropDownOptions;

    ngOnInit() {
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
    }

    getZhicharBuildingInformation(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.searched = true;
            this.zhicharApiService
                .GetBuildDetailsByBuildingId(
                    this.createBuildingForm.controls['zhicharBuildingId'].value
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.messageService.add({
                            key: 'tst',
                            severity: 'success',
                            summary: 'Data Fetched from Zhichar',
                            detail: 'Building Information Populated from Zhichar.bt',
                        });
                        this.createBuildingForm.patchValue({
                            zhicharQrUuid: res.qrUuid ? res.qrUuid : null,
                            address: res.address ? res.address : null,
                            buildingNumber: res.buildingNumber,
                            latitude: res.lat,
                            longitude: res.lng,
                            buildngName: res.name,
                        });
                    } else {
                        this.messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary: 'Couldnot Fetch Data',
                            detail: 'Data not avilable in zhichar',
                        });
                    }
                });
        }
    }

    createBuilding() {
        console.log(this.createBuildingForm.value);
        if (this.createBuildingForm.valid) {
            console.log(this.createBuildingForm.value);
            this.buildingDataService
                .CreateNewBuilding(this.createBuildingForm.value)
                .subscribe({
                    next: (res) => {
                        if (res.id) {
                            this.ref.close({
                                added: true,
                            });
                        }
                    },
                    error: (error) => {
                        console.log(error);
                        this.messageService.add({
                            key: 'tst',
                            severity: 'error',
                            summary:
                                'Error:' +
                                error.status +
                                ' ' +
                                error.statusText,
                            detail: error.error.message,
                        });
                    },
                });
        } else {
            alert('MISSING');
        }
        //     if (this.createBuildingForm.valid) {
        //         // this.buildingDataService
        //         //     .CreateNewBuilding(this.createBuildingForm.value)
        //         //     .subscribe((res) => {
        //         //         console.log(res);
        //         //         console.log('RESPONSE');
        //         //     });
        //     } else {
        //         alert('put all data');
        //     }
        // }
    }

    clearFormValues() {
        this.searched = false;
        this.createBuildingForm.reset();
        this.createBuildingForm.enable();
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
