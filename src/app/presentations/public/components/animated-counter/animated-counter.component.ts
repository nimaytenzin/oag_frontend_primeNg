import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-animated-counter',
    standalone: true,
    templateUrl: './animated-counter.component.html',
    styleUrls: ['./animated-counter.component.scss'],
})
export class AnimatedCounterComponent implements AfterViewInit {
    @ViewChild('counter') counter: ElementRef;
    @Input({
        required: true,
    })
    endNumer: number;
    constructor(private renderer: Renderer2) {}

    ngAfterViewInit() {
        console.log(this.endNumer);
        this.animateCounter(0, this.endNumer, 5000);
    }

    animateCounter(start: number, end: number, duration: number) {
        const startTime = performance.now();
        const step = (timestamp: number) => {
            const progress = timestamp - startTime;
            const progressFraction = Math.min(progress / duration, 1);
            const currentValue = start + progressFraction * (end - start);
            this.renderer.setProperty(
                this.counter.nativeElement,
                'textContent',
                Math.round(currentValue)
            );
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}
