import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class LikeEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    postId: number;

}