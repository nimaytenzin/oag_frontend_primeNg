import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constants/constants';
import {
    BuildingDTO,
    CreateBuildingDTO,
    UpdateBuildingDto,
} from '../../dto/properties/building.dto';
import { Observable } from 'rxjs';
import {
    BuildingSurchargeDTO,
    CreateBuildingSurchargeDTO,
} from '../../dto/properties/building-surcharge.dto';

@Injectable({
    providedIn: 'root',
})
export class BuildingSurchargeDataService {
    apiUrl = API_URL;

    constructor(private http: HttpClient) {}

    CreateBuildingSurcharge(
        data: CreateBuildingSurchargeDTO
    ): Observable<BuildingSurchargeDTO> {
        return this.http.post<BuildingSurchargeDTO>(
            `${this.apiUrl}/building-surcharge`,
            data
        );
    }

    GetBuildingSurchargeByBuilding(
        buildingId: number
    ): Observable<BuildingSurchargeDTO[]> {
        return this.http.get<BuildingSurchargeDTO[]>(
            `${this.apiUrl}/building-surcharge/bid/${buildingId}`
        );
    }

    DeleteBuildingSurcharge(id: number) {
        return this.http.delete(`${this.apiUrl}/building-surcharge/${id}`);
    }
}
