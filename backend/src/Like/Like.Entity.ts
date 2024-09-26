import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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