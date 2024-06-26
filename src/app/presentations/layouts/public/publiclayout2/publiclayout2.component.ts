import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicNavbar2Component } from '../public-navbar2/public-navbar2.component';
import { PublicFooterComponent } from '../public-footer/public-footer.component';

@Component({
    selector: 'app-publiclayout2',
    standalone: true,
    imports: [RouterModule, PublicNavbar2Component, PublicFooterComponent],
    templateUrl: './publiclayout2.component.html',
    styleUrls: ['./publiclayout2.component.scss'],
})
export class Publiclayout2Component implements OnInit {
    constructor() {}

    ngOnInit() {}
}
