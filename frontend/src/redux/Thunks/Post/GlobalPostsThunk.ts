import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalPostRequest } from '../../../types/Post/GlobalPost.Request';
import { globalPosts } from '../../../services/Post/globalPosts';

export const fetchGlobalPosts = createAsyncThunk(
  'fetchGlobalPosts',
  async (fields: GlobalPostRequest) => {
    const response = await globalPosts(fields);

    console.log(response);

    return response;
  },
);
