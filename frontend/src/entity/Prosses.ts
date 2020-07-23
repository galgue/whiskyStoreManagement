import { BerralType } from './BerralType';

export interface Prosses {
    id: number;
    name: string;
    description: string;
    duration: number;
    berralTypeId: number;
    berralType: BerralType;
}

export const isValid = (entity: Prosses) => {
    return !!(entity.id &&
        entity.name &&
        entity.description &&
        entity.berralTypeId &&
        entity.duration)
}