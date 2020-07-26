import { Prosses } from './Prosses';

export interface ProssesChain {
    id: number;
    name: string;
    description: string;
    prossesId1: number;
    prosses1: Prosses;
    prossesId2: number;
    prosses2: Prosses;
    prossesId3: number;
    prosses3: Prosses;
    prossesId4: number;
    prosses4: Prosses;
    numberOfProsseses: number;
}

export const isValid = (entity: ProssesChain) => {
    return !!(
        entity.name &&
        entity.description &&
        entity.prossesId1 
        );
}