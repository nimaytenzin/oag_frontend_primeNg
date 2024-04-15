import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlighter',
    standalone: true,
})
export class HighlighterPipe implements PipeTransform {
    transform(value: string, args: string): unknown {
        if (!args) return value;
        const escapedArgs = args.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(
            '\\b(' + escapedArgs + ')\\b|(' + escapedArgs + ')',
            'ig'
        );
        return value.replace(re, (match, p1, p2) =>
            p1
                ? `<span class="highlighted-text">${p1}</span>`
                : `<span class="highlighted-text">${p2}</span>`
        );
    }
}
