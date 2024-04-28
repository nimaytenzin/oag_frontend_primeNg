import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { AdminViewAmendmentsModalComponent } from '../../../../../shared-components/admin-view-amendments-modal/admin-view-amendments-modal.component';

@Component({
    selector: 'app-admin-legislation-detail-card',
    standalone: true,
    imports: [CommonModule],
    providers: [DialogService],
    templateUrl: './admin-legislation-detail-card.component.html',
    styleUrls: ['./admin-legislation-detail-card.component.scss'],
})
export class AdminLegislationDetailCardComponent implements OnInit {
    @Input() legislationId: number;
    legislation: LegislationDto;
    amendments: AmendmentDto[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(
        private legislationDataService: LegislationDataService,
        private legislationRelationshipDataService: LegislationRelationshipDataService,
        private router: Router,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        console.log('INSIDE LEGISLATION DETAIL CARD', this.legislationId);
        this.legislationDataService
            .AdminGetLegislaitonDetails(this.legislationId)
            .subscribe((res) => {
                this.legislation = res;
            });
        this.legislationRelationshipDataService
            .AdminGetAmendmentsByLegislation(this.legislationId)
            .subscribe({
                next: (res) => {
                    this.amendments = res;
                },
            });
    }

    viewLegislation() {
        this.router.navigate([
            '/admin/draft/legislation/',
            this.legislation.id,
        ]);
    }

    openViewAmendmentsModal(item: AmendmentDto) {
        console.log(item);
        this.ref = this.dialogService.open(AdminViewAmendmentsModalComponent, {
            header: item.title_eng,
            width: '50%',
            data: item,
        });
    }
}
