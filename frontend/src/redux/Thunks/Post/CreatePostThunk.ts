import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreatePostRequest } from '../../../types/Post/CreatePost.Request';
import { createPost } from '../../../services/Post/createPost';

export const fetchCreatePost = createAsyncThunk(
  'fetchCreatePost',
  async (fields: CreatePostRequest) => {
    const response = await createPost(fields);
    return response;
  },
);
