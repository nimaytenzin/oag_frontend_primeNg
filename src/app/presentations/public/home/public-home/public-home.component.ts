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
    legislations: LegislationDto[] = [];
    documentTypes = Object.values(SEARCHDOCUMENTYPES);
    documentType = SEARCHDOCUMENTYPES;
    searchDocumentType: string = this.documentType.LEGISLATIONS;
    legislationStats: LegislationStatisticsSummaryDto;
    delegatedLegisaltionStats: DelegatedLegislationStatisticsSummaryDto;
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
    ngAfterViewInit(): void {
        gsap.from(this.centerElement.nativeElement, {
            duration: 1.5,
            opacity: 0,
            scale: 1.5, // Scale up to 1.5 times its original size
            y: '-100%', // Move it up by 100% of its height
            ease: 'power1.out', // Use a power1 easing function for a smooth start and end
            delay: 1, // Start the animation after a half-second delay
        });
        // gsap.fromTo(
        //     '.cloud1',
        //     { left: '0%' },
        //     {
        //         left: '30%',
        //         top: '50%',
        //         duration: 5000,
        //         repeat: 1,
        //         opacity: 0,
        //         ease: 'linear',
        //         scrollTrigger: {
        //             trigger: '.cloud1',
        //             start: 'top bottom', // Start the animation when the top of the element hits the bottom of the viewport
        //             end: 'bottom top', // End the animation when the bottom of the element hits the top of the viewport
        //             scrub: true, // Smoothly scrub the animation based on scroll position
        //         },
        //     }
        // );

        gsap.to('.cloud1', {
            left: '100%',
            duration: 225,
            repeat: -1,
            ease: 'linear',
        });
        gsap.to('.cloud2', {
            left: '100%',
            duration: 225,
            repeat: -1,
            ease: 'linear',
        });
        gsap.to('.cloud3', {
            right: '100%',
            duration: 202,
            repeat: -1,
            ease: 'linear',
        });
        gsap.to('.cloud4', {
            right: '100%',
            duration: 202,
            repeat: -1,
            ease: 'linear',
        });
        gsap.to('.cloud5', {
            left: '100%',
            duration: 250,
            repeat: -1,
            ease: 'linear',
        });
        const items = document.querySelectorAll('.data');

        // gsap.from(items, {
        //     textContent: 0,
        //     duration: 4,
        //     ease: 'power1.in',
        //     snap: { textContent: 1 },
        //     onUpdate: function () {
        //         this.targets()[0].innerHTML = this.numberWithCommas(
        //             Math.ceil(this.targets()[0].textContent)
        //         );
        //     },
        // });
    }
    ngOnInit(): void {
        this.legislationDataService
            .GetLatestLegislations(9)
            .subscribe((res) => {
                this.legislations = res;
            });
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
        } else if (checkbox === 'Content') {
            this.searchInTitle = false;
        }
    }
}
