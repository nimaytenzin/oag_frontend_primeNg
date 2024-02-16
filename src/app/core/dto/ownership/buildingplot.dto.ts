import { BuildingDTO } from '../properties/building.dto';

export interface BuildingPlotDTO {
    id: number;
    buildingId: number;
    building?: BuildingDTO;
    thramNumber: string;
    plotId: string;
}

export interface CreateBuildingPlotDTO {
    buildingId: number;
    thramNumber: string;
    plotId: string;
}
