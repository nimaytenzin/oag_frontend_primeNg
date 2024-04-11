import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-public-guides-technical-description',
    standalone: true,
    imports: [MarkdownModule],
    templateUrl: './public-guides-technical-description.component.html',
    styleUrl: './public-guides-technical-description.component.scss',
})
export class PublicGuidesTechnicalDescriptionComponent {}
