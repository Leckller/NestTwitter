import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class PostEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    text: string;

}