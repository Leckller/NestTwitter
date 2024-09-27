import UserEntity from "src/User/User.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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