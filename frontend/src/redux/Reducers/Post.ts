import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreatePostBuilder } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPostsBuilder } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetailsBuilder } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { fetchLikePostBuilder } from '../Thunks/Post/LikePostThunk';
import { fetchCreateCommentBuilder } from '../Thunks/Post/CreateCommentThunk';
import { PostType, ProfileType } from '../../types/Post/PostType';
import { fetchBubblePostsBuilder } from '../Thunks/Post/BubblePostsThunk';
import { fetchProfileBuilder } from '../Thunks/User/ProfileThunk';

export type LocalPostType = 'details' | 'global' | 'bubble'

export interface PostState {
  loading: boolean;
  posts: PostType[];
  bubblePosts: PostType[];
  postDetails: PostDetailsResponse | undefined;
  globalPage: number,
  isMaxPage: boolean,

  localPost: LocalPostType,

  // Para criaçao de post/comentário
  newPost: boolean,
  isComment: boolean,
  postId: number

  // Profile
  profile: { user: ProfileType, posts: Omit<PostType, 'user'>[] } | undefined
}

const initialState: PostState = {
  postDetails: undefined,
  isMaxPage: false,
  loading: false,
  newPost: false,
  globalPage: 0,
  posts: [],
  bubblePosts: [],
  isComment: false,
  postId: 0,
  localPost: 'bubble',
  profile: undefined
};

export const PostSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    setComment(state, action: PayloadAction<{ postId: number, isComment: boolean }>) {
      state.isComment = action.payload.isComment;
      state.postId = action.payload.postId;
    },
    setPage(state, action: PayloadAction<number>) {
      state.globalPage = action.payload;
    },
    setNewPost(state, action: PayloadAction<boolean>) {
      state.newPost = action.payload;
    },
    setLocalPosts(state, action: PayloadAction<LocalPostType>) {
      state.localPost = action.payload;
    }
  },
  extraReducers: (builder) => {

    fetchCreatePostBuilder(builder);
    fetchGlobalPostsBuilder(builder);
    fetchPostDetailsBuilder(builder);
    fetchLikePostBuilder(builder);
    fetchCreateCommentBuilder(builder);
    fetchBubblePostsBuilder(builder);
    fetchProfileBuilder(builder);

  },
});

export const { setPage, setNewPost, setComment, setLocalPosts } = PostSlice.actions;

export default PostSlice.reducer;
