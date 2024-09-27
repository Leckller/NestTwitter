import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";
import UserEntity from "src/User/User.entity";

@Injectable()
export default class PostService {

    constructor (
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    private async findUser(userId: number) {

        const user = await this.userRepository.findOne({where: {id: userId}});

        if(!user) {

            throw new NotFoundException("Usuário inválido! Faça o login novamente.")

        }

        return user;

    }

    public async createPost(text: string, userId: number) {

        const user = await this.findUser(userId);

        const post = this.postRepository.create({text, user: user, likes: []});

        await this.postRepository.save(post);

        return {ok: true}

    }

    public async getCircleUserPosts(userId) {

        const user = await this.findUser(userId);

        // TO DO 
        return {ok: true, posts: []}

    }

    public async getGlobalPosts() {

        const posts = await this.postRepository.find({
            relations: {user: true, likes: true},
            select: {user: {address: true, photo: true, name: true, id: true}}});

        return {posts};

    }

}