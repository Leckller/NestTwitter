import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import LikeEntity from "./Like.entity";
import { Repository } from "typeorm";
import UserEntity from "src/User/User.entity";
import PostEntity from "src/Post/Post.entity";

@Injectable()
export default class LikeService {

    constructor (
        @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) {}

    public async like (UserId: number, PostId: number) {

        const user = await this.userRepository.findOne({
            where: {id: UserId}, 
            select: {address: true, name: true, id: true, photo: true}});

        if(!user) {

            throw new UnauthorizedException("Você não tem permissão para fazer isso.");

        }

        const post = await this.postRepository.findOne({where: {id: PostId}});

        if(!post) {

            throw new NotFoundException("Post não encontrado.");
        
        }

        const findLike = await this.likeRepository.findOne({where: {user, post}});

        if (findLike) {

            await this.likeRepository.remove(findLike);

            return {ok: true, message: "Like removido"}

        }

        const like = this.likeRepository.create({user, post});

        await this.likeRepository.save(like);

        return {ok: true, like, message: "Liked"};

    }

};