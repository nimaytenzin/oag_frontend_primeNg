import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminCreateLeaseAgreementComponent } from '../crud-modals/admin-create-lease-agreement/admin-create-lease-agreement.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    lora: {
        normal: 'http://fonts.gstatic.com/s/lora/v9/aXJ7KVIGcejEy1abawZazg.ttf',
        bold: 'http://fonts.gstatic.com/s/lora/v9/aXJ7KVIGcejEy1abawZazg.ttf',
        italic: 'http://fonts.gstatic.com/s/lora/v9/AN2EZaj2tFRpyveuNn9BOg.ttf',
    },
};

@Component({
    selector: 'app-admin-master-lease-agreements',
    standalone: true,
    imports: [CheckboxModule, FormsModule, ButtonModule],
    providers: [DialogService],
    templateUrl: './admin-master-lease-agreements.component.html',
    styleUrl: './admin-master-lease-agreements.component.scss',
})
export class AdminMasterLeaseAgreementsComponent {
    agreementDay: number;
    agreementMonth: number;
    agreementYear: number;
    tenantName: string;
    tenantCid: string;
    tenantVillage: string;
    tenantGewog: string;
    tenantDzongkhag: string;
    tenantPresentAddress: string;
    ownerName: string;
    ownerCid: string;
    ownerVillage: string;
    ownerGewog: string;
    ownerDzongkhag: string;
    ownerAddress: string;
    buildingNo: string;

    tenantSubletAuthority = false;

    plotNo: string;
    unitName: string;
    unitId: number;
    buildingNumber: string;
    plotNumber: string;
    leasePeriod: number;
    leaseStartDate: string;
    leaseEndDate: string;
    rent: number;
    leasePurpose: string;
    paymentDueDay: number;
    securityDepositAmount: number;
    tenantPhoneNumber: string;
    ownerPhoneNumber: string;
    witnessName: string;
    witnessCid: string;
    witnessAddress: string;
    witnessPhoneNumber: string;

    agreementSigningLocation: string;

    ref: DynamicDialogRef | undefined;

    constructor(private dialogServie: DialogService) {
        // Initialize variables with sample values
        this.agreementDay = 1;
        this.agreementMonth = 2;
        this.agreementYear = 2024;
        this.tenantName = 'Nima Yoezer Tenzin';
        this.tenantCid = '10302000402';
        this.tenantVillage = 'Pangna';
        this.tenantGewog = 'Drujeygang';
        this.tenantDzongkhag = 'Dagana';
        this.tenantPresentAddress = '264 Babesa zur lam 2, Babesa, Thimphu';
        this.ownerName = 'Kinley Wangyel';
        this.ownerCid = '10503000525';
        this.ownerVillage = 'Babesa';
        this.ownerGewog = 'Babesa';
        this.ownerDzongkhag = 'Thimphu';
        this.ownerAddress = '224 Babesa lam tag';
        this.buildingNo = '224';
        this.plotNo = 'BAG-592';
        this.unitName = 'Flat 12';
        this.unitId = 12;
        this.buildingNumber = '225';
        this.plotNumber = 'BAG-592';
        this.leasePeriod = 12;
        this.leaseStartDate = '2024-03-01';
        this.leaseEndDate = '2025-02-28';
        this.rent = 5000;
        this.leasePurpose = 'Residence';
        this.paymentDueDay = 5;
        this.securityDepositAmount = 10000;
        this.tenantPhoneNumber = '123-456-7890';
        this.ownerPhoneNumber = '987-654-3210';

        this.witnessName = 'Sonam Tshering';
        this.witnessCid = '10302231233';
        this.witnessAddress = 'Babesa Truck parking';
        this.witnessPhoneNumber = '177283722';
        this.agreementSigningLocation = 'Babesa, Thim Throm';
    }

    generatePdf() {
        const data = [
            ['Name', 'Email', 'Country'],
            ['John Doe', 'johndoe@example.com', 'USA'],
            ['Jane Smith', 'janesmith@example.com', 'Canada'],
            ['Bob Johnson', 'bobjohnson@example.com', 'UK'],
        ];

        const docDefinition = {
            content: [
                {
                    text: 'Lease Agreement',
                    style: 'title',
                    alignment: 'center',
                },
                {
                    text: [
                        'This Rental/lease Agreement is executed on.\n',
                        'Header style in this example sets alignment to justify, so this paragraph should be rendered \n',
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.',
                    ],
                    style: 'clause',
                    bold: false,
                },
            ],
            styles: {
                title: {
                    fontSize: 15,
                    bold: true,
                    alignment: 'center',
                },
                clause: {
                    fontSize: 12,
                    bold: false,
                    alignment: 'justify',
                },
            },
            defaultStyle: {
                font: 'lora',
            },
        };

        pdfMake.createPdf(docDefinition).download('userdata.pdf');
    }

    openAddLeaseAgreementModal() {
        this.ref = this.dialogServie.open(AdminCreateLeaseAgreementComponent, {
            header: 'Add Lease Agreement',
            width: '1000px',
            height: '1000px',
            maximizable: true,
        });
    }
}
