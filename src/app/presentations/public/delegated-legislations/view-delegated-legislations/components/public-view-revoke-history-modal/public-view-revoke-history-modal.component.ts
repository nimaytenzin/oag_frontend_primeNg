import { Component, OnInit } from '@angular/core';
import { PublicDelegatedLegislationHistoryCardComponent } from './components/public-delegated-legislation-history-card/public-delegated-legislation-history-card.component';
import { DomSanitizer } from '@angular/platform-browser';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { DelegatedLegislationDto } from 'src/app/core/dto/delegated-legislation/delegated-legislation.dto';

@Component({
    selector: 'app-public-view-revoke-history-modal',
    standalone: true,
    imports: [PublicDelegatedLegislationHistoryCardComponent],
    templateUrl: './public-view-revoke-history-modal.component.html',
    styleUrls: ['./public-view-revoke-history-modal.component.scss'],
})
export class PublicViewRevokeHistoryModalComponent implements OnInit {
    instance: DynamicDialogComponent | undefined;
    delegatedLegisaltion: DelegatedLegislationDto;
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.delegatedLegisaltion = this.instance.data;
    }
    ngOnInit(): void {}
}
