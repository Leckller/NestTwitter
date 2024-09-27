import FollowerEntity from "src/Follower/Follower.Entity";
import PostEntity from "src/Post/Post.entity";
import { UserType } from "src/types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "User"})
export default class UserEntity implements UserType {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column()
    name: string;
    
    @Column({
        unique: true
    })
    email: string;
    
    @Column()
    password: string;
    
    @Column({
        unique: true
    })
    address: string;
    
    @Column()
    photo: string;
    
    @Column()
    banner: string;

    @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
    posts: PostEntity[]

    @OneToMany(() => FollowerEntity, (followerEntity) => followerEntity.following)
    followers: FollowerEntity;
    
    @OneToMany(() => FollowerEntity, (followerEntity) => followerEntity.followed)
    following: FollowerEntity;

}