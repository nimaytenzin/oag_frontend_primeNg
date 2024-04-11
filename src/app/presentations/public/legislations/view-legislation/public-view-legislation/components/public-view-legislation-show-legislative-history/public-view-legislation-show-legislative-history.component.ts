import { Component } from '@angular/core';
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
    imports: [TimelineModule, CommonModule, ButtonModule, CardModule],
    templateUrl:
        './public-view-legislation-show-legislative-history.component.html',
    styleUrl:
        './public-view-legislation-show-legislative-history.component.scss',
})
export class PublicViewLegislationShowLegislativeHistoryComponent {
    instance: DynamicDialogComponent | undefined;
    data: LegislationDto[];
    events: EventItem[];

    getSectionStyles = GetSectionStylesPublic;
    constructor(
        public ref: DynamicDialogRef,
        private dialogService: DialogService,
        private sanitizer: DomSanitizer
    ) {
        this.instance = this.dialogService.getInstance(this.ref);
        this.data = this.instance.data;
        // this.events = [
        //     {
        //         status: 'Local Government Act of Bhutan 2007',
        //         date: '2007',
        //         icon: 'pi pi-shopping-cart',
        //         color: '#9C27B0',
        //         description: 'Show Dates',
        //         image: 'game-controller.jpg',
        //     },
        //     {
        //         status: 'Local Government Act of Bhutan 2009',
        //         date: '15th March 2012',
        //         icon: 'pi pi-cog',
        //         description:
        //             'Amended by Act 7 of 1997, 56th sitting of the parliament',
        //         color: '#673AB7',
        //     },
        //     {
        //         status: 'Local Government (Amendment) Act of Bhutan, 2014',
        //         date: '15th March 2012',
        //         icon: 'pi pi-cog',
        //         description:
        //             'An Act to amend the Local Government Act of Bhutan 2009;Parliament of the Kingdom of Bhutan do hereby enact the Local Government(Amendment) Act of Bhutan 2014 on the 13th Day of the 10th Month of theWood Male Horse Year of the Bhutanese Calendar corresponding to the 04thDay of December 2014 as follows:',
        //         color: '#673AB7',
        //     },
        // ];
        this.events = [
            {
                status: 'Enacted',
                title_eng: 'Local Government Act 2009',
                date: '2014',
                commencementDate: '15th March 2010',
            },
            {
                status: 'Enacted',
                title_eng: 'Local Government (Ammendment) Act 2014',
                date: '2014',
                commencementDate: '26th February 2015',
            },

            {
                status: 'Ammended',
                title_eng: 'Local Government Act 2009',
                date: '2009',
                commencementDate: '15th March 2010',
            },
            {
                status: 'Repealed',
                title_eng: 'Local Government Act 2007',
                date: '2007',
                commencementDate: '15th March 2010',
                repealDate: '31st July 2007',
            },
        ];
    }
}
