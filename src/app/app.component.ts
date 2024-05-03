import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    showPreloader = true;

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        setTimeout(() => {
            this.showPreloader = false;
        }, 2000);
        this.primengConfig.ripple = true;
        //optional configuration with the default configuration
    }
}
