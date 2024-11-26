import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreatePostBuilder } from '../Thunks/Post/CreatePostThunk';
import { fetchGlobalPostsBuilder } from '../Thunks/Post/GlobalPostsThunk';
import { fetchPostDetailsBuilder } from '../Thunks/Post/PostDetailsThunk';
import { PostDetailsResponse } from '../../types/Post/PostDetails.Response';
import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';
import { fetchLikePostBuilder } from '../Thunks/Post/LikePostThunk';
import { fetchCreateCommentBuilder } from '../Thunks/Post/CreateCommentThunk';

export interface PostState {
  loading: boolean;
  posts: GlobalPostResponse[];
  postDetails: PostDetailsResponse | undefined;
  globalPage: number,
  isMaxPage: boolean,

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
  isComment: false,
  postId: 0
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
  },
  extraReducers: (builder) => {

    fetchCreatePostBuilder(builder);
    fetchGlobalPostsBuilder(builder);
    fetchPostDetailsBuilder(builder);
    fetchLikePostBuilder(builder);
    fetchCreateCommentBuilder(builder);

  },
});

export const { setPage, setNewPost, setComment } = PostSlice.actions;

export default PostSlice.reducer;
