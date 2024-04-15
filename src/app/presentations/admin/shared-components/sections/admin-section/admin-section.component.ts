import { CommonModule } from '@angular/common';
import { Component, Input, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject } from 'rxjs';
import { LanguageType } from 'src/app/core/constants/enums';
import { SectionDto } from 'src/app/core/dto/legislation/section.dto';
import { GetSectionStylesPublic } from 'src/app/core/utility/documentStyles';

@Component({
    selector: 'app-admin-section',
    standalone: true,
    imports: [ButtonModule, CommonModule],

    templateUrl: './admin-section.component.html',
    styleUrl: './admin-section.component.scss',
})
export class AdminSectionComponent {
    @Input() section: SectionDto;

    getSectionStyles = GetSectionStylesPublic;
    languageType = LanguageType;
    selectedLanguage = LanguageType.ENG;
    item: SectionDto;

    private fontSizeHeadingSubject = new BehaviorSubject<number>(20);
    private fontSizeContentSubject = new BehaviorSubject<number>(18);
    private fontSizeAmmendmentNoteSubject = new BehaviorSubject<number>(14);

    public fontSizeAmmendmentNotes$ =
        this.fontSizeAmmendmentNoteSubject.asObservable();
    public fontSizeHeading$ = this.fontSizeHeadingSubject.asObservable();
    public fontSizeContent$ = this.fontSizeContentSubject.asObservable();

    addSection() {}

    constructor(private sanitizer: DomSanitizer) {}

    sanitizeHtml(html: string | undefined): SafeHtml {
        if (html) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        } else {
            return this.sanitizer.bypassSecurityTrustHtml('');
        }
    }

    increaseFontSize() {
        this.fontSizeAmmendmentNoteSubject.next(
            this.fontSizeAmmendmentNoteSubject.getValue() + 1
        );
        this.fontSizeHeadingSubject.next(
            this.fontSizeHeadingSubject.getValue() + 1
        );
        this.fontSizeContentSubject.next(
            this.fontSizeContentSubject.getValue() + 1
        );
    }
    decreaseFontSize() {
        this.fontSizeAmmendmentNoteSubject.next(
            this.fontSizeAmmendmentNoteSubject.getValue() - 1
        );
        this.fontSizeHeadingSubject.next(
            this.fontSizeHeadingSubject.getValue() - 1
        );
        this.fontSizeContentSubject.next(
            this.fontSizeContentSubject.getValue() - 1
        );
    }
}
