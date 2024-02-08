import { BuildingDTO } from '../properties/building.dto';

export interface UnitDTO {
    id: number;
    buildingId: number;
    zhicharUnitId: number;
    zhicharQrUuid: string;
    floorLevel: string;
    unitNumber: string;
    bedroomCount: number;
    toiletCount: number;
    balconyCount: number;
    floorArea: number;
    powerConsumerId: string;

    building?: BuildingDTO;
}

export interface CreateUnitDTO {
    buildingId: number;
    zhicharUnitId: number;
    zhicharQrUuid: string;
    floorLevel: string;
    unitNumber: string;
    bedroomCount: number;
    toiletCount: number;
    balconyCount: number;
    floorArea?: number;

    powerConsumerId?: string;
}
