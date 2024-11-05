import CommentEntity from "src/Comment/Comment.Entity";
import FollowerEntity from "../Follower/Follower.Entity";
import PostEntity from "../Post/Post.entity";
import { UserType } from "../types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export default class UserEntity implements UserType {
    @PrimaryGeneratedColumn({ unsigned: true })
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

    // Posts da pessoa
    @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
    posts: PostEntity[];

    // Comentários da pessoa
    @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.user)
    comments: CommentEntity[];

    // Seguidores da pessoa
    @OneToMany(() => FollowerEntity, (followerEntity) => followerEntity.following)
    followers: FollowerEntity;

    // Pessoas que o usuário segue
    @OneToMany(() => FollowerEntity, (followerEntity) => followerEntity.followed)
    following: FollowerEntity;

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id;
        this.address = user?.address;
        this.banner = user?.banner;
        this.email = user?.email;
        this.followers = user?.followers;
        this.following = user?.following;
        this.name = user?.name;
        this.password = user?.password;
        this.photo = user?.photo;
        this.posts = user?.posts;
    }

}