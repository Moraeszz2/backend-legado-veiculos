import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('')
export class cars {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}