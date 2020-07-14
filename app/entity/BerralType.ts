import {Entity, Column, PrimaryColumn} from 'typeorm';
@Entity('BerralTypes')
export class BerralType {
    @PrimaryColumn()
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