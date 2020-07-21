import { PrimaryGeneratedColumn, AfterLoad } from 'typeorm';
import { Prosses } from './Prosses';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('ProssesChains')
export class ProssesChain {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    prossesId1: number;

    @ManyToOne(() => Prosses, prosses => prosses.id)
    @JoinColumn({ name: "prossesId1", referencedColumnName: 'id'})
    prosses1: Prosses;

    @Column({ nullable: true })
    prossesId2: number;

    @ManyToOne(() => Prosses, prosses => prosses.id)
    @JoinColumn({ name: "prossesId2", referencedColumnName: 'id'})
    prosses2: Prosses;

    @Column({ nullable: true })
    prossesId3: number;

    @ManyToOne(() => Prosses, prosses => prosses.id)
    @JoinColumn({ name: "prossesId3", referencedColumnName: 'id'})
    prosses3: Prosses;

    @Column({ nullable: true })
    prossesId4: number;

    @ManyToOne(() => Prosses, prosses => prosses.id)
    @JoinColumn({ name: "prossesId4", referencedColumnName: 'id'})
    prosses4: Prosses;

    numberOfProsseses: number;
    
    @AfterLoad()
    getNumberOfProsseses() {
        this.numberOfProsseses = this.prosses4 ? 4 : this.prosses3 ? 3 : this.prosses2 ? 2 : 1;
    }

}