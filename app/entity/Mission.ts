import { PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { BerralBatch } from './BerralBatch';

@Entity('Missions')
export class Mission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    berralBatchId: number;

    @ManyToOne(() => BerralBatch, berralBatch => berralBatch.id)
    @JoinColumn({ name: "berralBatchId", referencedColumnName: 'id'})
    berralBatch: BerralBatch;

    @Column()
    topic: string;

    @Column()
    description: string;

    @Column()
    createdOn: Date;

    @Column()
    reminderDate: Date;

    @Column()
    creatorId: number;

    @ManyToOne(() => User, creator => creator.id)
    @JoinColumn({ name: "creatorId", referencedColumnName: 'id'})
    creator: User;

    @Column()
    executeById: number;

    @ManyToOne(() => User, executor => executor.id)
    @JoinColumn({ name: "executeById", referencedColumnName: 'id'})
    executeBy: User;

    @Column()
    isCompleted: boolean;
    
}