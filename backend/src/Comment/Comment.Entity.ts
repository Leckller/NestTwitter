import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CommentEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    // Quem comentou
    // Vários Comentários para cada pessoa
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
    user: UserEntity;

    // Post onde foi comentado
    // Vários comentários para um post
    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments)
    post: PostEntity;

    // Comentário feito
    // Vários comentários para um post
    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments)
    comment: PostEntity;

    @Column({ default: "#0F0F0F", length: "16" })
    textColor: string;

    @Column({ default: "#001848", length: "16" })
    bgColor: string;

}