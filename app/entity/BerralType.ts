import { PrimaryGeneratedColumn } from 'typeorm';
import {Entity, Column} from 'typeorm';
@Entity('BerralTypes')
export class BerralType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    volume: number;
    
    @Column()
    oakType: string;

    @Column()
    quantity: number;

}