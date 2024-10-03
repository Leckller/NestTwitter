import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";

@Injectable()
export default class PostService {

    constructor (
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    private async findUser(userId: number) {

        const user = await this.userRepository.findOne({where: {id: userId}});

        if(!user) {

            throw new NotFoundException(new ResponseDto("Usuário inválido! Faça o login novamente.", false, {}))

        }

        return user;

    }

    public async createPost(text: string, userId: number) {

        const user = await this.findUser(userId);

        const post = this.postRepository.create({text, user: user, likes: []});

        await this.postRepository.save(post);

        return new ResponseDto("Post criado!", true, {});

    }

    public async getCircleUserPosts(userId) {

        const user = await this.findUser(userId);

        // TO DO 
        return {ok: true, posts: []}

    }

    public async getGlobalPosts() {

        const posts = await this.postRepository.find({
            relations: {user: true, likes: { user: true}},
            select: {
                user: {address: true, photo: true, name: true, id: true},
                likes: {
                    id: true, 
                    user: {
                        name: true, address: true, photo: true, id: true
                    }},
            }});

        return new ResponseDto("Global posts", true, {posts});

    }

}