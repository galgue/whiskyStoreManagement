import { User } from './User';
import { BerralBatch } from './BerralBatch';

export interface Use {
    id: number;
    berralBatchId: number;
    berralBatch: BerralBatch;
    purpose: string;
    quantity: number;
    creatorId: number;
    creator: User;
}