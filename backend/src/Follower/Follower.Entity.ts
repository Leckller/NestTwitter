import UserEntity from "../User/User.Entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FollowerEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    // Seguido
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.followers)
    followed: UserEntity;

    // Seguindo
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.following)
    following: UserEntity;

} 