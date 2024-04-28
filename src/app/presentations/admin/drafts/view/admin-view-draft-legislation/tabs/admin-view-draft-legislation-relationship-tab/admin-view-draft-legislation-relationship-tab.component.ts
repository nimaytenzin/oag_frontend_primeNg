import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AdminAddLegislationRelationshipModalComponent } from './components/admin-add-legislation-relationship-modal/admin-add-legislation-relationship-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
import { AdminLegislationDetailCardComponent } from './components/admin-legislation-detail-card/admin-legislation-detail-card.component';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';

@Component({
    selector: 'app-admin-view-draft-legislation-relationship-tab',
    standalone: true,
    imports: [
        ButtonModule,
        OrganizationChartModule,
        CommonModule,
        DividerModule,
        TabViewModule,
        AdminLegislationDetailCardComponent,
    ],
    templateUrl:
        './admin-view-draft-legislation-relationship-tab.component.html',
    styleUrl: './admin-view-draft-legislation-relationship-tab.component.scss',
})
export class AdminViewDraftLegislationRelationshipTabComponent
    implements OnInit
{
    @Input({
        required: true,
    })
    legislation: LegislationDto;
    @Output()
    requestGetLegislativeHistory = new EventEmitter<string>();

    history: any;
    ref: DynamicDialogRef | undefined;
    data: TreeNode[] = [];

    constructor(
        private dialogService: DialogService,
        private legislationRelationshipDataService: LegislationRelationshipDataService
    ) {}
    ngOnInit(): void {
        this.legislationRelationshipDataService
            .AdminGetRepealHistiry(this.legislation?.id)
            .subscribe((res) => {
                this.history = res;
                console.log(this.history);
                this.data = [this.convertToTreeNode(res)];
            });
    }

    toInt(n: string) {
        return Number(n);
    }
    convertToTreeNode(data: any): TreeNode {
        return {
            label: `Legislation ID: ${data.legislationId}`,
            data: data,
            expanded: true,
            children: data.repealedLegislations.map((item) =>
                this.convertToTreeNode(item)
            ),
            leaf: data.repealedLegislations.length === 0,
            key: data.legislationId.toString(),
        };
    }
    openAddLegislationRelationshipModal() {
        this.ref = this.dialogService.open(
            AdminAddLegislationRelationshipModalComponent,
            {
                header: 'Add Legislation Relationship',
                width: '40%',
                data: {
                    legislation: this.legislation,
                },
            }
        );
        this.ref.onClose.subscribe((res) => {
            if (res && res.status === 200) {
                this.requestGetLegislativeHistory.emit('1');
            }
        });
    }
}
