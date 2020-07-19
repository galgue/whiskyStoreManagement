import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    department: string;

    @Column()
    role: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

}