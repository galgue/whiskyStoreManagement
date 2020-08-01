import { Mission } from './Mission';
import { ProssesChain } from './ProssesChain';
import { BerralType } from './BerralType';
import { Note } from './Note';
import { Use } from './Uses';

export interface BerralBatch {
    id: number;
    berralTypeId: number;
    berralType: BerralType;
    prossesChainId: number;
    prossesChain: ProssesChain;
    agingDuration: number;
    quantityAtFill: number;
    lastBerralBatchId?: number | null;
    lastBerralBatch: BerralBatch;
    alcoholPercentage: number;
    spiritType: string;
    ownership: string;
    locationatWarehouse: string;
    isActive: boolean;
    placeInChain: number;
    createdAt: Date;
    endDate: Date;
    missions?: Mission[];
    notes?: Note[];
    uses?: Use[];
}

export const isValid = (entity: BerralBatch) => {
    return (!!(
        entity.prossesChainId &&
        entity.quantityAtFill !== undefined &&
        entity.alcoholPercentage !== undefined &&
        entity.spiritType &&
        entity.ownership &&
        entity.locationatWarehouse && 
        entity.createdAt) || 
        !!(entity.lastBerralBatchId !== undefined &&
            entity.alcoholPercentage !== undefined&&
            entity.locationatWarehouse &&
            entity.createdAt))
}