import PostEntity from "../Post/Post.entity";
import UserEntity from "../User/User.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Like" })
export default class LikeEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    // Não tenho certeza se isso deveria ser assim mas tá funcionando
    // Usuário que curtiu
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;

    // Muitos likes para um post
    @ManyToOne(() => PostEntity, (postEntity) => postEntity)
    post: PostEntity;

}