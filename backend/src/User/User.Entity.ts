import FollowerEntity from "../Follower/Follower.Entity";
import PostEntity from "../Post/Post.entity";
import { UserType } from "../types";
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

    @Column({default: "#0F0F0F", length: "16"})
    textColor: string;

    @Column({default: "#001848", length: "16"})
    bgColor: string;
    
    constructor(user?: Partial<UserEntity>) {
        this.id= user?.id;
        this.address = user?.address;
        this.banner = user?.banner;
        this.email = user?.email;
        this.followers = user?.followers;
        this.following= user?.following;
        this.name = user?.name;
        this.password = user?.password;
        this.photo = user?.photo;
        this.posts = user?.posts;
    }

}