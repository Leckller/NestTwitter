import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AuthService from "src/Auth/Auth.Service";
import CommentEntity from "src/Comment/Comment.Entity";
import FollowerEntity from "src/Follower/Follower.Entity";
import LikeEntity from "src/Like/Like.entity";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import { Repository } from "typeorm";

@Injectable()
export default class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
    @InjectRepository(FollowerEntity)
    private readonly followRepo: Repository<FollowerEntity>,
    private readonly authService: AuthService,
  ) {}

  public async seeds() {
    const isSpread = await this.postRepo.findOne({ where: { id: 1 } });

    if (isSpread) {
      return;
    }

    console.log("Seeding");

    // Users

    const kayoUser = this.userRepo.create({
      password: await this.authService.encrypt("Flamengo123!"),
      email: "kayo@gmail.com",
      address: "kay",
      name: "kay",
      banner: "",
      photo: "",
    });

    const ruyUser = this.userRepo.create({
      password: await this.authService.encrypt("Vasco123!"),
      email: "ruy@gmail.com",
      address: "leckller",
      name: "ruy",
      banner: "",
      photo: "",
    });

    const morghUser = this.userRepo.create({
      password: await this.authService.encrypt("Vasco123!"),
      email: "morgh@gmail.com",
      address: "morgh",
      name: "morgh",
      banner: "",
      photo: "",
    });

    await this.userRepo.save([kayoUser, ruyUser, morghUser]);

    // Posts

    const kayoPost1 = this.postRepo.create({
      text: "Flamengo caralho",
      user: kayoUser,
    });
    const kayoPost2 = this.postRepo.create({
      text: "França ta mo frio",
      user: kayoUser,
    });
    const kayoPost3 = this.postRepo.create({
      text: "Sdds da mulher",
      user: kayoUser,
    });

    const ruyPost1 = this.postRepo.create({
      text: "PAYET PAYET PAYET PAYET",
      user: ruyUser,
    });
    const ruyPost2 = this.postRepo.create({ text: "Qro peto", user: ruyUser });
    const ruyPost3 = this.postRepo.create({
      text: "Futzin hj fala tu",
      user: ruyUser,
    });

    const morghPost1 = this.postRepo.create({
      text: "ISSO É VASCO PORRA",
      user: morghUser,
    });
    const morghPost2 = this.postRepo.create({
      text: "Hmmm crochetar",
      user: morghUser,
    });
    const morghPost3 = this.postRepo.create({
      text: "Broxada sinistra é o melhor podcast do brasil",
      user: morghUser,
    });

    await this.postRepo.save([
      morghPost1,
      morghPost2,
      morghPost3,
      kayoPost1,
      kayoPost2,
      kayoPost3,
      ruyPost1,
      ruyPost2,
      ruyPost3,
    ]);

    // Comentarios

    const kayPostComment = this.postRepo.create({
      text: "qria mt um futzada dos cria",
      user: kayoUser,
      isComment: true,
    });

    await this.postRepo.save(kayPostComment);

    const kayComment1 = this.commentRepo.create({
      post: ruyPost3,
      comment: kayPostComment,
      user: kayoUser,
    });

    await this.commentRepo.save(kayComment1);

    // Likes

    const morghLike1 = this.likeRepo.create({
      post: ruyPost3,
      user: morghUser,
    });
    const kayoLike1 = this.likeRepo.create({ post: ruyPost3, user: kayoUser });

    await this.likeRepo.save([morghLike1, kayoLike1]);
  }
}
