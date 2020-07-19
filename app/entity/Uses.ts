import { User } from './User';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { BerralBatch } from './BerralBatch';

@Entity('Uses')
export class Use {
    @PrimaryColumn()
    id: number;

    @Column()
    berralBatchId: number;

    @ManyToOne(() => BerralBatch, berralBatch => berralBatch.id)
    @JoinColumn({ name: "berralBatchId", referencedColumnName: 'id'})
    berralBatch: BerralBatch;

    @Column()
    purpose: string;

    @Column()
    quantity: number;

    @Column()
    creatorId: number;

    @ManyToOne(() => User, creator => creator.id)
    @JoinColumn({ name: "creatorId", referencedColumnName: 'id'})
    creator: User;
    
}