import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AuthService from "src/Auth/Auth.Service";
import CommentEntity from "src/Comment/Comment.Entity";
import FollowerEntity from "src/Follower/Follower.Entity";
import LikeEntity from "src/Like/Like.Entity";
import PostEntity from "src/Post/Post.Entity";
import UserEntity from "src/User/User.Entity";
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
  ) { }

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

    const LeckllerUser = this.userRepo.create({
      password: await this.authService.encrypt("Flamengo123!"),
      email: "Leckller@gmail.com",
      address: "Leckller",
      name: "Leckller",
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

    await this.userRepo.save([kayoUser, ruyUser, morghUser, LeckllerUser]);

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

    const leckllerPost1 = this.postRepo.create({
      text: "jogar aquele lolzinho",
      user: LeckllerUser,
    });
    const leckllerPost2 = this.postRepo.create({
      text: "dale no osu filhote",
      user: LeckllerUser,
    });
    const leckllerPost3 = this.postRepo.create({
      text: "pensando em aprender R ou C",
      user: LeckllerUser,
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
      leckllerPost1,
      leckllerPost2,
      leckllerPost3
    ]);

    // Comentarios

    for (let i = 0; i < 5; i++) {
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
    }

    // Likes

    const morghLike1 = this.likeRepo.create({
      post: ruyPost3,
      user: morghUser,
    });
    const kayoLike1 = this.likeRepo.create({ post: ruyPost3, user: kayoUser });

    await this.likeRepo.save([morghLike1, kayoLike1]);

    // Followes

    // const users = [morghUser, ruyUser, kayoUser];

    // users.forEach((user) => {
    //   users.filter(u => u.id !== user.id).forEach(async innerUser => {
    //     const follow = this.followRepo.create({
    //       followed: user, following: innerUser
    //     })
    //     await this.followRepo.save(follow);
    //   })
    // })

  }
}
