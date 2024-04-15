import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlighter',
    standalone: true,
})
export class HighlighterPipe implements PipeTransform {
    transform(value: string, args: string): unknown {
        if (!args) return value;
        const searchTerms = args.split(',').map((term) => term.trim());
        const highlightedValue = value.replace(/(<([^>]+)>)/gi, ''); // Remove existing HTML tags for accurate highlighting

        let result = highlightedValue;
        searchTerms.forEach((term) => {
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp(
                '\\b(' + escapedTerm + ')\\b|(' + escapedTerm + ')',
                'ig'
            );
            result = result.replace(re, (match, p1, p2) =>
                p1
                    ? `<span class="highlighted-text">${p1}</span>`
                    : `<span class="highlighted-text">${p2}</span>`
            );
        });
        return result;
    }
}
