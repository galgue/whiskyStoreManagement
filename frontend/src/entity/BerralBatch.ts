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
    lastBerralBatchId?: number;
    alcoholPercentage: number;
    spiritType: string;
    ownership: string;
    locationatWarehouse: string;
    isActive?: boolean;
    missions?: Mission[];
    notes?: Note[];
    uses?: Use[];
}