import PostEntity from "../Post/Post.entity";
import UserEntity from "../User/User.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Like"})
export default class LikeEntity {
    
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @OneToOne(()=> UserEntity)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => PostEntity, (postEntity) => postEntity)
    post: PostEntity;

}