import { BuildingType } from '../../constants/enums';
import { DzongkhagDTO } from '../locations/dzongkhag.dto';
import { LocalityDTO } from '../locations/locality.dto';
import { ThromdeDTO } from '../locations/thromde.dto';
import { UnitDTO } from '../units/unit.dto';
import { BuildingAmenityDTO } from './building-amenity.dto';
import { BuildingImageDTO } from './building-image.dto';
import { BuildingRuleDTO } from './building-rule.dto';
import { BuildingSurchargeDTO } from './building-surcharge.dto';

export interface CreateBuildingDTO {
    isActive: number;
    zhicharBuildingId: number | null;
    zhicharQrUuid: string | null;

    buildingType: BuildingType | null;
    regularFloorCount: number;
    basementCount: number;
    stiltCount: number;
    atticCount: number;
    jamthogCount: number;
    areaSqM: number | null;

    latitude: number;
    longitude: number;

    name: string | null;
    buildingNumber: string | null;
    streetName: string | null;
    quadrant: string | null;
    landmark: string | null;

    dzongkhagId: number;
    thromdeId: number;
    localityId: number;
}

export interface BuildingDTO {
    id: number;

    isActive: number;
    zhicharBuildingId: number | null;
    zhicharQrUuid: number | null;

    buildingType: BuildingType | null;
    regularFloorCount: number | null;
    basementCount: number;
    stiltCount: number;
    atticCount: number;
    jamthogCount: number;
    areaSqM: number | null;

    latitude: number;
    longitude: number;

    name: string | null;
    buildingNumber: string | null;
    streetName: string | null;
    quadrant: string | null;
    landmark: string | null;

    dzongkhagId: number;
    dzongkhag: DzongkhagDTO;
    thromdeId: number;
    thromde: ThromdeDTO;
    localityId: number;
    locality: LocalityDTO;

    buildingAmenities: BuildingAmenityDTO[];
    buildingRules: BuildingRuleDTO[];
    buildingImages: BuildingImageDTO[];
    buildingSurcharges: BuildingSurchargeDTO[];
    units: UnitDTO[];
}

export interface UpdateBuildingDto {
    isActive: number;
    zhicharBuildingId: number | null;
    zhicharQrUuid: string | null;

    buildingType: BuildingType | null;
    regularFloorCount: number;
    basementCount: number;
    stiltCount: number;
    atticCount: number;
    jamthogCount: number;
    areaSqM: number | null;

    latitude: number;
    longitude: number;

    name: string | null;
    buildingNumber: string | null;
    streetName: string | null;
    quadrant: string | null;
    landmark: string | null;

    dzongkhagId: number;
    thromdeId: number;
    localityId: number;
}
