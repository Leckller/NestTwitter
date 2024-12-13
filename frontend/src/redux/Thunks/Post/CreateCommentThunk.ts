import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import PostService from '../../../services/Post/PostService';
import { PostState } from '../../Reducers/Post';

export const fetchCreateComment = createAsyncThunk(
  'fetchCreateComment',
  async (fields: { text: string, authorization: string, postId: number }) => {
    const response = await PostService.createComment(fields);
    return response;
  },
);

export function fetchCreateCommentBuilder(builder: ActionReducerMapBuilder<PostState>) {
  builder
    .addCase(fetchCreateComment.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCreateComment.fulfilled, (state, action) => {
      state.loading = false;

      if (state.localPost === "details") {
        // Verifica se é o tweet principal
        if (state.postDetails!.id === action.payload.result.postId) {
          state.postDetails!.comments += 1;
          state.postDetails?.postComments.unshift(action.payload.result.comment);
          return;
        }
        state.postDetails!.postComments.find(p => p.comment.id === action.payload.result.postId)!.comment.comments += 1;
        return;

      }

      if (state.localPost === 'bubble') {
        state.bubblePosts.find(p => p.id === action.payload.result.postId)!.comments += 1;
        return;
      }


      if (state.localPost === 'global') {
        state.posts.find(p => p.id === action.payload.result.postId)!.comments += 1;
        return;
      }

      if (state.localPost === 'profile') {
        state.profile!.posts.find(p => p.id === action.payload.result.postId)!.comments += 1
        return;
      }

      if (state.localPost === 'answers') {
        const post = state.profileAnswers.find(p => p.post.id === action.payload.result.postId)?.post;
        const comment = state.profileAnswers.find(p => p.comment.id === action.payload.result.postId)?.comment;
        post ? post.comments++ : comment!.comments++;

        state.profileAnswers.unshift({
          id: action.payload.result.id,
          comment: action.payload.result.comment.comment,
          post: {
            ...(post ? post! : comment!)!,
            user: {
              address: state.profile!.user.address,
              id: state.profile!.user.id,
              name: state.profile!.user.name,
              photo: state.profile!.user.photo
            }
          }
        });
        return;
      }


      if (state.localPost === 'likes') {
        const post = state.profileLikes.find(p => p.post.id === action.payload.result.postId)?.post;
        post!.comments++;

        state.profileAnswers.unshift({
          id: action.payload.result.id,
          comment: action.payload.result.comment.comment,
          post: {
            ...post!, user: {
              address: state.profile!.user.address,
              id: state.profile!.user.id,
              name: state.profile!.user.name,
              photo: state.profile!.user.photo
            }
          }
        })

        return;
      }

      console.log(action);
    })

    .addCase(fetchCreateComment.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
    });
}