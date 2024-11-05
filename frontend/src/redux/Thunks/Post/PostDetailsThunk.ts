import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostDetailsRequest } from '../../../types/Post/PostDetails.Request';
import { postDetails } from '../../../services/Post/postDetails';

export const fetchPostDetails = createAsyncThunk(
  'fetchPostDetails',
  async (fields: PostDetailsRequest) => {
    const response = await postDetails(fields);
    return response;
  },
);
