import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import LikeEntity from "./Like.Entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.Entity";
import PostEntity from "../Post/Post.Entity";
import ResponseDto from "src/Utils/Response.Dto";

@Injectable()
export default class LikeService {

    constructor(
        @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) { }

    public async like(userId: number, postId: number) {

        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: { address: true, name: true, id: true, photo: true }
        });

        if (!user) {

            throw new NotFoundException(new ResponseDto("Usuário não encontrado.", false, {}));

        }

        const post = await this.postRepository.findOne({ where: { id: postId } });

        if (!post) {

            throw new NotFoundException(new ResponseDto("Post não encontrado.", false, {}));

        }

        const findLike = await this.likeRepository.findOne({ where: { user: { id: userId }, post: { id: postId } } });

        // Caso o like exista ele é removido.
        if (findLike) {

            await this.likeRepository.remove(findLike);

            return new ResponseDto("Like removido", true, { postId, removed: true })

        }

        // Caso o like não exista ele é criado.
        const like = this.likeRepository.create({ user, post });

        await this.likeRepository.save(like);

        return new ResponseDto("Liked", true, { postId, removed: false })

    }

    public async getLikesByPost(postId: number, page = 0) {

        const likes = await this.likeRepository.find({
            where: { post: { id: postId } }, relations: { user: true },
            select: {
                user: {
                    id: true,
                    photo: true,
                    name: true,
                    address: true,
                }
            }
        });

        if (!likes) {

            throw new NotFoundException(new ResponseDto("Post não encontrado.", false, {}));

        }

        return new ResponseDto("Likes", true, { likes });

    }

};