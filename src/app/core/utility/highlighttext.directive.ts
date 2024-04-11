import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true,
})
export class HighlightDirective implements OnInit {
    @Input('appHighlight') searchText: string;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.highlightText(this.searchText);
    }

    private highlightText(searchText: string) {
        const regex = new RegExp(searchText, 'gi');
        const html = this.el.nativeElement.innerHTML.replace(
            regex,
            (match) => `<span class="highlight">${match}</span>`
        );
        this.el.nativeElement.innerHTML = html;
    }
}
