import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LegislationStatus } from 'src/app/core/constants/enums';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-public-delegated-legislation-history-card',
    templateUrl: './public-delegated-legislation-history-card.component.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./public-delegated-legislation-history-card.component.scss'],
})
export class PublicDelegatedLegislationHistoryCardComponent implements OnInit {
    @Input() delegatedLegislaton: DelegatedLegislationDto;
    constructor() {}

    ngOnInit() {}
    getStatusClassName(status: string): string {
        switch (status) {
            case LegislationStatus.ENACTED:
                return 'text-green-700';
            case LegislationStatus.REPEALED:
                return 'text-red-500';
            default:
                return '';
        }
    }
}
