import CommentEntity from "src/Comment/Comment.Entity";
import LikeEntity from "../Like/Like.entity";
import UserEntity from "../User/User.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Post" })
export default class PostEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts)
    user: UserEntity;

    @OneToMany(() => LikeEntity, (likeEntity) => likeEntity.post, { cascade: true })
    likes: LikeEntity[];

    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post)
    comments: CommentEntity[];

    @Column({ default: false })
    isComment: boolean;

    @Column()
    text: string;

}