import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FeedbackDataService } from 'src/app/core/dataservice/feedbacks/feedback.dataservice';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule
  ],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss'
})
export class FeedbacksComponent {
  constructor(
    private feedbackService: FeedbackDataService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      this.feedbackService.CreateFeedback(form.value).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully:', response);
          // Show success message or perform any other action
          form.resetForm();
        },
        error: (error) => {
          console.error('Error submitting feedback:', error);
          // Show error message or perform any other action 
        }
      });
    }
  }

  clearForm(form: NgForm) {
    form.resetForm();
  }
}
