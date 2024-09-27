import UserEntity from "../User/User.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FollowerEntity {
 
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    // essa relação tá errada fi

    @ManyToOne(()=> UserEntity, (userEntity) => userEntity.followers)
    followed: UserEntity;
    
    @ManyToOne(()=> UserEntity, (userEntity) => userEntity.following)
    following: UserEntity;

} 