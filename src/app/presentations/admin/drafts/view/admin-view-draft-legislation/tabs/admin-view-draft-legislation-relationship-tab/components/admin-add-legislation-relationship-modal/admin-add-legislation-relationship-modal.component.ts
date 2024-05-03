import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownFilterEvent, DropdownModule } from 'primeng/dropdown';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { LegislationRelationshipActionEnum } from 'src/app/core/constants/enums';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { LegislationRelationshipDataService } from 'src/app/core/dataservice/legislative-history/legislation-relationship.dataservice';
import { DocumentCopyDataService } from 'src/app/core/dataservice/storage/document-copy.service';
import {
    CreateLegislationRelationshipDto,
    LegislationDto,
} from 'src/app/core/dto/legislation/legislation.dto';

@Component({
    selector: 'app-admin-add-legislation-relationship-modal',
    standalone: true,
    imports: [
        DropdownModule,
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        DividerModule,
    ],
    templateUrl: './admin-add-legislation-relationship-modal.component.html',
    styleUrl: './admin-add-legislation-relationship-modal.component.scss',
})
export class AdminAddLegislationRelationshipModalComponent implements OnInit {
    data: any;
    legislation: LegislationDto;
    instance: DynamicDialogComponent | undefined;

    legislationRelationshipActions = LegislationRelationshipActionEnum;
    actions = Object.values(LegislationRelationshipActionEnum);
    selectedAction: string = LegislationRelationshipActionEnum.REPEALS;

    legislations: LegislationDto[] = [];
    subjectLegislation: LegislationDto;

    repealModes = ['Whole', 'Part'];
    selectedRepealMode = 'Whole';
    searchKeyword: string;

    constructor(
        private messageService: MessageService,
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private documentCopyDataService: DocumentCopyDataService,
        private legislationDataService: LegislationDataService,
        private legislationRelationshipDataService: LegislationRelationshipDataService
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        this.legislation = this.data.legislation;
    }
    ngOnInit(): void {
        this.legislationDataService.AdminGetAllLegislationMinified().subscribe({
            next: (res) => {
                this.legislations = res;
            },
        });
    }

    searchLegisaltion(event: KeyboardEvent) {
        console.log(this.searchKeyword);
    }

    logFilter(event: DropdownFilterEvent) {
        console.log(event);
    }
    addRelationship() {
        if (this.selectedAction === LegislationRelationshipActionEnum.REPEALS) {
            const data: CreateLegislationRelationshipDto = {
                actingLegislationId: this.legislation.id,
                action: 'Repeals',
                affectedLegislationId: this.subjectLegislation.id,
                mode: this.selectedRepealMode,
            };
            this.legislationRelationshipDataService
                .AdminCreateNewLegislationRelationship(data)
                .subscribe({
                    next: (res) => {
                        this.ref.close({
                            status: 201,
                        });
                    },
                });
        } else {
            const data: CreateLegislationRelationshipDto = {
                actingLegislationId: this.subjectLegislation.id,
                action: 'Repeals',
                affectedLegislationId: this.legislation.id,
                mode: this.selectedRepealMode,
            };
            this.legislationRelationshipDataService
                .AdminCreateNewLegislationRelationship(data)
                .subscribe({
                    next: (res) => {
                        this.ref.close({
                            status: 201,
                        });
                    },
                });
        }
    }
}
