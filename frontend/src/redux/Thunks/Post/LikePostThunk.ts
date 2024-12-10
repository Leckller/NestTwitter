import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';
import { PostType } from '../../../types/Post/PostType';

function likePost(post: Omit<PostType, 'user'>, removed: boolean) {
  if (removed) {
    post!.likes -= 1;
    post!.isLiked = false;
    return;
  }

  post!.isLiked = true;
  post!.likes += 1;
  return;
}

export const fetchLikePost = createAsyncThunk(
  'fetchLikePost',
  async ({ postId, authorization }: { postId: number, authorization: string }) => {
    const response = await PostService.likePost({ postId, authorization });
    return response;
  },
);

export function fetchLikePostBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchLikePost.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchLikePost.fulfilled, (state, { payload: { result: { postId, removed } } }) => {
      state.loading = false;

      if (state.localPost === 'profile') {
        const post = state.profile!.posts.find(p => p.id === postId);
        likePost(post as PostType, removed);
        return;
      }

      if (state.localPost === 'searchPosts') {
        const post = state.search.posts.find(p => p.id === postId);
        likePost(post as PostType, removed);
        return;
      }

      if (state.localPost === 'details') {

        if (state.postDetails?.id === postId) {
          likePost(state.postDetails, removed);
          return;
        }

        const post = state.postDetails?.postComments.find(p => p.comment.id === postId)!;

        likePost(post.comment, removed);
        return;
      }

      if (state.localPost === 'likes') {
        const post = state.profileLikes.find(p => p.post.id === postId);
        likePost(post?.post as PostType, removed);
        return;
      }

      if (state.localPost === 'answers') {
        const post = state.profileAnswers.find(p => p.post.id === postId);
        const comment = state.profileAnswers.find(p => p.comment.id === postId);
        likePost(post ? post.post : comment?.comment as PostType, removed);
        return;
      }

      const post = (state.localPost === 'bubble' ? state.bubblePosts : state.posts).find(p => p.id === postId);
      likePost(post as PostType, removed);
    })
    .addCase(fetchLikePost.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}