import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class CommentEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments)
    user: UserEntity;

    @ManyToOne(() => PostEntity, (postEntity) => postEntity.comments)
    post: PostEntity;

    @Column()
    text: string;

    @Column({ default: "#0F0F0F", length: "16" })
    textColor: string;

    @Column({ default: "#001848", length: "16" })
    bgColor: string;

}