
export interface BerralType {
    id: number;
    name: string;
    volume: number;
    oakType: string;
    quantity: number;
}

export const isValid = (entity: BerralType) => {
    return !!(entity.id &&
        entity.name &&
        entity.volume &&
        entity.oakType &&
        entity.quantity);
}