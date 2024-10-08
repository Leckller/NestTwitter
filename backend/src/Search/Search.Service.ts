import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import { Like, Repository } from "typeorm";

@Injectable()
export class SearchService {

    constructor(
        @InjectRepository(PostEntity) private readonly PostRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly UserRepository: Repository<UserEntity>
    ) { }

    public async search(text: string) {

        const findUserByName = await this.UserRepository.find({ where: { name: Like(text), address: Like(text) }, take: 10 });
        // const findUserByAddress = await this.UserRepository.find({ where: { address: Like(text) } });

        const findPost = await this.PostRepository.find({ where: { text: Like(text) }, take: 10 });

        return new ResponseDto('Resultados da pesquisa', true, [...findUserByName, ...findPost]);

    }

}