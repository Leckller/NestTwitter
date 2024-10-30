import LikeEntity from './Like/Like.entity';
import PostEntity from './Post/Post.entity';
import UserEntity from './User/User.entity';
import FollowerEntity from './Follower/Follower.Entity';
import CommentEntity from './Comment/Comment.Entity';
import GuardModule from './Guard/Guard.Module';
import UserModule from './User/User.Module';
import AuthModule from './Auth/Auth.Module';
import PostModule from './Post/Post.Module';
import LikeModule from './Like/Like.Module';
import { SearchModule } from './Search/Search.Module';
import CommentModule from './Comment/Comment.Module';
import FollowerModule from './Follower/Follower.Module';

export const entities = [LikeEntity, PostEntity, UserEntity, FollowerEntity, CommentEntity];
export const modules = [GuardModule, UserModule, AuthModule, PostModule, LikeModule, SearchModule, CommentModule, FollowerModule]