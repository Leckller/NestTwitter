import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import { Repository } from "typeorm";
import UserEntity from "src/User/User.entity";

@Injectable()
export default class FollowerService {

    constructor (
        @InjectRepository(FollowerEntity) private readonly followerRepository: Repository<FollowerEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    public async createFollower(followedId: number, followingId: number) {

        if(followedId === followingId) {

            throw new BadRequestException("Você não pode seguir a si mesmo.");

        }

        const followedUser = await this.userRepository.findOne({where: {id: followedId}});
        
        if(!followedUser) {

            throw new NotFoundException("Usuário não encontrado");

        }

        const followingUser = await this.userRepository.findOne({where: {id: followingId}});

        if(!followingUser) {

            throw new NotFoundException("Usuário não encontrado");

        }

        const findFollow = await this.followerRepository.findOne({where: {followed: followedUser, following: followingUser}});

        if(findFollow) {

            await this.followerRepository.remove(findFollow);

            return {ok: true, message: `${followingUser.name} deixou de seguir ${followedUser.name}`};

        }

        const follow = this.followerRepository.create({followed: followedUser, following: followingUser});

        await this.followerRepository.save(follow);

        return {ok: true, message: `${followingUser.name} agora está seguindo ${followedUser.name}`};

    }

};