import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { MenuItem } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { BuildingDataService } from 'src/app/core/dataservice/building.dataservice';
import { BuildingDTO } from 'src/app/core/dto/properties/building.dto';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { PARSEBUILDINGFLOORS } from 'src/app/core/utility/helper.function';
import { ButtonModule } from 'primeng/button';
import { AdminListUnitsComponent } from '../../units/admin-list-units/admin-list-units.component';

@Component({
    selector: 'app-admin-view-building',
    standalone: true,
    imports: [
        TabViewModule,
        QRCodeModule,
        CommonModule,
        GalleriaModule,
        ButtonModule,
        AdminListUnitsComponent,
    ],
    templateUrl: './admin-view-building.component.html',
    styleUrl: './admin-view-building.component.scss',
})
export class AdminViewBuildingComponent implements OnInit {
    buildingId: number;
    building: BuildingDTO = {} as BuildingDTO;

    items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;
    getBuildingFloorConfiguration = PARSEBUILDINGFLOORS;

    buildingAmenities = [
        'Swimming Pool',
        'Gymnasium',
        '24/7 Security',
        'Parking Garage',
        'Lounge Area',
        'Rooftop Garden',
        'Laundry Facilities',
        'Pet Friendly',
    ];

    buildingRules = [
        'No smoking inside the building',
        'No loud noises after 10:00 PM',
        'Pets must be kept on a leash in common areas',
        'Guests must be accompanied by residents at all times',
        'Trash must be disposed of in designated areas',
        'No soliciting in the building premises',
        'Residents must comply with recycling guidelines',
    ];

    buildingCharges = [
        { item: 'Cleaning Charges', amount: 200 },
        { item: 'App Service Charge', amount: 50 },
    ];

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 6,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];

    buildingImages = [
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/422605187_10168604580345720_6770344176585777968_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6b907e&_nc_ohc=pQRYwa-DFWwAX-XemgC&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfAdLbWvA74CI0zTUmDxoJ1o_6b_a1FHjt7P_8NIeP-IHg&oe=65C42A32',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423514285_10168604567200720_1206492049996537058_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=369753&_nc_ohc=wFtOvyBr4WkAX9lM0zh&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfB7PybXbm-D4Jd4V_RECwuglnYFSta8naItuDm7usrjdA&oe=65C46D6E',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423584341_10168604566500720_4513467721540051949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=369753&_nc_ohc=Mnm9GES_c_YAX9IR_Mr&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDcn2X1pGtdGsW1MjD1Q6drA6pe6jQyFMNdgYRWLgOFPg&oe=65C4FD6F',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/406039206_1669647227196794_3804718209676406786_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=6VJcLp-w9GYAX_7mKFf&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDHoJa6_rVUsd1N1vOIV_laNpvdFgUuMRkATeBJTx9dWA&oe=65C552E4',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/419803479_1047716129774264_3442311102591319529_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=6b907e&_nc_ohc=fn4WEUbq8DcAX8bEVw1&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDxGl16bpoUcALNWZFDUCTjeNC2KVjRhgVZylas1bEsIg&oe=65C45E09',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/422605187_10168604580345720_6770344176585777968_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6b907e&_nc_ohc=pQRYwa-DFWwAX-XemgC&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfAdLbWvA74CI0zTUmDxoJ1o_6b_a1FHjt7P_8NIeP-IHg&oe=65C42A32',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423514285_10168604567200720_1206492049996537058_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=369753&_nc_ohc=wFtOvyBr4WkAX9lM0zh&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfB7PybXbm-D4Jd4V_RECwuglnYFSta8naItuDm7usrjdA&oe=65C46D6E',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423584341_10168604566500720_4513467721540051949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=369753&_nc_ohc=Mnm9GES_c_YAX9IR_Mr&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDcn2X1pGtdGsW1MjD1Q6drA6pe6jQyFMNdgYRWLgOFPg&oe=65C4FD6F',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/406039206_1669647227196794_3804718209676406786_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=6VJcLp-w9GYAX_7mKFf&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDHoJa6_rVUsd1N1vOIV_laNpvdFgUuMRkATeBJTx9dWA&oe=65C552E4',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/419803479_1047716129774264_3442311102591319529_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=6b907e&_nc_ohc=fn4WEUbq8DcAX8bEVw1&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDxGl16bpoUcALNWZFDUCTjeNC2KVjRhgVZylas1bEsIg&oe=65C45E09',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/422605187_10168604580345720_6770344176585777968_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6b907e&_nc_ohc=pQRYwa-DFWwAX-XemgC&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfAdLbWvA74CI0zTUmDxoJ1o_6b_a1FHjt7P_8NIeP-IHg&oe=65C42A32',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423514285_10168604567200720_1206492049996537058_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=369753&_nc_ohc=wFtOvyBr4WkAX9lM0zh&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfB7PybXbm-D4Jd4V_RECwuglnYFSta8naItuDm7usrjdA&oe=65C46D6E',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/423584341_10168604566500720_4513467721540051949_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=369753&_nc_ohc=Mnm9GES_c_YAX9IR_Mr&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDcn2X1pGtdGsW1MjD1Q6drA6pe6jQyFMNdgYRWLgOFPg&oe=65C4FD6F',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/406039206_1669647227196794_3804718209676406786_n.jpg?stp=dst-jpg_p720x720&_nc_cat=102&ccb=1-7&_nc_sid=6b907e&_nc_ohc=6VJcLp-w9GYAX_7mKFf&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDHoJa6_rVUsd1N1vOIV_laNpvdFgUuMRkATeBJTx9dWA&oe=65C552E4',
        'https://scontent.fpbh2-1.fna.fbcdn.net/v/t39.30808-6/419803479_1047716129774264_3442311102591319529_n.jpg?stp=dst-jpg_s960x960&_nc_cat=107&ccb=1-7&_nc_sid=6b907e&_nc_ohc=fn4WEUbq8DcAX8bEVw1&_nc_ht=scontent.fpbh2-1.fna&oh=00_AfDxGl16bpoUcALNWZFDUCTjeNC2KVjRhgVZylas1bEsIg&oe=65C45E09',
    ];
    constructor(
        private route: ActivatedRoute,
        private buildingDataService: BuildingDataService
    ) {}
    ngOnInit(): void {
        this.buildingId = Number(
            this.route.snapshot.paramMap.get('buildingId')
        );

        this.buildingDataService
            .GetOneById(this.buildingId)
            .subscribe((res) => {
                this.building = res;
            });

        this.items = [
            { label: 'Details', icon: 'pi pi-fw pi-home' },
            { label: 'Units', icon: 'pi pi-fw pi-calendar' },
            { label: 'Building Rules', icon: 'pi pi-fw pi-pencil' },
            { label: 'LandLord', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        ];
        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }

    getQr(val) {
        return val;
    }

    openAddUnitModal() {
        alert('implement add unit modal');
    }
}
