import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BuildingDataService } from 'src/app/core/dataservice/building.dataservice';
import { BuildingDTO } from 'src/app/core/dto/properties/building.dto';
import { PARSEBUILDINGFLOORS } from 'src/app/core/utility/helper.function';
import { AdminAddBuildingComponent } from '../crud-modal/admin-add-building/admin-add-building.component';
import { AdminEditBuildingComponent } from '../crud-modal/admin-edit-building/admin-edit-building.component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-admin-list-buildings',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        GalleriaModule,
        TableModule,
        QRCodeModule,
    ],
    providers: [DialogService],
    templateUrl: './admin-list-buildings.component.html',
    styleUrl: './admin-list-buildings.component.scss',
})
export class AdminListBuildingsComponent {
    constructor(
        public dialogService: DialogService,
        private buildingDataService: BuildingDataService,
        private router: Router
    ) {}

    getBuildingFloorConfiguration = PARSEBUILDINGFLOORS;

    ref: DynamicDialogRef | undefined;
    buildingsPaginated: BuildingDTO[] = [];

    images: any[] | undefined = [
        {
            itemImageSrc:
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZuTh2pAYS34kaEQNSOM9RBO6ioWoDXyxfdlETS4_fmohj2xD4in-L5CFwFdOAx0UbQhWS940_tlPSSrIgN9-SyBJ4Vo_ryM6304PbiV1d49ce1pDDtsYiKv0Ic02Bmwh_qcSQYV9lIz2Ee1AjGZpPeizGD41-4LKY_yVui7aeSroH_iM9E_U/w640-h310/320827395_472429458368859_4249820878481691725_n.jpg',
            thumbnailImageSrc:
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZuTh2pAYS34kaEQNSOM9RBO6ioWoDXyxfdlETS4_fmohj2xD4in-L5CFwFdOAx0UbQhWS940_tlPSSrIgN9-SyBJ4Vo_ryM6304PbiV1d49ce1pDDtsYiKv0Ic02Bmwh_qcSQYV9lIz2Ee1AjGZpPeizGD41-4LKY_yVui7aeSroH_iM9E_U/w640-h310/320827395_472429458368859_4249820878481691725_n.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
        },
        {
            itemImageSrc:
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGO9S1uc27UbkKXBjxuh7Mou9-zvhltMpOqylwEP0CTYmmVlQNZbFCpbjfNZyq-FiQxRY6sYjLuAov6g8AdNiVzFHiJEaYrMxLqMNvkgwfkNiKKJQG11cJbwVGdYuTho3Mx90w4IpX8URii8-wmADV2JQ0P8xL_jcH_AadaXLrFqgBF7tCfu0/w640-h478/museum%202.jpg',
            thumbnailImageSrc:
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZuTh2pAYS34kaEQNSOM9RBO6ioWoDXyxfdlETS4_fmohj2xD4in-L5CFwFdOAx0UbQhWS940_tlPSSrIgN9-SyBJ4Vo_ryM6304PbiV1d49ce1pDDtsYiKv0Ic02Bmwh_qcSQYV9lIz2Ee1AjGZpPeizGD41-4LKY_yVui7aeSroH_iM9E_U/w640-h310/320827395_472429458368859_4249820878481691725_n.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
        },
    ];

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
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

    ngOnInit(): void {
        this.getPaginatedBuildings();
    }

    getQr(val) {
        return val;
    }

    openViewBuildingDetails(building: BuildingDTO) {
        this.router.navigate([
            '/admin/master-properties/building/',
            building.id,
        ]);
    }
    openAddBuildingModal() {
        this.ref = this.dialogService.open(AdminAddBuildingComponent, {
            header: 'Add Building',

            width: '50vw',
        });
        this.ref.onClose.subscribe((res) => {
            if (res.added) {
                this.getPaginatedBuildings();
            }
        });
    }

    openEditBuildingModal(data: BuildingDTO) {
        this.ref = this.dialogService.open(AdminEditBuildingComponent, {
            header: 'Edit Building',
            width: '50vw',
            data: {
                ...data,
            },
        });
        this.ref.onClose.subscribe((res) => {
            if (res.updated) {
                this.getPaginatedBuildings();
            }
        });
    }

    getPaginatedBuildings() {
        this.buildingDataService.GetBuildingsPaginated().subscribe({
            next: (res) => {
                console.log('LIST OF BUILDINGS', res);
                this.buildingsPaginated = res;
            },
        });
    }
}
