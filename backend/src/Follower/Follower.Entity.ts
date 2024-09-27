import UserEntity from "src/User/User.entity";
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FollowerEntity {
 
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @OneToOne(()=> UserEntity)
    @JoinColumn()
    followed: UserEntity;
    
    @OneToOne(()=> UserEntity)
    @JoinColumn()
    following: UserEntity;

} 