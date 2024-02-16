import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { UnitDataService } from 'src/app/core/dataservice/units/unit.dataservice';
import { UnitDTO } from 'src/app/core/dto/units/unit.dto';
import { PARSEFLOORLEVELS } from 'src/app/core/utility/helper.function';
import { AdminUnitDetailsCardComponent } from '../components/components/admin-unit-details-card/admin-unit-details-card.component';
import { AdminUnitRulesCardComponent } from '../components/components/admin-unit-rules-card/admin-unit-rules-card.component';
import { AdminUnitSurchargesCardComponent } from '../components/components/admin-unit-surcharges-card/admin-unit-surcharges-card.component';

@Component({
    selector: 'app-admin-view-unit',
    standalone: true,
    imports: [
        ButtonModule,
        TabViewModule,
        QRCodeModule,
        AdminUnitDetailsCardComponent,
        AdminUnitRulesCardComponent,
        AdminUnitSurchargesCardComponent,
    ],
    templateUrl: './admin-view-unit.component.html',
    styleUrl: './admin-view-unit.component.scss',
})
export class AdminViewUnitComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private unitDataService: UnitDataService,
        private router: Router
    ) {}
    unitId: number;
    unit: UnitDTO;

    parseFloorLevel = PARSEFLOORLEVELS;

    ngOnInit(): void {
        this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
        this.getUnit(this.unitId);
    }

    getUnit(unitId: number) {
        this.unitDataService.GetUnit(unitId).subscribe((res) => {
            this.unit = res;
        });
    }

    goBack() {
        this.router.navigate(['/admin/master-properties/building/13']);
    }
}
