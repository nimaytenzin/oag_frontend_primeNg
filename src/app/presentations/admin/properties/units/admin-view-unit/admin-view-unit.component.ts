import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-view-unit',
    standalone: true,
    imports: [],
    templateUrl: './admin-view-unit.component.html',
    styleUrl: './admin-view-unit.component.scss',
})
export class AdminViewUnitComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}
    unitId: number;

    ngOnInit(): void {
        this.unitId = Number(this.route.snapshot.paramMap.get('unitId'));
    }
}
