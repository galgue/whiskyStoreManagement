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
    isManager: boolean;

    @Column()
    phone: string;

    @Column({ select: false })
    password: string;

    @Column({ unique: true })
    email: string;

}