import { User } from './User';
import { BerralBatch } from './BerralBatch';

export interface Note {
    id: number;
    berralBatchId: number;
    berralBatch: BerralBatch;
    content: string;
    creatorId: number;
    creator: User;
}

export const isValid = (entity: Note) => {
    return !!(
        entity.berralBatchId &&
        entity.content &&
        entity.creatorId) 
}