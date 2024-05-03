import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { StatisticsDataService } from 'src/app/core/dataservice/statistics/statistics.dataservice';
import {
    DelegatedLegislationStatisticsSummaryDto,
    LegislationStatisticsSummaryDto,
} from 'src/app/core/dto/statistics/legislation-stats.dto';
import { CardModule } from 'primeng/card';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        CardModule,
    ],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
    items!: MenuItem[];

    legislations!: LegislationDto[];

    publishedLegislationStatistics: LegislationStatisticsSummaryDto;
    publishedDelegatedLegisaltionStatistics: DelegatedLegislationStatisticsSummaryDto;

    constructor(
        private statDataService: StatisticsDataService,
        private legislationDataService: LegislationDataService
    ) {}

    ngOnInit() {
        this.statDataService
            .GetLegislationStatisticsSummary()
            .subscribe((res) => {
                this.publishedLegislationStatistics = res;
            });

        this.statDataService
            .GetDelegatedLegislationStatisticsSummary()
            .subscribe((res) => {
                this.publishedDelegatedLegisaltionStatistics = res;
            });
        this.legislationDataService
            .GetLatestLegislations(10)
            .subscribe((res) => {
                this.legislations = res;
            });
    }
}
