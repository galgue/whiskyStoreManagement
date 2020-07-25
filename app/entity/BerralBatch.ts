import { getConnection } from 'typeorm';
import { PrimaryGeneratedColumn, CreateDateColumn, AfterLoad } from 'typeorm';
import { Mission } from './Mission';
import { MissionsRoute } from './../routes/Missions.routes';
import { ProssesChain } from './ProssesChain';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { BerralType } from './BerralType';
import { Note } from './Notes';
import { Use } from './Uses';

@Entity('BerralBatchs')
export class BerralBatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    berralTypeId: number;

    @ManyToOne(() => BerralType, berralType => berralType.id)
    @JoinColumn({ name: "berralTypeId", referencedColumnName: 'id'})
    berralType: BerralType;

    @Column({ nullable: true })
    prossesChainId: number;

    @ManyToOne(() => ProssesChain, prossesChain => prossesChain.id)
    @JoinColumn({ name: "prossesChainId", referencedColumnName: 'id'})
    prossesChain: ProssesChain;

    @Column()
    agingDuration: number;

    @Column()
    quantityAtFill: number;

    @Column({ nullable: true })
    lastBerralBatchId: number;

    @Column()
    alcoholPercentage: number;

    @Column()
    spiritType: string;

    @Column()
    ownership: string;

    @Column()
    locationatWarehouse: string;

    isActive: boolean;

    @AfterLoad()
    async getIsActive() {
         await getConnection().manager.count(BerralBatch, { where: { 
            "lastBerralBatchId": this.id,
         } }).then(numberOfLast => {
            this.isActive = !numberOfLast;
         })
         .catch(() => {
            this.isActive = true;
         });
    }

    @OneToMany(type => Mission, mission => mission.berralBatch)
    missions: Mission[];

    @OneToMany(type => Note, note => note.berralBatch)
    notes: Note[];

    @OneToMany(type => Use, use => use.berralBatch)
    uses: Use[];

    @CreateDateColumn({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
}