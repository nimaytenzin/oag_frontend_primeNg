import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UnitDataService } from 'src/app/core/dataservice/units/unit.dataservice';

@Component({
    selector: 'app-admin-add-unit',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        InputTextareaModule,
    ],
    templateUrl: './admin-add-unit.component.html',
    styleUrl: './admin-add-unit.component.scss',
})
export class AdminAddUnitComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private unitDataService: UnitDataService
    ) {}
    ngOnInit(): void {
        this.createUnitForm = this.fb.group({
            buildingId: [13, Validators.required],
            floorLevel: ['G', Validators.required],
            unitNumber: ['01', Validators.required],
            bedroomCount: [3, [Validators.required, Validators.min(1)]],
            toiletCount: [2, [Validators.required, Validators.min(1)]],
            balconyCount: [1, [Validators.required, Validators.min(0)]],
            floorArea: [500, [Validators.required, Validators.min(1)]],
            powerConsumerId: [55423312, Validators.required],
            zhicharUnitId: [3],
            zhicharQrUuid: ['2'],
        });
    }
    createUnitForm!: FormGroup;

    floorLevels = [
        'B',
        '2B',
        'S',
        'G',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        'A',
        'J',
    ];

    createUnit() {
        console.log(this.createUnitForm.value);
        this.unitDataService.CreateUnit(this.createUnitForm.value).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
