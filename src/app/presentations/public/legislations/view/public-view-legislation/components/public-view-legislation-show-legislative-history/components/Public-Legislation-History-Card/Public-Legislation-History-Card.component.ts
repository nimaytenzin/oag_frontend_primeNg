import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { LegislationStatus } from 'src/app/core/constants/enums';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { AdminViewAmendmentsModalComponent } from 'src/app/presentations/admin/drafts/view/shared-components/admin-view-amendments-modal/admin-view-amendments-modal.component';

@Component({
    selector: 'app-Public-Legislation-History-Card',
    standalone: true,
    imports: [CommonModule],
    providers: [DialogService],
    templateUrl: './Public-Legislation-History-Card.component.html',
    styleUrls: ['./Public-Legislation-History-Card.component.scss'],
})
export class PublicLegislationHistoryCardComponent implements OnInit {
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
        this.router.navigate(['/legislations/view/', this.legislation.id]);
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
