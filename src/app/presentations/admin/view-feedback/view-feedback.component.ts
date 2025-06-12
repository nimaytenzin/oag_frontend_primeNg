import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FeedbackDataService } from 'src/app/core/dataservice/feedbacks/feedback.dataservice';
import { FeedbackDTO } from 'src/app/core/dto/legislation/legislation.dto';


@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    TagModule,
    DialogModule,
    TooltipModule,
    BadgeModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './view-feedback.component.html',
  styleUrl: './view-feedback.component.scss'
})
export class ViewFeedbackComponent implements OnInit {
  
  feedbacks: FeedbackDTO[] = [];
  showDetailDialog = false;
  showResponseDialog = false;
  adminResponse = '';
  
  constructor(private feedbackService: FeedbackDataService) {}

  ngOnInit() {
    this.loadFeedbacks();
  }

  async loadFeedbacks() {
    // Mock data - replace with actual API call
    this.feedbacks = await this.feedbackService.GetAllFeedback().toPromise();
    console.log('Feedbacks loaded:', this.feedbacks);
  }
}
