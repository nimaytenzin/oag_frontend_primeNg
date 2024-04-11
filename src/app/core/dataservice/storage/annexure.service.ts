import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnnexureType } from '../../constants/enums';
import { AnnexureDto } from '../../dto/storage/annexure.dto';

@Injectable({
    providedIn: 'root',
})
export class AnnexureDataService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.apiUrl;
    private controllerName = 'annexure';

    GetAnnexuresByDraftLegislation(refId: number) {
        return this.http.get<AnnexureDto[]>(
            `${this.apiUrl}/${this.controllerName}/draft-legislation/${refId}`
        );
    }

    DeleteAnnexure(id: number) {
        return this.http.delete(`${this.apiUrl}/${this.controllerName}/${id}`);
    }

    GetAnnexuresByLegislationAndType(refId: number, type: AnnexureType) {
        return this.http.get<AnnexureDto[]>(
            `${this.apiUrl}/${this.controllerName}/legislation/${refId}/${type}`
        );
    }
    GetAnnexuresByDelegatedLegislationAndType(
        refId: number,
        type: AnnexureType
    ) {
        return this.http.get<AnnexureDto[]>(
            `${this.apiUrl}/${this.controllerName}/delegated-legislation/${refId}/${type}`
        );
    }
}
