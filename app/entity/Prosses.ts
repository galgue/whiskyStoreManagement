import { PrimaryGeneratedColumn } from 'typeorm';
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';
import { BerralType } from './BerralType';
@Entity('Prosseses')
export class Prosses {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    duration: number;

    @Column()
    berralTypeId: number;

    @ManyToOne(() => BerralType, berralType => berralType.id)
    @JoinColumn({ name: "berralTypeId", referencedColumnName: 'id'})
    berralType: BerralType;

}