import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";

@Injectable()
export default class PostService {

    constructor (
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) {}

    private async findUser(userId: number) {

        const user = await this.postRepository.findOne({where: {id: userId}});

        if(!user) {

            throw new NotFoundException("Usuário inválido! Faça o login novamente.")

        }

        return user;

    }

    public async createPost(text: string, userId: number) {

        const user = await this.findUser(userId);

        const post = this.postRepository.create({text, user: user, likes: []});

        await this.postRepository.save(post);

        return {ok: true, post}

    }

    public async getCircleUserPosts(userId) {

        const user = await this.findUser(userId);

        // TO DO 
        return {ok: true, posts: []}

    }


}