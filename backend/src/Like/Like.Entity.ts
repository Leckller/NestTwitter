import PostEntity from "../Post/Post.Entity";
import UserEntity from "../User/User.Entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Like" })
export default class LikeEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.likes)
    user: UserEntity;

    // Muitos likes para um post
    @ManyToOne(() => PostEntity, (postEntity) => postEntity.likes)
    post: PostEntity;

}