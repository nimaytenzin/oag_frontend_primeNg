import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { TimelineModule } from 'primeng/timeline';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';
import { SearchLegislationModalDto } from '../public-view-legislation-show-search-result-modal/public-view-legislation-show-search-result-modal.component';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { AdminLegislationDetailCardComponent } from 'src/app/presentations/admin/view/admin-view-legislation/tabs/admin-view-draft-legislation-relationship-tab/components/admin-legislation-detail-card/admin-legislation-detail-card.component';
import { PublicLegislationHistoryCardComponent } from './components/Public-Legislation-History-Card/Public-Legislation-History-Card.component';
interface EventItem {
    title_eng?: string;
    title_dzo?: string;
    date?: string;

    status: string;
    description?: string;

    commencementDate?: string;
    repealDate?: string;
}

interface LegislativeHistoryItem {
    title_eng: string;
    title_dzo: string;
}

@Component({
    selector: 'app-public-view-legislation-show-legislative-history',
    standalone: true,
    imports: [
        TimelineModule,
        CommonModule,
        ButtonModule,
        CardModule,
        PublicLegislationHistoryCardComponent,
    ],
    templateUrl:
        './public-view-legislation-show-legislative-history.component.html',
    styleUrl:
        './public-view-legislation-show-legislative-history.component.scss',
})
export class PublicViewLegislationShowLegislativeHistoryComponent
    implements OnInit
{
    instance: DynamicDialogComponent | undefined;
    history: any;

    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.history = this.instance.data;
        console.log(this.history);
    }
    ngOnInit(): void {}
}
