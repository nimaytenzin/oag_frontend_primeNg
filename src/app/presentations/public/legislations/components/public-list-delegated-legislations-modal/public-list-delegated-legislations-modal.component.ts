import { Component } from '@angular/core';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';

@Component({
    selector: 'app-public-list-delegated-legislations-modal',
    standalone: true,
    imports: [],
    templateUrl: './public-list-delegated-legislations-modal.component.html',
    styleUrl: './public-list-delegated-legislations-modal.component.scss',
})
export class PublicListDelegatedLegislationsModalComponent {
    instance: DynamicDialogComponent | undefined;

    legislation: LegislationDto;

    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.legislation = this.instance.data;
    }
}
