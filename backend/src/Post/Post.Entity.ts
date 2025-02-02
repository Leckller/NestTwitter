import CommentEntity from "src/Comment/Comment.Entity";
import LikeEntity from "../Like/Like.Entity";
import UserEntity from "../User/User.Entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Post" })
export default class PostEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    // Usuário que fez o post
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts)
    user: UserEntity;

    // Likes do post
    @OneToMany(() => LikeEntity, (likeEntity) => likeEntity.post, { cascade: true })
    likes: LikeEntity[];

    // Comentários do post
    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post)
    comments: CommentEntity[];

    @Column({ default: false })
    isComment: boolean;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

} 