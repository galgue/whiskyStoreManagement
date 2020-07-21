import { BerralType } from './BerralType';

export interface Prosses {
    id: number;
    name: string;
    description: string;
    duration: number;
    berralTypeId: number;
    berralType: BerralType;
}