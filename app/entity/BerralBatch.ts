import { getConnection, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn, CreateDateColumn, AfterLoad } from 'typeorm';
import { Mission } from './Mission';
import { ProssesChain } from './ProssesChain';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { BerralType } from './BerralType';
import { Note } from './Notes';
import { Use } from './Uses';

const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

@Entity('BerralBatchs')
export class BerralBatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    berralTypeId: number;

    @ManyToOne(() => BerralType, berralType => berralType.id)
    @JoinColumn({ name: "berralTypeId", referencedColumnName: 'id'})
    berralType: BerralType;

    @Column()
    prossesChainId: number;

    @ManyToOne(() => ProssesChain, prossesChain => prossesChain.id)
    @JoinColumn({ name: "prossesChainId", referencedColumnName: 'id'})
    prossesChain: ProssesChain;

    @Column()
    quantityAtFill: number;

    @Column({ nullable: true })
    lastBerralBatchId: number | null;

    @OneToOne(() => BerralBatch, berralBatch => berralBatch.id)
    @JoinColumn({ name: "lastBerralBatchId", referencedColumnName: 'id'})
    lastBerralBatch: BerralBatch | null;

    @Column()
    alcoholPercentage: number;

    @Column()
    spiritType: string;

    @Column()
    ownership: string;

    @Column()
    locationatWarehouse: string;

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: true})
    endDate: Date;

    agingDuration: number;

    @AfterLoad()
    async setIsActiveAndEndDate() {
         await getConnection().manager.findOneOrFail(BerralBatch, { where: { 
            "lastBerralBatchId": this.id,
         } }).then(prevBerralBatch => {
            if(!this.endDate) {
               this.endDate = prevBerralBatch.createdAt;
            }
         })
         .catch((err) => {
         });

         if(this.endDate) {
            this.agingDuration = Math.round(Math.abs((this.createdAt.getTime() - this.endDate.getTime()) / (oneDay)));
            if(this.endDate < new Date()){
               this.isActive = false;
            }
         } else {
            const days = new Date().getTime() - this.createdAt.getTime();
            this.agingDuration = Math.round(Math.abs(days > 0 ? days : 0 / (oneDay)));
         }
    }

    placeInChain: number;

    @OneToMany(type => Mission, mission => mission.berralBatch)
    missions: Mission[];

    @OneToMany(type => Note, note => note.berralBatch)
    notes: Note[];

    @OneToMany(type => Use, use => use.berralBatch)
    uses: Use[];

    @Column({ precision: null, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    
}