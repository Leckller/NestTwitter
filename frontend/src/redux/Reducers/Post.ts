import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreatePostBuilder } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPostsBuilder } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetailsBuilder } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { fetchLikePostBuilder } from '../Thunks/Post/LikePostThunk';
import { fetchCreateCommentBuilder } from '../Thunks/Post/CreateCommentThunk';
import { PostType } from '../../types/Post/PostType';
import { fetchBubblePostsBuilder } from '../Thunks/Post/BubblePostsThunk';

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

  },
});

export const { setPage, setNewPost, setComment, setLocalPosts } = PostSlice.actions;

export default PostSlice.reducer;
