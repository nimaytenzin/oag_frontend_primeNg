import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
    DialogService,
    DynamicDialogComponent,
    DynamicDialogRef,
} from 'primeng/dynamicdialog';
import {
    AmendmentChangeType,
    ChangeValueAttirbutes,
} from 'src/app/core/constants/enums';
import { AmendmentsDataService } from 'src/app/core/dataservice/amendments/amendment.dataservice';
import { AmendmentDto } from 'src/app/core/dto/ammendment/ammendment.dto';
import { ChangeDto } from 'src/app/core/dto/legislation/section.dto';

@Component({
    selector: 'app-admin-view-amendments-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-view-amendments-modal.component.html',
    styleUrls: ['./admin-view-amendments-modal.component.scss'],
})
export class AdminViewAmendmentsModalComponent implements OnInit {
    amendment: AmendmentDto;
    instance: DynamicDialogComponent | undefined;
    changes: ChangeDto[] = [];
    amendmentChangeTypes = AmendmentChangeType;
    changeValueAttributes = ChangeValueAttirbutes;
    constructor(
        private dialogService: DialogService,
        public ref: DynamicDialogRef,
        private amendmentDataService: AmendmentsDataService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.amendment = this.instance.data;
    }

    ngOnInit() {
        this.amendmentDataService
            .AdminGetChangesByAmendments(this.amendment.id)
            .subscribe((res) => {
                console.log(res);
                this.changes = res;
            });
    }

    sanitizeHtml(html: string | undefined): SafeHtml {
        if (html) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        } else {
            return this.sanitizer.bypassSecurityTrustHtml('');
        }
    }
}
