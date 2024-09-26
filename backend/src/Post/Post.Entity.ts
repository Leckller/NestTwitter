import LikeEntity from "src/Like/Like.entity";
import UserEntity from "src/User/User.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Post"})
export default class PostEntity {

    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.posts)
    user: UserEntity;

    @OneToMany(() => LikeEntity, (likeEntity) => likeEntity.post)
    likes: LikeEntity[]

    @Column()
    text: string;

}