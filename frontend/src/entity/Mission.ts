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