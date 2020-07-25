import { User } from './User';
import { ProssesChain } from './ProssesChain';
import { BerralBatch } from './BerralBatch';

export interface Mission {
    id: number;
    berralBatchId: number;
    berralBatch: BerralBatch;
    topic: string;
    description: string;
    createdOn: Date;
    reminderDate: Date;
    creatorId: number;
    creator: User;
    executeById: number;
    executeBy: User;
    isCompleted: boolean;
}

export const isValid = (entity: Mission) => {
    return !!(
        entity.berralBatchId &&
        entity.topic &&
        entity.description &&
        entity.reminderDate &&
        entity.creatorId &&
        entity.executeById &&
        entity.isCompleted)
}