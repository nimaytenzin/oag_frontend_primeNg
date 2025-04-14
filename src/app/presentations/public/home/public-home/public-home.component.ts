import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PublicHomeSearchLegislationsResultsModalComponent } from './components/public-home-search-legislations-results-modal/public-home-search-legislations-results-modal.component';
import { ChipsModule } from 'primeng/chips';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { gsap } from 'gsap';

export interface PublicHomeSearchParameters {
    searchKeyword: string;
    searchDocumentType: string;
    searchIn: string;
}
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { SEARCHDOCUMENTYPES } from 'src/app/core/constants/enums';
import { Title } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { LegislationDto } from 'src/app/core/dto/legislation/legislation.dto';
import { CardModule } from 'primeng/card';
import { LegislationDataService } from 'src/app/core/dataservice/legislations/legislations.dataservice';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { StatisticsDataService } from 'src/app/core/dataservice/statistics/statistics.dataservice';
import {
    DelegatedLegislationStatisticsSummaryDto,
    LegislationStatisticsSummaryDto,
} from 'src/app/core/dto/statistics/legislation-stats.dto';
import { AnimatedCounterComponent } from '../../components/animated-counter/animated-counter.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-public-home',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        ButtonModule,
        ChipsModule,
        MessagesModule,
        ToastModule,
        CardModule,
        CommonModule,
        AnimatedCounterComponent,
        TableModule,
        DividerModule,
        StyleClassModule,
    ],
    providers: [DialogService, MessageService],
    templateUrl: './public-home.component.html',
    styleUrl: './public-home.component.scss',
})
export class PublicHomeComponent implements OnInit, AfterViewInit {
    ref: DynamicDialogRef | undefined;
    @ViewChild('hContainer') hContainer: ElementRef;
    @ViewChild('centerElement') centerElement!: ElementRef;

    searchKeywords: string[];
    searchInTitle: boolean = false;
    searchInContent: boolean = true;

    legislations: LegislationDto[] = [];
    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string = this.documentType.LEGISLATIONS;
    legislationStats: LegislationStatisticsSummaryDto;
    delegatedLegisaltionStats: DelegatedLegislationStatisticsSummaryDto;
    latestLegislations: LegislationDto[] = [];


    constructor(
        public router: Router,
        private messageService: MessageService,
        private titleService: Title,
        private legislationDataService: LegislationDataService,
        private statisticsDataService: StatisticsDataService
    ) {
        this.titleService.setTitle('Depository of Laws');
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin(Flip);
        this.getStats();
    }
    ngAfterViewInit(): void { }
    ngOnInit(): void {
        // this.legislationDataService
        //     .GetLatestLegislations(9)
        //     .subscribe((res) => {
        //         this.legislations = res;
        //     });

        this.legislationDataService.GetLatestLegislationsPublic(5).subscribe((res) => {
            this.latestLegislations = res;
        });
    }

    onLegislationClick(legislation: LegislationDto) {
        this.router.navigate([`legislations/view/${legislation.id}`]);
    }
    getStats() {
        this.statisticsDataService
            .GetLegislationStatisticsSummary()
            .subscribe((res) => {
                this.legislationStats = res;
            });

        this.statisticsDataService
            .GetDelegatedLegislationStatisticsSummary()
            .subscribe((res) => {
                this.delegatedLegisaltionStats = res;
            });
    }
    // numberWithCommas(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // }

    searchForLegislations(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'tc',
            detail: 'Message Content',
        });

        const keyWordQueryParam = this.searchKeywords.join(',');
        const inQueryParam = this.searchDocumentType;
        const withinQueryParam = this.searchInTitle ? 'Title' : 'Content';
        this.router.navigate(['search'], {
            queryParams: {
                Keyword: keyWordQueryParam,
                In: inQueryParam,
                Within: withinQueryParam,
            },
        });
        // const data: PublicHomeSearchParameters = {
        //     searchKeyword: this.searchKeyword,
        //     searchDocumentType: this.searchDocumentType,
        //     searchIn: '',
        // };
        // this.ref = this.dialogService.open(
        //     PublicHomeSearchLegislationsResultsModalComponent,
        //     {
        //         header: 'Search Results',
        //         data: data,
        //     }
        // );s
    }
    toggleCheckbox(checkbox: string) {
        if (checkbox === 'Title') {
            this.searchInTitle = true;
            this.searchInContent = false;
        } else if (checkbox === 'Content') {
            this.searchInTitle = false;
            this.searchInContent = true;
        }
    }
}
