import LikeEntity from './Like/Like.entity';
import PostEntity from './Post/Post.entity';
import UserEntity from './User/User.entity';

import LikeController from './Like/Like.Controller';
import UserController from './User/User.Controller';
import PostController from './Post/Post.Controller';

export const entities = {LikeEntity, PostEntity, UserEntity};

export const controllers = {LikeController, PostController, UserController};
