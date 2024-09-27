import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";

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

        return {ok: true, message: `${followingUser.name + "-" + followingUser.address} agora está seguindo ${followedUser.name + "-" + followedUser.address}`, follow};

    }

    public async getPostsByFollows(userId: number) {

        const user = await this.userRepository.findOne({where: {id: userId}});
        
        if(!user) {

            throw new NotFoundException("Usuário não encontrado");

        }

        const posts = await this.followerRepository.find({
            where: {following: user},
            relations: {followed: {posts: {likes: {user: true}}}},
            order: {id: "DESC"},
            take: 10,
            select: {
                followed: {
                    id: true, name: true, photo: true, address: true, posts: {
                        id: true,
                        text: true,
                        likes: {id: true, user: {photo: true, name: true, address: true, id: true}}
                    }
                }
            }
        });

        return {posts}

    }

};