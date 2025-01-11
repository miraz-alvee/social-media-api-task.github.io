import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string; 

    @Column({ type: 'varchar', length: 255 })
    password: string; 

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date; 

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}

