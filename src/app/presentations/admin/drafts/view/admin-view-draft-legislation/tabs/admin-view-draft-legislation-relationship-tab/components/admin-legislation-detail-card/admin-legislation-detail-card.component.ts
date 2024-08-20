import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { AdminViewAmendmentsModalComponent } from '../../../../../shared-components/admin-view-amendments-modal/admin-view-amendments-modal.component';
import { LegislationStatus } from 'src/app/core/constants/enums';

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
    @Input() mode: string;
    @Input() index: number;
    @Input() repealedLegislations: any;

    legislation: LegislationDto;
    amendments: AmendmentDto[] = [];
    ref: DynamicDialogRef | undefined;

    isCurrent: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private legislationDataService: LegislationDataService,
        private legislationRelationshipDataService: LegislationRelationshipDataService,
        private router: Router,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.legislationId === Number(params['legislationId'])
                ? (this.isCurrent = true)
                : (this.isCurrent = false);
        });
        
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

    openViewAmendmentsModal(item: AmendmentDto) {
        console.log(item);
        this.ref = this.dialogService.open(AdminViewAmendmentsModalComponent, {
            header: item.title_eng,
            width: '50%',
            data: item,
        });
    }
}
