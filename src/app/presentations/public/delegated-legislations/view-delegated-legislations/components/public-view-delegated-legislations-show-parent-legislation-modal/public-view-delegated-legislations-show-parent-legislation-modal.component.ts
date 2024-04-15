import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
    DynamicDialogComponent,
    DynamicDialogRef,
    DialogService,
} from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';

@Component({
    selector:
        'app-public-view-delegated-legislations-show-parent-legislation-modal',
    standalone: true,
    imports: [CommonModule, TableModule],
    templateUrl:
        './public-view-delegated-legislations-show-parent-legislation-modal.component.html',
    styleUrl:
        './public-view-delegated-legislations-show-parent-legislation-modal.component.scss',
})
export class PublicViewDelegatedLegislationsShowParentLegislationModalComponent {
    instance: DynamicDialogComponent | undefined;
    parentLegislation: LegislationDto;
    parentLegislations: LegislationDto[] = [];
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private router: Router
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.parentLegislation = this.instance.data;
        this.parentLegislations.push(this.parentLegislation);
    }

    viewLegislation() {
        this.router.navigate([
            'legislations/view/' + this.parentLegislation.id,
        ]);
        this.ref.close();
    }
}
